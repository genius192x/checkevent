<script setup lang="ts">
import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
} from '@tanstack/vue-table'

import { ref, onMounted, watch, toRefs, computed } from 'vue'
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

import type { Task } from '@/lib/schema'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import { valueUpdater } from '@/lib/utils'
import UploadFile from '@/components/UploadFile.vue'

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
import CardChat from '@/components/CardChat.vue'
import TeamMembers from '@/components/TeamMembers.vue'
import { log } from 'console'


function isMobileHidden(data) {
	return data == 'id' || data == 'status' || data == 'priority'
}

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
</script>

<template>
	<div class="space-y-4">
		<DataTableToolbar :table="table" />
		<div class="rounded-md border">
			<div>
				<div class="border-b">
					<div v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" class="grid grid-cols-[35px_1fr_71px] align-middle md:grid-cols-[35px_1fr_3fr_1fr_1fr_71px]">
						<div v-for="header in headerGroup.headers" :key="header.id" class="p-4 py-3" :class="{'hidden md:block': isMobileHidden(header.id)}">
							<FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
						</div>
					</div>
				</div>
				<div class=" flex flex-col gap-4">
					<Collapsible
						v-if="table.getRowModel().rows?.length"
						:key="row.id"
						v-for="row in table.getRowModel().rows"
						:data-state="row.getIsSelected() || 'selected'"
						class="border-b">
						<div class="grid grid-cols-[35px_1fr_71px] align-middle md:grid-cols-[35px_1fr_3fr_1fr_1fr_71px]">
							<div v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-4 py-3" :class="{'md:col-start-6': cell.id == '0_actions', 'hidden md:block': isMobileHidden(cell.column.id) }">
								<CollapsibleTrigger as-child v-if="cell.column.columnDef.accessorKey === 'title'">
									<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
								</CollapsibleTrigger>

								<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"
									v-else />
							</div>
						</div>
						<CollapsibleContent class="flex flex-col">
							<div class="flex flex-col flex-wrap lg:flex-row">
								<div class="max-w-full flex-1 m-4">
									<CardChat/>
								</div>
								<div class="align-top m-4">
									<TeamMembers/>
								</div>
							</div>
							<UploadFile/>
						</CollapsibleContent>
					</Collapsible>
				</div>
			</div>
		</div>

		<DataTablePagination :table="table" />
	</div>
</template>
