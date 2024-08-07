<script setup lang="ts">


import { ref, onMounted, watch, getCurrentInstance, computed, reactive  } from 'vue'

import Search from '@/components/Search.vue'
import type { Task } from '@/lib/schema'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import { useMedia } from "@/lib/useMedia";


import DataTableRowActions from './DataTableRowActions.vue'
import { useListStore } from '@/store/ListsStore'


interface DataTableProps {
	data: Task[]
	id: string
}
const props = defineProps<DataTableProps>()

const rowSelection = ref({})

import DetailTask from '@/components/DetailTask.vue'
import CardChat from '@/components/CardChat.vue'
import TeamMembers from '@/components/TeamMembers.vue'
import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'
const userStore = useUserStore()
const globalStore = useGlobalStore()
const listStore = useListStore()

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

const isMobile = useMedia("(max-width: 768px)")

const classPriority = reactive({
	"bg-green": 'low',
	'bg-red': 'high'
})

const tasks = ref(props.data)

const searchValue= ref('')

const filters = ref(listStore.filters[0].checked)

const isCheckable = ref(false)

const checkedLabels = ref(listStore.filters[0].checked.map(item => item.value));

// console.log(checkedLabels);
// console.log(tasks.value);

const filteredList = function(searchValue, filterValue) {
  if (filters.value.length) {
    return tasks.value.filter((task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase()) && filterValue.includes(task.priority)
    );
  } else {
    return tasks.value.filter((task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}

const selectedItems = ref([])

watch(listStore.filters[0].checked, (newValue, oldValue) => {
  filters.value = listStore.filters[0].checked
  checkedLabels.value = listStore.filters[0].checked.map(item => item.value)

})

</script>

<template>
  <DataTableToolbar
    @changeQuery="(value) => searchValue = value"
    @toggleCheck="isCheckable = !isCheckable"
    :filters="listStore.filters"/>
  <div class="grid gap-4 md:grid-cols-2 2xl:grid-cols-3 transition overflow-hidden" :class="{'md:gap-y-10':isCheckable}">
    <div v-for="(item, key) in filteredList(searchValue, checkedLabels)" :key="key" class="relative">
      <DetailTask :item="item" :id="item.id" :isCheckable="isCheckable"/>
    </div>
  </div>
</template>