<script setup lang="ts">
import {ref} from 'vue'
import DateRangePicker from '@/components/DateRangePicker.vue'
import CreateList from "@/components/form/CreateList.vue"
import { PlusIcon, ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-icons/vue'
import ListCard from '@/components/ListCard.vue'
import {useListStore} from '@/store/ListsStore'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
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
  Button,
} from '@/components/ui/button'
import DataTablePagination from '@/components/DataTablePagination.vue'
import { useGlobalStore } from '@/store/GlobalStore'
import {useUserStore} from '@/store/UserStore'
import axios from 'axios'
const userStore = useUserStore()
const globalStore = useGlobalStore()
const listStore = useListStore()

let side = 'bottom';
if (window.innerWidth > 768){
  side = 'right'
}
const url = import.meta.env.VITE_API_URL

const sortDirection = ref('');
</script>

<template>
  <div class="flex-1 space-y-6 p-2 pt-6 md:p-8">
    <div class="flex justify-between space-y-6 flex-col md:flex-row md:items-center md:space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">
        Список мероприятий
      </h2>
    </div>

    <Tabs default-value="active" class="space-y-3 md:space-y-4">
      <div class="flex justify-between">
        <div class="flex items-center gap-5">
          <TabsList class="overflow-auto">
            <TabsTrigger value="active">
              Активные
            </TabsTrigger>
            <TabsTrigger value="archive" >
              Архив
            </TabsTrigger>
          </TabsList>
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
      <!-- <Button @click="axios.get(`${url}/user`)
        .then(response => {
          console.log(response)
          console.log(response.statusText)
          console.log(response.data)

        })">get user</Button> -->
        <Sheet :open="globalStore.isSheetOpen">
          <!-- TODO v-if="userStore.userData.admin" верни на кнопку -->
          <SheetTrigger >
            <Button @click="globalStore.isSheetOpen = true">
              <PlusIcon class="w-4 h-4 mr-2" /> Новый лист
            </Button>
          </SheetTrigger>
          <SheetContent :side=side class="w-[100%] max-h-[80%] p-4 pb-4 rounded-t-xl md:w-[440px] sm:max-w-none md:max-h-none md:rounded-xl md:p-3 outline-0 md:m-3 h-auto">
            <SheetHeader>
              <SheetTitle>Создание нового листа</SheetTitle>
            </SheetHeader>
            <CreateList/>
          </SheetContent>
        </Sheet>
      </div>
      <TabsContent value="active" class="space-y-4">
        <ListCard
        :items="listStore.list"
        :sorted="sortDirection"
        />
      </TabsContent>
      <TabsContent value="archive" class="space-y-4">
        <!-- <div v-for="item in eventsExpired" :key="item.id">
          <ListCard
          :item="item"
          />
        </div> -->
      </TabsContent>
    </Tabs>
  </div>
</template>