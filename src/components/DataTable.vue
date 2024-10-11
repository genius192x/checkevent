<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'

import { ref, onMounted, watch, getCurrentInstance, computed } from 'vue'
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
import CaretSortIcon from '@radix-icons/vue/CaretSortIcon'
import type { Task } from '@/lib/schema'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import DetailTask from '@/components/DetailTask.vue'
import { valueUpdater } from '@/lib/utils'
import { useMedia } from "@/lib/useMedia";
import UploadFile from '@/components/UploadFile.vue'
import { useListStore } from '@/store/ListsStore'
const listStore = useListStore()
const props = defineProps<{
  columns: ColumnDef<Task, any>[]
  data: Task[]
  id: string,
}>()

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
  onStateChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
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
import CardChat from '@/components/CardChat.vue'
import { Vue3Lottie } from 'vue3-lottie'
import EmptyListJSON from '../assets/animationEmptyList.json'
import TeamMembers from '@/components/TeamMembers.vue'
import { log } from 'console'
import { setInterval } from 'timers'

const clickedRow = ref(null)

function isMobileHidden(data) {
  return data == 'id' || data == 'status' || data == 'priority' || data == 'actions'
}
// console.log(props.data);
const selectedRows = computed(() => {


  return table.getSelectedRowModel().rows
})

watch(selectedRows, () => {
  clickedRow.value = selectedRows;
  // console.log(clickedRow.value.value.at(-1));
  // console.log(table.getState().rowSelection);

  // console.log(table.getRowModel().rows[4].toggleSelected(true));

})
const openImages = ref(false)

// let previewImage = ref(null);
// function uploadImage(e) {
//   const image = e.target.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(image);
//   reader.onload = e => {
//     previewImage.value = e.target.result;
//     console.log(e);
//   };
// }

const isMobile = useMedia("(max-width: 768px)")

const currRows = computed(() => tableData.value)


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
              :class="{ 'hidden md:block': isMobileHidden(header.id) }">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()" />
            </div>
          </div>
        </div>
        <div class=" flex flex-col gap-1">
          <Collapsible v-if="table.getRowModel().rows?.length" :key="row.id" v-for="row in table.getRowModel().rows"
            :data-state="row.getIsSelected() || 'выбрано'" class="border-b">
            <div
              class="grid grid-cols-[35px_1fr] align-middle md:grid-cols-[35px_1fr_3fr_1fr_1fr_71px] overflow-hidden relative">
              <CollapsibleTrigger class="absolute w-[90%] h-full top-0 left-0 ml-8 mr-8"></CollapsibleTrigger>
              <div v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-4 py-3"
                :class="{ 'md:col-start-6 hidden md:block': cell.id == '0_actions', 'hidden md:block': isMobileHidden(cell.column.id) }">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
              </div>
            </div>
            <CollapsibleContent class="flex flex-col">
              <DetailTask  :item="row.original"/>
            </CollapsibleContent>
          </Collapsible>
					<div class="" v-else>
						<Vue3Lottie class="cursor-pointer" :animationData="EmptyListJSON" :height="200" :width="200" :loop="false" @click="isFormOpen = true"/>
						<div class="text-center">Задач пока нет</div>
					</div>
        </div>
      </div>
    </div>

    <DataTablePagination :table="table" v-if="table.getRowModel().rows?.length" />
  </div>
</template>