<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import type { Task } from '@/lib/schema'
import { ref } from 'vue'

import { priorities, statuses } from '@/lib/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import { Cross2Icon } from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CreateTask from './form/CreateTask.vue'
import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'
import { PlusIcon } from '@radix-icons/vue'
import { Download } from 'lucide-vue-next'
import { Upload } from 'lucide-vue-next'
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetHeader,
	SheetTitle,
	SheetDescription
} from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
const userStore = useUserStore()
const globalStore = useGlobalStore()
interface DataTableToolbarProps {
	table: Table<Task>
	}

	const props = defineProps<DataTableToolbarProps>()

	const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
	let side = 'bottom';
	if (window.innerWidth > 768) {
		side = 'right'
	}
	const emit = defineEmits(['open-form'])

	const isFormOpen = ref(false)
	const open = ref(false)

	function openForm() {
		isFormOpen.value = true,
		emit('open-form')
	}
</script>

<template>
	<div class="flex flex-col gap-4 md:justify-between md:items-center md:flex-row">
		<div class="flex gap-2 flex-1 flex-wrap md:space-x-2 md:items-center">
			<Input placeholder="Поиск по названию..."
			:model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
			class="h-8 lg:w-[250px] w-full md:w-[150px]"
			@input="table.getColumn('title')?.setFilterValue($event.target.value)" />
			<DataTableFacetedFilter v-if="table.getColumn('status')" :column="table.getColumn('status')" title="Статус"
			:options="statuses" />
			<DataTableFacetedFilter v-if="table.getColumn('priority')" :column="table.getColumn('priority')" title="Приоритет"
			:options="priorities" />

			<Button v-if="isFiltered" variant="ghost" class="h-8 px-2 lg:px-3" @click="table.resetColumnFilters()">
				Сбросить
				<Cross2Icon class="ml-2 h-4 w-4" />
			</Button>
		</div>
		<DataTableViewOptions :table="table" />
		<Button size="sm" class="flex h-8 md:ml-auto" @click="open = true">
			<Download class="mr-2 h-4 w-4" />
			<!-- <Upload class="mr-2 h-4 w-4" /> -->
			XLS
		</Button>
		<Dialog v-model:open="open">
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Импорт / Экспорт XLS файлов</DialogTitle>
					<DialogDescription>
						Вы можете экспортировать список задач из данного листа в формате XLS файла. Если у вас есть файл, который соответсвует <a href="#"> шаблону </a>, вы можете импортировать его.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="secondary" @click="open = false">
						Закрыть
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
		<Sheet :open="isFormOpen">
			<SheetTrigger>
				<Button size="sm" class="flex h-8 md:ml-auto" @click="openForm">
					<PlusIcon class="mr-2 h-4 w-4" />
					Новая задача
				</Button>
			</SheetTrigger>
			<SheetContent
			@close="isFormOpen = !isFormOpen"
			:side=side
			class="w-[100%] max-h-[80%] p-4 pb-4 rounded-t-xl md:w-[440px] sm:max-w-none md:max-h-none md:rounded-xl md:p-3 outline-0 md:m-3 h-auto">
			<SheetHeader>
				<SheetTitle>Создание новой задачи</SheetTitle>
			</SheetHeader>
			<CreateTask :list-id="$route.params.id" @close="isFormOpen = false"/>
		</SheetContent>
	</Sheet>

</div>
</template>