<script setup lang="ts">
import { ChevronDownIcon } from '@radix-icons/vue'
import { CircleIcon } from '@radix-icons/vue'
import { FieldArray, useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import ChangeListForm from "@/components/form/ChangeListForm.vue"
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
  item: Item,
}
const props = defineProps<Props>()

const deleteId = ref(0)

const confirmOpen = function (item, type) {
  deleteConfirm.value = true
  deleteId.value = item.id
}

const deleteConfirm = ref(false)
const backupConfirm = ref(false)

function copyItem(item) {
  const copiedList = Object.assign({}, list.getItemById(item.id));
  copiedList.title = `${copiedList.title} (копия)`

  list.copyList(copiedList)
}
let side = 'bottom';
if (window.innerWidth > 768) {
  side = 'right'
}
const isChangeOpen = ref(false)
</script>

<template>
  <Card @click="$router.push(`/list/${props.item.id}`)" class="cursor-pointer h-full flex flex-col justify-between">
    <CardHeader class="grid grid-cols-[minmax(0,1fr)_32px] items-start gap-4 space-y-0 p-4 md:p-6">
      <div class="space-y-1">
        <CardTitle>{{ props.item.title }}
        </CardTitle>
        <CardDescription class="pt-2">
          {{ props.item.description }}
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
            <DropdownMenuItem @click="copyItem(props.item)">
              Скопировать лист
            </DropdownMenuItem>
            <DropdownMenuItem @click="isChangeOpen = true">
              Редактировать лист
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem v-if="!props.item.isArchived" class="text-red-500" @click="confirmOpen(props.item, 'del')">Удалить
              лист
            </DropdownMenuItem>
            <DropdownMenuItem v-else class="text-red-500" @click="confirmOpen(props.item, 'back')">Восстановить лист
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet :open="isChangeOpen">
          <!-- TODO v-if="userStore.userData.admin" верни на кнопку -->
          <SheetContent @close="isChangeOpen = !isChangeOpen" :side=side
            class="w-[100%] max-h-[80%] p-4 pb-4 rounded-t-xl md:w-[440px] sm:max-w-none md:max-h-none md:rounded-xl md:p-3 outline-0 md:m-3 h-auto">
            <SheetHeader>
              <SheetTitle>Редактирование листа</SheetTitle>
            </SheetHeader>
            <ChangeListForm :item="props.item" @close="isChangeOpen = !isChangeOpen"/>
          </SheetContent>
        </Sheet>
      </div>
    </CardHeader>
    <CardContent class="p-4 pt-0 md:p-6">
      <AlertDialog v-model:open="deleteConfirm">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие приведет к {{ props.item.isArchived ? 'восстановлению' : 'удалению' }} данного листа.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction v-if="!props.item.isArchived" @click="list.deleteList(deleteId)">Удалить</AlertDialogAction>
            <AlertDialogAction v-else @click="list.backupList(deleteId)">Восстановить</AlertDialogAction>
            <AlertDialogCancel>Отменить</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div class="flex items-end gap-4 justify-between md:flex-row md:items-center">
        <div class="flex space-y-2 text-sm text-muted-foreground flex-col md:space-x-4 md:space-y-0">
          <div class="flex items-center">
            <CircleIcon class="mr-1 h-3 w-3 fill-sky-400 text-red-500" />
            {{ props.item.type }}
          </div>
          <div class=" md:mt-0">Крайний срок {{ props.item.lastApdate.toLocaleDateString('ru-RU') }}</div>
        </div>
        <div class="block">
          <!-- {{ props.item.participants }} -->
          <AvatarsGroup :avatars="props.item.participants" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
