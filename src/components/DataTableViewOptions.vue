<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import type { Task } from '@/lib/schema'
import { MixerHorizontalIcon, PlusIcon } from '@radix-icons/vue'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps {
  table: Table<Task>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" class="flex h-8 md:ml-auto ">
        <MixerHorizontalIcon class="mr-2 h-4 w-4" />
        Отображение
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>Видимые колонки</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem v-for="column in columns" :key="column.id" class="capitalize"
        :checked="column.getIsVisible()" @update:checked="(value) => column.toggleVisibility(!!value)">
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>