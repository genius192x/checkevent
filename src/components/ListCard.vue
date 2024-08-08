<script setup lang="ts">
import {ChevronDownIcon} from '@radix-icons/vue'
import {CircleIcon} from '@radix-icons/vue'
import {computed, ref} from 'vue'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import AvatarsGroup from '@/components/AvatarsGroup.vue'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

import {
  Button,
} from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useListStore } from '@/store/ListsStore'
import { item } from '@unovis/ts/components/bullet-legend/style'
const list = useListStore()

interface Props {
  items: []
}
const props = defineProps<Props>()

const container = ref(null)

const currentPage = ref(1)

const itemsPerPage = ref(8)

const pageCount = computed(() =>
  Math.ceil(props.items.length / itemsPerPage.value)
);

const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;

  return props.items.slice(startIndex, endIndex)
});

const deleteId = ref(0)
const confirmOpen = function (item) {
  open.value = true
  deleteId.value = item.id
}
const open = ref(false)
function changePage(pageNumber) {
  console.log(itemsPerPage.value);

  currentPage.value = pageNumber;
}

</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <div v-for="item in displayedItems" :key="item.id">
      <Card @click="$router.push(`/list/${item.id}`)" class="cursor-pointer h-full flex flex-col justify-between">
        <CardHeader class="grid grid-cols-[minmax(0,1fr)_32px] items-start gap-4 space-y-0 p-4 md:p-6">
          <div class="space-y-1">
            <CardTitle>{{item.title}}
            </CardTitle>
            <CardDescription class="pt-2">
              {{item.description}}
            </CardDescription>
          </div>
          <div class=" rounded-md text-secondary-foreground" @click.stop ref="container">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="secondary" class="px-2 shadow-none">
                  <ChevronDownIcon class="h-5 w-5 text-secondary-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" :align-offset="-5" class="w-[200px]">
                <!-- <DropdownMenuItem>
                  Скопировать лист
                </DropdownMenuItem>
                <DropdownMenuItem>Редактировать лист</DropdownMenuItem>
                <DropdownMenuSeparator /> -->
                <DropdownMenuItem class="text-red-500" @click="confirmOpen(item)">Удалить лист
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent class="p-4 pt-0 md:p-6">
          <AlertDialog v-model:open="open">
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Это действие невозможно отменить. Это приведет к удалению данного листа навсегда.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction @click="list.deleteList(deleteId)">Удалить</AlertDialogAction>
                  <AlertDialogCancel>Отменить</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          <div class="flex items-end gap-4 justify-between md:flex-row md:items-center">
            <div
              class="flex space-y-2 text-sm text-muted-foreground flex-col md:space-x-4 md:flex-wrap md:space-y-0 2xl:flex-row">
              <div class="flex items-center">
                <CircleIcon class="mr-1 h-3 w-3 fill-sky-400 text-red-500" />
                {{item.type}}
              </div>
              <div class=" md:mt-0">Крайний срок {{item.lastApdate}}</div>
            </div>
            <div class="block">
              <!-- {{ item.participants }} -->
              <AvatarsGroup :avatars="item.participants" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  <Pagination v-slot="{ page }" :total="props.items.length" :default-page="1" :sibling-count="1" show-edges :items-per-page="itemsPerPage">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst @click="changePage(1)"/>
      <PaginationPrev @click="changePage(currentPage - 1)"/>

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child @click="changePage(item.value)">
          <Button class="w-9 h-9 p-0" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @click="changePage(currentPage + 1)"/>
      <PaginationLast @click="changePage(pageCount)"/>
    </PaginationList>
  </Pagination>
</template>
