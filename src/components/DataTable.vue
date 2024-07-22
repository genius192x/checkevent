<script setup lang="ts">
import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
} from '@tanstack/vue-table'

import { ref, onMounted, watch, getCurrentInstance, computed, reactive  } from 'vue'
import {
	FlexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useVueTable,
} from '@tanstack/vue-table'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'
import CaretSortIcon from '@radix-icons/vue/CaretSortIcon'
import { CalendarIcon, ChatBubbleIcon } from '@radix-icons/vue'
import type { Task } from '@/lib/schema'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import { valueUpdater } from '@/lib/utils'
import { useMedia } from "@/lib/useMedia";
import AvatarsGroup from "@/components/AvatarsGroup.vue"
import UploadFile from '@/components/UploadFile.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import { useListStore } from '@/store/ListsStore'


interface DataTableProps {
	columns: ColumnDef<Task, any>[]
	data: Task[]
	id: string
}
const props = defineProps<DataTableProps>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const tableData = ref(props.data)

const table = useVueTable({
	data: tableData.value,
	get columns() { return props.columns },
	state: {
		get sorting() { return sorting.value },
		get columnFilters() { return columnFilters.value },
		get columnVisibility() { return columnVisibility.value },
		get rowSelection() { return rowSelection.value },
	},
	enableRowSelection: true,
	onStateChange:  updaterOrValue => valueUpdater(updaterOrValue, sorting),
	onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
	onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
	onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
	onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
	getCoreRowModel: getCoreRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFacetedRowModel: getFacetedRowModel(),
	getFacetedUniqueValues: getFacetedUniqueValues(),
})
import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import DetailTask from '@/components/DetailTask.vue'
import CardChat from '@/components/CardChat.vue'
import TeamMembers from '@/components/TeamMembers.vue'
import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'
const userStore = useUserStore()
const globalStore = useGlobalStore()
const listStore = useListStore()

const clickedRow = ref(null)


function isMobileHidden(data) {
	return data == 'id' || data == 'status' || data == 'priority' || data == 'actions'
}
console.log(props.data);
const selectedRows = computed(() => {


	return table.getSelectedRowModel().rows
})

watch(selectedRows, () => {
	clickedRow.value = selectedRows;
	// console.log(clickedRow.value.value.at(-1));
	// console.log(table.getState().rowSelection);

	// console.log(table.getRowModel().rows[4].toggleSelected(true));

})

let previewImage = ref(null);
function uploadImage(e) {
	const image = e.target.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onload = e => {
		previewImage.value = e.target.result;
		console.log(e);
	};
}

const isMobile = useMedia("(max-width: 768px)")

const classPriority = reactive({
	"bg-green": 'low',
	'bg-red': 'high'
})

const tasks = ref(props.data)

function getClass(property) {
	return {
		'bg-red-300 text-red-900': (property === 'high'),
		'bg-amber-200 text-amber-700': (property === 'medium'),
		'bg-green-300 text-green-800': (property === 'low'),
	}
}
const avatars = ref([{ "name": "Михаил", "surname": "Левченко", "email": "levchenko@mail.ru", "password": "lev123", "avatar": "04.png" }, { "name": "Олег", "surname": "", "email": "oleg@mail.ru", "password": "ole123", "avatar": "04.png" }, { "name": "Сергей", "surname": "Моисеев", "email": "moiseev@mail.ru", "password": "moi123", "avatar": "03.png" }, { "name": "Настя", "surname": "Курбатова", "email": "kurbatova@mail.ru", "password": "kur123", "avatar": "01.png" }])

function setFilter(values) {
  if (values.length) {
    let filterResult = [];
    values.forEach(value => {

      let tasks = props.data.slice()
      tasks.forEach(item => {
        if (item.priority === value) {
          filterResult.push(item)
        }
      })
    });
    tasks.value = filterResult
  }
}

</script>

