<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import type { Task } from '@/lib/schema'

import { priorities, statuses } from '@/lib/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import {Cross2Icon} from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DataTableToolbarProps {
	table: Table<Task>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
	<div class="flex flex-col gap-4 md:justify-between md:items-center md:flex-row">
		<div class="flex gap-2 flex-1 flex-wrap md:space-x-2 md:items-center">
			<Input
				placeholder="Filter tasks..."
				:model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
				class="h-8 lg:w-[250px] w-full md:w-[150px]"
				@input="table.getColumn('title')?.setFilterValue($event.target.value)"
			/>
			<DataTableFacetedFilter
				v-if="table.getColumn('status')"
				:column="table.getColumn('status')"
				title="Status"
				:options="statuses"
			/>
			<DataTableFacetedFilter
				v-if="table.getColumn('priority')"
				:column="table.getColumn('priority')"
				title="Priority"
				:options="priorities"
			/>

			<Button
				v-if="isFiltered"
				variant="ghost"
				class="h-8 px-2 lg:px-3"
				@click="table.resetColumnFilters()"
			>
				Reset
				<Cross2Icon class="ml-2 h-4 w-4" />
			</Button>
		</div>
		<DataTableViewOptions :table="table" />
	</div>
</template>
