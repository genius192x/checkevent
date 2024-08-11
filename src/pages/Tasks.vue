<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import { columns } from '@/components/columns'
import { onBeforeMount, watch, getCurrentInstance, onUpdated } from 'vue'
import { ref } from "vue";
import draggable from 'vuedraggable'
import RawDisplayer from '@/components/RawDisplayer.vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/store/ListsStore'
const listStore = useListStore()


const props = defineProps({
	id: String
})

const isDraggable = ref(false)
const currList = ref(null)
const taskList = ref(null)
const drag = ref(false)


const list1= ref([
	{ name: "John", id: 1 },
	{ name: "Joao", id: 2 },
	{ name: "Jean", id: 3 },
	{ name: "Gerard", id: 4 }
])
const list2=  ref([
	{ name: "Juan", id: 5 },
	{ name: "Edgard", id: 6 },
	{ name: "Johnson", id: 7 }
])


function sort() {
	this.list = this.list.sort((a, b) => a.order - b.order);
}
function dragOptions() {
	return {
		animation: 200,
		group: "description",
		disabled: false,
		ghostClass: "ghost"
	};
}

onBeforeMount(() => {
	currList.value = listStore.getItemById(props.id)

	if(currList.value){
		taskList.value = currList.value.tasks
  }
  // console.log(currList.value);
})

let updateCount = ref(0)


watch(listStore.list, () => {
	updateCount.value++
})

</script>

<template>
	<div class=" flex-1 flex-col min-h-full space-y-8 p-2  md:flex md:p-8 bg-background">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight" v-if="currList.title">
					{{currList.title}}
				</h2>
				<p class="text-muted-foreground">
					Ниже представлен список всех необходимых задач
				</p>
			</div>
		</div>
		<div class="flex" v-if="isDraggable">
			<div class="w-[25%] border-primary border p-5">
				<h3 class="bg-slate-300 p-3">Лист 1</h3>
				<draggable class="list-group" v-model="list1" group="people" @change="log" itemKey="name" :animation="200">
					<template #item="{ element, index }">
						<div class="list-group-item bg-sky-300 p-3">{{ element.name }} {{ index }}</div>
					</template>
				</draggable>
			</div>

			<div class="w-[25%] border-primary border p-5">
				<h3 class="bg-slate-300 p-3">Лист 2</h3>
				<draggable class="list-group" v-model="list2" group="people" @change="log" itemKey="name2" :animation="200">
					<template #item="{ element, index }">
						<div class="list-group-item bg-sky-300 p-3">{{ element.name }} {{ index }}</div>
					</template>
				</draggable>
			</div>

			<rawDisplayer class="col-3" :value="list1" title="List 1" />

			<rawDisplayer class="col-3" :value="list2" title="List 2" />
		</div>

		<DataTable :data="taskList" :id="+props.id" :key="updateCount" v-else />
	</div>
</template>

<style>
.button {
	margin-top: 35px;
}

.flip-list-move {
	transition: transform 0.5s;
}

.no-move {
	transition: transform 0s;
}

.ghost {
	opacity: 0.5;
	background: #c8ebfb;
}

.list-group {
	min-height: 20px;
}

.list-group-item {
	cursor: move;
}

.list-group-item i {
	cursor: pointer;
}
</style>