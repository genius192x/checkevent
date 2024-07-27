<script setup lang="ts">


import { ref, onMounted, watch, getCurrentInstance, computed, reactive  } from 'vue'

import Search from '@/components/Search.vue'
import type { Task } from '@/lib/schema'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import DataTableToolbarNew from './DataTableToolbar-new.vue'
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

console.log(props.data);

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


const filteredList = function(value) {
  console.log(value);
  console.log(tasks.value.filter((task) => task.title.toLowerCase().includes(value.toLowerCase())));

  return tasks.value.filter((task) =>
    task.title.toLowerCase().includes(value.toLowerCase())
  );
}


</script>

<template>
  <Search @changeQuery="(value) => searchValue = value"/>
  <DataTableToolbarNew :filters="listStore.filters"/>
  <div class="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
    <div v-for="(item, key) in filteredList(searchValue)" :key="key">
      <DetailTask :item="item" :id="item.id"/>
    </div>
  </div>
</template>