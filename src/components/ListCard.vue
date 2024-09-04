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
import CreateList from "@/components/form/CreateList.vue"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'
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
import { parse } from 'date-fns';
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
import { useGlobalStore } from '@/store/GlobalStore'
import { item } from '@unovis/ts/components/bullet-legend/style'
const list = useListStore()
const globalStore = useGlobalStore()

interface Item {
  id: number,
  lastApdate: any,
  title: string,
  type: string,
  description: string,
  status: string,
  isArchived: boolean,
  participants: [],
}

interface Props {
  items: Item[],
  sorted: string,
  style: string,
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
  const slicedItems = ref(props.items.slice(startIndex, endIndex));
  const sortedItems = ref(slicedItems.value.map(value => value));

  sortedItems.value.forEach(item => {
    item.lastApdate = new Date(item.lastApdate);
  })

  if (props.sorted === 'asc') {
    sortedItems.value.sort((a, b) => a.lastApdate - b.lastApdate)

    console.log();

  } else if (props.sorted === 'desc') {
    sortedItems.value.sort((a, b) => b.lastApdate - a.lastApdate)
  }

  return sortedItems.value
});

const deleteId = ref(0)

const confirmOpen = function (item, type) {
  deleteConfirm.value = true
  deleteId.value = item.id
}

const deleteConfirm = ref(false)
const backupConfirm = ref(false)

function changePage(pageNumber) {
  console.log(itemsPerPage.value);
  currentPage.value = pageNumber;
}
function copyItem(item) {
  const copiedList = Object.assign({}, list.getItemById(item.id));
  copiedList.title = `${copiedList.title} (копия)`

  list.copyList(copiedList)
}
let side = 'bottom';
if (window.innerWidth > 768) {
  side = 'right'
}
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" :class="{'!grid-cols-1' : props.style === 'column'}">
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
                <DropdownMenuItem @click="copyItem(item)">
                  Скопировать лист
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Sheet :open="globalStore.isSheetOpen">
                    <!-- TODO v-if="userStore.userData.admin" верни на кнопку -->
                    <SheetTrigger @click="globalStore.isSheetOpen = true">
                      Редактировать лист
                    </SheetTrigger>
                    <SheetContent :side=side class="w-[100%] max-h-[80%] p-4 pb-4 rounded-t-xl md:w-[440px] sm:max-w-none md:max-h-none md:rounded-xl md:p-3 outline-0 md:m-3 h-auto">
                      <SheetHeader>
                        <SheetTitle>Создание нового листа</SheetTitle>
                      </SheetHeader>
                      <CreateList :text="'text'"/>
                    </SheetContent>
                  </Sheet>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem v-if="!item.isArchived" class="text-red-500" @click="confirmOpen(item, 'del')">Удалить лист
                </DropdownMenuItem>
                <DropdownMenuItem v-else class="text-red-500" @click="confirmOpen(item, 'back')">Восстановить лист
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent class="p-4 pt-0 md:p-6">
          <AlertDialog v-model:open="deleteConfirm">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие приведет к {{ item.isArchived ? 'восстановлению' : 'удалению' }} данного листа.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction v-if="!item.isArchived" @click="list.deleteList(deleteId)">Удалить</AlertDialogAction>
                <AlertDialogAction v-else @click="list.backupList(deleteId)">Восстановить</AlertDialogAction>
                <AlertDialogCancel>Отменить</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div class="flex items-end gap-4 justify-between md:flex-row md:items-center">
            <div
            class="flex space-y-2 text-sm text-muted-foreground flex-col md:space-x-4 md:space-y-0">
            <div class="flex items-center">
              <CircleIcon class="mr-1 h-3 w-3 fill-sky-400 text-red-500" />
              {{item.type}}
            </div>
            <div class=" md:mt-0">Крайний срок {{item.lastApdate.toLocaleDateString('ru-RU') }}</div>
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