<template>
  <!-- {{ selectedRows }} -->
  <div class="space-y-4">
    <DataTableToolbar :table="table" />
    <div class="rounded-md border">
      <div>
        <div class="border-b">
          <div v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id"
            class="grid grid-cols-[35px_1fr] align-middle md:grid-cols-[35px_1fr_3fr_1fr_1fr_71px]">
            <div v-for="header in headerGroup.headers" :key="header.id" class="p-4 py-3"
              :class="{'hidden md:block': isMobileHidden(header.id)}">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()" />
            </div>
          </div>
        </div>
        <div class=" flex flex-col gap-1">
          <Collapsible v-if="table.getRowModel().rows?.length" :key="row.id" v-for="row in table.getRowModel().rows"
            :data-state="row.getIsSelected() || 'selected'" class="border-b">
            <div
              class="grid grid-cols-[35px_1fr] align-middle md:grid-cols-[35px_1fr_3fr_1fr_1fr_71px] overflow-hidden relative">
              <CollapsibleTrigger class="absolute w-full h-full top-0 left-0 ml-8"></CollapsibleTrigger>
              <div v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-4 py-3 "
                :class="{'md:col-start-6 hidden md:block': cell.id == '0_actions', 'hidden md:block': isMobileHidden(cell.column.id) }">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </div>
            </div>
            <CollapsibleContent class="flex flex-col">
              <div class="flex flex-col flex-wrap lg:flex-row">
                <div class="max-w-full flex-1 p-2 md:p-4" v-if="!isMobile">
                  <CardChat />
                </div>
                <div class="align-top p-2 md:p-4">
                  <TeamMembers />
                </div>
              </div>
              <div class="px-6">
                <UploadFile />
              </div>
              <Collapsible class="w-full space-y-2 p-2" v-if="isMobile">

                <CollapsibleTrigger as-child="" class="w-full">
                  <Button variant="ghost" class="p-2 flex items-center justify-between space-x-4 px-4 w-full">
                    <span>Показать содержимое чата</span>
                    <CaretSortIcon class="h-4 w-4" />
                    <!-- <span class="sr-only">Toggle</span> -->
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent class="space-y-2">
                  <CardChat />
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>

    <DataTablePagination :table="table" />
  </div>
  <DataTableToolbar :table="table" @setFilter="(values) => setFilter(values)"/>
  <div class="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
    <div v-for="(item, key) in tasks" :key="key">
      <Sheet>
        <div class="space-y-3 cursor-pointer bg-primary-foreground p-4 rounded-sm relative">
          <div class="flex justify-between items-center">
            <div class="p-1 rounded-md text-xs min-w-16 text-center text-white font-semibold shadow-muted-foreground"
              :class="getClass(item.priority)">
              {{ item.priority }}
            </div>
            <!-- TODO после mvp нужно добавить действия с задачей -->
            <!-- <DataTableRowActions :row="item" /> -->
          </div>
          <div class="text-xl">
            {{ item.title }}
          </div>
          <div class="flex items-center gap-7">
            <div class="flex items-center gap-2">
              <CalendarIcon />
              <span>Jun 21</span>
            </div>
            <div class="flex items-center gap-2">
              <ChatBubbleIcon />
              <span>4</span>
            </div>
            <div class="block ml-auto">
              <AvatarsGroup :avatars="avatars" />
            </div>
          </div>
          <SheetTrigger class="absolute w-full h-full top-0 left-0" />
          <SheetContent
            class="w-[100%] h-[100dvh] p-4 pb-4 rounded-t-xl md:w-[440px] sm:max-w-none md:max-h-none md:rounded-xl md:p-3 outline-0 md:m-3 h-auto">
            <SheetHeader>
              <SheetTitle> {{ item.title }}</SheetTitle>
            </SheetHeader>
            <DetailTask />
          </SheetContent>
        </div>
      </Sheet>
    </div>

  </div>
</template>