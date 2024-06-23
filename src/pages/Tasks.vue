<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import { columns } from '@/components/columns'
import { useListStore } from '@/store/ListsStore'
import { onBeforeMount } from 'vue'
import {ref} from "vue";

const listStore = useListStore()


const props = defineProps({
  id: String
})

const currList = ref({})
const taskList = ref([])

onBeforeMount(() => {
	currList.value = listStore.getItemById(props.id)
	if(currList.value){
		taskList.value = currList.value.tasks
	}

})
</script>

<template>
	<div class=" h-full flex-1 flex-col space-y-8 p-4  md:flex md:p-8">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight" v-if="currList.title">
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