<script setup lang="ts">
import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
} from '@tanstack/vue-table'
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

import { ref } from 'vue'
import type { Task } from '@/lib/schema'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import { valueUpdater } from '@/lib/utils'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

interface DataTableProps {
	columns: ColumnDef<Task, any>[]
	data: Task[]
}
const props = defineProps<DataTableProps>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
	get data() { return props.data },
	get columns() { return props.columns },
	state: {
		get sorting() { return sorting.value },
		get columnFilters() { return columnFilters.value },
		get columnVisibility() { return columnVisibility.value },
		get rowSelection() { return rowSelection.value },
	},
	enableRowSelection: true,
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
const isOpen = ref(false)
</script>

<template>
	<div class="space-y-4">
		<DataTableToolbar :table="table" />
		<div class="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
						<TableHead v-for="header in headerGroup.headers" :key="header.id">
							<FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
								:props="header.getContext()" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<template v-if="table.getRowModel().rows?.length">
						<Collapsible v-model:open="isOpen" class=" space-y-2" :as-child="true"
							v-for="row in table.getRowModel().rows" :key="row.id">
							<TableRow :isRow="true" :data-state="row.getIsSelected() && 'selected'">
								<TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
									<CollapsibleTrigger as-child v-if="cell.column.columnDef.accessorKey === 'title'">
										<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
									</CollapsibleTrigger>

									<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"
										v-else />
								</TableCell>
							</TableRow>

						</Collapsible>
					</template>

					<TableRow v-else>
						<TableCell :colspan="columns.length" class="h-24 text-center">
							Нет задач
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>

		<DataTablePagination :table="table" />
	</div>
</template>
