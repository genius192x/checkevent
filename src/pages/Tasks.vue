<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import { columns } from '@/components/columns'
import { useListStore } from '@/store/ListsStore'


const listStore = useListStore()


const props = defineProps({
  id: String
})

const currList = listStore.getItemById(props.id)
const taskList = currList.tasks
</script>

<template>
	<div class=" h-full flex-1 flex-col space-y-8 p-4  md:flex md:p-8">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">
					{{currList.title}}
				</h2>
				<p class="text-muted-foreground line-clamp-1">
					Ниже представлен список всех необходимых задач
				</p>
			</div>
		</div>
		<DataTable :data="taskList" :columns="columns" />
	</div>
</template>