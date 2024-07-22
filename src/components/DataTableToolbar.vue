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
import CreateTask from './form/CreateTask.vue'
import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'
import { PlusIcon } from '@radix-icons/vue'
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetHeader,
	SheetTitle,
	SheetDescription
} from '@/components/ui/sheet'
const userStore = useUserStore()
const globalStore = useGlobalStore()
interface DataTableToolbarProps {
	table: Table<Task>
}

const props = defineProps<DataTableToolbarProps>()

const emit = defineEmits(['setFilter'])
const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
let side = 'bottom';
if (window.innerWidth > 768) {
	side = 'right'
}
function updateFilter(values) {
  emit('setFilter', values)
}

</script>

<template>
	<div class="flex flex-col gap-4 md:justify-between md:items-center md:flex-row">
		<div class="flex gap-2 flex-1 flex-wrap md:space-x-2 md:items-center">
			<Input
				placeholder="Поиск по названию..."
				:model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
				class="h-8 lg:w-[250px] w-full md:w-[150px]"
				@input="table.getColumn('title')?.setFilterValue($event.target.value)"
			/>
			<!-- <DataTableFacetedFilter
				v-if="table.getColumn('status')"
				:column="table.getColumn('status')"
				title="Статус"
				:options="statuses"
			/> -->
			<DataTableFacetedFilter
				v-if="table.getColumn('priority')"
				:column="table.getColumn('priority')"
				title="Приоритет"
        @setFilter="(values) => updateFilter(values)"
				:options="priorities"
			/>

			<Button
				v-if="isFiltered"
				variant="ghost"
				class="h-8 px-2 lg:px-3"
				@click="table.resetColumnFilters()"
			>
				Сбросить
				<Cross2Icon class="ml-2 h-4 w-4" />
			</Button>
		</div>
		<DataTableViewOptions :table="table" />
		<Sheet :open="globalStore.isSheetOpen">
			<SheetTrigger v-if="userStore.userData.admin">
				<Button
					variant="outline"
					size="sm"
					class="flex h-8 md:ml-auto"
					@click="globalStore.isSheetOpen = true"
				>
					<PlusIcon class="mr-2 h-4 w-4" />
					Новая задача
				</Button>
			</SheetTrigger>
			<SheetContent :side=side class="w-[100%] max-h-[80%] p-4 pb-4 rounded-t-xl md:w-[440px] sm:max-w-none md:max-h-none md:rounded-xl md:p-3 outline-0 md:m-3 h-auto">
				<SheetHeader>
					<SheetTitle>Создание новой задачи</SheetTitle>
				</SheetHeader>
				<CreateTask :list-id="$route.params.id"/>
			</SheetContent>
		</Sheet>

	</div>
</template>
