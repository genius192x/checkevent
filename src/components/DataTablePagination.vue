<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import type { Task } from '@/lib/schema'
import { ChevronLeftIcon } from '@radix-icons/vue'
import { ChevronRightIcon } from '@radix-icons/vue'
import { DoubleArrowLeftIcon } from '@radix-icons/vue'
import { DoubleArrowRightIcon } from '@radix-icons/vue'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps {
  table: Table<Task>
}
const props = defineProps<DataTablePaginationProps>()

let isDoneCount = 0
props.table.getRowModel().rows.forEach(row => {
  row.original.isDone ? isDoneCount++ : null
})
console.log(props.table.getRowModel());

</script>

<template>
  <div class="flex flex-col gap-4 justify-between md:flex-row md:items-center md:px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ isDoneCount }} из
      {{ table.getFilteredRowModel().rows.length }} строк(и) выполнено.
    </div>
    <div class="flex flex-col flex-wrap gap-2 lg:space-x-8 md:flex-row md:items-center md:space-x-6">
      <div class="flex items-center space-x-2 md:items-center">
        <p class="text-sm font-medium">
          Строк на странцие
        </p>
        <Select :model-value="`${table.getState().pagination.pageSize}`" @update:model-value="table.setPageSize">
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex">
        <div class="flex w-[140px] items-center  text-sm font-medium md:justify-center">
          Страница {{ table.getState().pagination.pageIndex + 1 }} из
          {{ table.getPageCount() }}
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" class="hidden h-8 w-8 p-0 lg:flex" :disabled="!table.getCanPreviousPage()"
            @click="table.setPageIndex(0)">
            <span class="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon class="h-4 w-4" />
          </Button>
          <Button variant="outline" class="h-8 w-8 p-0" :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()">
            <span class="sr-only">Go to previous page</span>
            <ChevronLeftIcon class="h-4 w-4" />
          </Button>
          <Button variant="outline" class="h-8 w-8 p-0" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
            <span class="sr-only">Go to next page</span>
            <ChevronRightIcon class="h-4 w-4" />
          </Button>
          <Button variant="outline" class="hidden h-8 w-8 p-0 lg:flex" :disabled="!table.getCanNextPage()"
            @click="table.setPageIndex(table.getPageCount() - 1)">
            <span class="sr-only">Go to last page</span>
            <DoubleArrowRightIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>