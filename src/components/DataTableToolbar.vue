<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed, ref } from 'vue'
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
	filters: any[]
}

const props = defineProps<DataTableToolbarProps>()

const emit = defineEmits(['setFilter','changeQuery', 'toggleCheck'])
const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
let side = 'bottom';
if (window.innerWidth > 768) {
	side = 'right'
}
function updateFilter(values) {
  emit('setFilter', values)
}

const value = ref('')

</script>

<template>
	<div class="flex flex-col gap-8 md:justify-between md:items-center md:flex-row">
		<div class="flex gap-2 flex-1 flex-wrap md:space-x-2 md:items-center">
			<Input
        type="search"
        v-model="value"
        placeholder="Поиск по названию"
        class="md:w-[300px] lg:w-[350px]"
        @input="$emit('changeQuery', value)"
  		/>
			<DataTableFacetedFilter
        v-for="filter in props.filters"
				:value="filter.value"
				:title="filter.label"
				:options="filter.options"
        :checked="filter.checked"
        @set-filter="(value)=> console.log(value)"
			/>

			<!-- <Button
				v-if="isFiltered"
				variant="ghost"
				class="h-8 px-2 lg:px-3"
				@click="table.resetColumnFilters()"
			>
				Сбросить
				<Cross2Icon class="ml-2 h-4 w-4" />
			</Button> -->
      <Sheet :open="globalStore.isSheetOpen">
        <SheetTrigger>
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
    <Button @click="$emit('toggleCheck')">
      Выбрать
    </Button>
	</div>
</template>
