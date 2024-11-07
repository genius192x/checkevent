<script setup lang="ts">
import {computed, ref, onMounted } from 'vue'
import DateRangePicker from '@/components/DateRangePicker.vue'
import CreateList from "@/components/form/CreateList.vue"
import { PlusIcon, ArrowDownIcon, ArrowUpIcon, CaretSortIcon, RowsIcon, DragHandleDots2Icon } from '@radix-icons/vue'
import ListCards from '@/components/ListCards.vue'
import { useListStore } from '@/store/ListsStore'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Button,
} from '@/components/ui/button'
import DataTablePagination from '@/components/DataTablePagination.vue'
import { useGlobalStore } from '@/store/GlobalStore'
import {useUserStore} from '@/store/UserStore'
import axios from 'axios'
import { Vue3Lottie } from 'vue3-lottie'
import EmptyListJSON  from '../assets/animationEmptyList.json'
const userStore = useUserStore()
const globalStore = useGlobalStore()
const listStore = useListStore()

let side = 'bottom';
if (window.innerWidth > 768){
  side = 'right'
}
const url = import.meta.env.VITE_API_URL

const activeList = computed(() => {
  return listStore.list.filter(item => item.isArchived === false)
})

const archivedList = computed(() => {
  return listStore.list.filter(item => item.isArchived === true)
})

const isFormOpen = ref(false)
listStore.getLists()
const sortDirection = ref('');
const styleState = ref('row');
</script>

<template>
  <div class="flex-1 space-y-6 p-2 pt-6 md:p-8">
    <div class="flex justify-between space-y-6 flex-col md:flex-row md:items-center md:space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">
        Список мероприятий
      </h2>
    </div>

    <Tabs default-value="active" class="space-y-3 md:space-y-4">
      <div class="flex justify-between flex-wrap gap-3">
        <div class="flex items-center gap-5 flex-wrap">
          <TabsList class="overflow-auto">
            <TabsTrigger value="active">
              Активные
            </TabsTrigger>
            <TabsTrigger value="archive" >
              Архив
            </TabsTrigger>
          </TabsList>
          <div class="order-2 md:order-1">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                variant="ghost"
                size="sm"
                class="-ml-3 h-8 data-[state=open]:bg-accent"
                >
                <span>Дедлайн</span>
                <ArrowDownIcon v-if="sortDirection === 'desc'" class="ml-2 h-4 w-4" />
                <ArrowUpIcon v-else-if="sortDirection === 'asc'" class="ml-2 h-4 w-4" />
                <CaretSortIcon v-else class="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem @click="sortDirection = 'asc'">
                <ArrowUpIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Сначала срочные
              </DropdownMenuItem>
              <DropdownMenuItem @click="sortDirection = 'desc'">
                <ArrowDownIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Сначала не срочные
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <!-- <Button @click="axios.get(`http://localhost:4080/api/user`)
        .then(response => {
          console.log(response)
          console.log(response.statusText)
          console.log(response.data)
          console.log(`${url}/api/user`);
        })">get user</Button> -->
        <div class="flex border rounded-md overflow-hidden">
          <Button class="h-8 w-10 p-0 rounded-none" :class="{'bg-muted' : styleState === 'row'}" variant="ghost" @click="styleState = 'column'">
            <RowsIcon/>
          </Button>
          <Button class="h-8 w-10 p-0 rounded-none" :class="{ 'bg-muted': styleState === 'column' }" variant="ghost" @click="styleState = 'row'">
            <DragHandleDots2Icon/>
          </Button>
        </div>

      </div>
      <Sheet :open="isFormOpen">
        <!-- TODO v-if="userStore.userData.admin" верни на кнопку -->
        <SheetTrigger as-child>
          <Button @click="isFormOpen = true" class="w-full md:w-fit">
            <PlusIcon class="w-4 h-4 mr-2" /> Новый лист
          </Button>
        </SheetTrigger>
        <SheetContent :side=side class="w-[100%] max-h-[80%] p-4 pb-4 rounded-t-xl md:w-[440px] sm:max-w-none md:max-h-none md:rounded-xl md:p-3 outline-0 md:m-3 h-auto">
          <SheetHeader>
            <SheetTitle>Создание нового листа</SheetTitle>
          </SheetHeader>
          <CreateList @close="isFormOpen = !isFormOpen"/>
        </SheetContent>
      </Sheet>
    </div>
    <TabsContent value="active" class="space-y-4">
      <ListCards
      :items="activeList"
      :sorted="sortDirection"
      :style="styleState"
      v-if="activeList.length"
      />
      <div class="" v-else>
        <Vue3Lottie class="cursor-pointer" :animationData="EmptyListJSON" :height="200" :width="200" :loop="false" @click="isFormOpen = true"/>
        <div class="text-center">Список активных листов пока пуст</div>
      </div>
    </TabsContent>
    <TabsContent value="archive" class="space-y-4">
      <ListCards
        :items="archivedList"
        :sorted="sortDirection"
        :style="styleState"
        />
    </TabsContent>
  </Tabs>
</div>
</template>