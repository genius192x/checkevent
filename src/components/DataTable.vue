<script setup lang="ts">
import { ref, onMounted, watch, getCurrentInstance, computed } from 'vue'
import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
} from '@tanstack/vue-table'

import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetHeader,
	SheetTitle,
	SheetDescription
} from '@/components/ui/sheet'
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
import ChangeTask from '@/components/form/ChangeTask.vue'
import CardChat from '@/components/CardChat.vue'
import { Vue3Lottie } from 'vue3-lottie'
import EmptyListJSON from '../assets/animationEmptyList.json'
import TeamMembers from '@/components/TeamMembers.vue'

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
})
const openImages = ref(false)

		const isMobile = useMedia("(max-width: 768px)")

		const currRows = computed(() => tableData.value)


		let side = 'bottom';
		if (window.innerWidth > 768) {
			side = 'right'
		}


		const url = window.location.href;
		const lastParam = url.split("/").slice(-1)[0];
		const isChangeOpen = ref({})

function closeChangeForm() {
	isChangeOpen.value = !isChangeOpen.value
}
</script>

<template>
	<div class="space-y-4">
		<DataTableToolbar :table="table" />
		<div class="rounded-md border">
			<div>
				<div class="border-b">
					<div v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id"
					class="grid grid-cols-[35px_1fr] align-middle md:grid-cols-[35px_1fr_6fr_2fr_2fr]">
						<div v-for="header in headerGroup.headers" :key="header.id" class="p-4 py-3"
						:class="{ 'hidden md:block': isMobileHidden(header.id) }">
							<FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
							:props="header.getContext()"/>
					</div>
				</div>
			</div>
			<div class=" flex flex-col gap-1">
				<Collapsible v-if="table.getRowModel().rows?.length" :key="row.id" v-for="row in table.getRowModel().rows"
					:data-state="row.getIsSelected() || 'выбрано'" class="border-b">
							<ContextMenu>
								<ContextMenuTrigger>
										<div class="grid grid-cols-[35px_1fr] align-middle md:grid-cols-[35px_1fr_6fr_2fr_2fr] overflow-hidden relative select-none">
											<CollapsibleTrigger class="absolute w-[90%] h-full top-0 left-0 ml-8 mr-8"></CollapsibleTrigger>
											<div v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-4 py-3"
												:class="{ 'md:col-start-6 hidden md:block': cell.id == '0_actions', 'hidden md:block': isMobileHidden(cell.column.id) }">
												<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
										</div>
									</div>
									<CollapsibleContent class="flex flex-col">
										<DetailTask  :item="row.original"/>
									</CollapsibleContent>
								</ContextMenuTrigger>
								<ContextMenuContent>
									<ContextMenuItem @click="isChangeOpen[row.original.id] = true">Изменить</ContextMenuItem>
									<ContextMenuSeparator/>
									<ContextMenuItem @click="listStore.deleteTask(lastParam, row.original)" class="text-red-800">Удалить</ContextMenuItem>
								</ContextMenuContent>
							</ContextMenu>
							<Sheet :open="isChangeOpen[row.original.id]">
								<!-- TODO v-if="userStore.userData.admin" верни на кнопку -->
								<SheetContent @close="isChangeOpen = {}" :side=side
									class="w-[100%] max-h-[80%] p-4 pb-4 rounded-t-xl md:w-[440px] sm:max-w-none md:max-h-none md:rounded-xl md:p-3 outline-0 md:m-3 h-auto">
									<SheetHeader>
										<SheetTitle>Редактирование задачи</SheetTitle>
									</SheetHeader>
									<ChangeTask :item="row.original" @close="isChangeOpen = {}"/>
								</SheetContent>
							</Sheet>
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