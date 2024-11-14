<script setup lang="ts">
import {ChevronDownIcon} from '@radix-icons/vue'
import {CircleIcon} from '@radix-icons/vue'
import { computed, ref } from 'vue'
import ChangeListForm from "@/components/form/ChangeListForm.vue"
import ListCard from '@/components/ListCard.vue'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { parse } from 'date-fns';
import {
  Button,
} from '@/components/ui/button'

import { useListStore } from '@/store/ListsStore'
import { useGlobalStore } from '@/store/GlobalStore'
const list = useListStore()
const globalStore = useGlobalStore()

interface Item {
  id: number,
  lastUpdate: any,
  title: string,
  type: string,
  description: string,
  status: string,
  isArchived: boolean,
  participants: [],
}

interface Props {
  items: Item[],
  sorted: string,
  style: string,
}
const props = defineProps<Props>()

const container = ref(null)

const currentPage = ref(1)

const itemsPerPage = ref(8)

const pageCount = computed(() =>
Math.ceil(props.items.length / itemsPerPage.value)
);

const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  const slicedItems = ref(props.items.slice(startIndex, endIndex));
  const sortedItems = ref(slicedItems.value.map(value => value));

  sortedItems.value.forEach(item => {
    item.lastUpdate = new Date(item.lastUpdate);
  })

  if (props.sorted === 'asc') {
    sortedItems.value.sort((a, b) => a.lastUpdate - b.lastUpdate)

    console.log();

  } else if (props.sorted === 'desc') {
    sortedItems.value.sort((a, b) => b.lastUpdate - a.lastUpdate)
  }

  return sortedItems.value
});

const deleteId = ref(0)

const confirmOpen = function (item, type) {
  deleteConfirm.value = true
  deleteId.value = item.id
}

const deleteConfirm = ref(false)
const backupConfirm = ref(false)

function changePage(pageNumber) {
  console.log(itemsPerPage.value);
  currentPage.value = pageNumber;
}
function copyItem(item) {
  const copiedList = Object.assign({}, list.getItemById(item.id));
  copiedList.title = `${copiedList.title} (копия)`

  list.copyList(copiedList)
}
let side = 'bottom';
if (window.innerWidth > 768) {
  side = 'right'
}
const isChangeOpen = ref(false)
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" :class="{'!grid-cols-1' : props.style === 'column'}">
    <div v-for="item in displayedItems" :key="item.id">
      <ListCard :item="item"/>
  </div>
</div>
<Pagination v-slot="{ page }" :total="props.items.length" :default-page="1" :sibling-count="1" show-edges :items-per-page="itemsPerPage">
  <PaginationList v-slot="{ items }" class="flex items-center gap-1">
    <PaginationFirst @click="changePage(1)"/>
    <PaginationPrev @click="changePage(currentPage - 1)"/>

    <template v-for="(item, index) in items">
      <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child @click="changePage(item.value)">
        <Button class="w-9 h-9 p-0" :variant="item.value === page ? 'default' : 'outline'">
          {{ item.value }}
        </Button>
      </PaginationListItem>
      <PaginationEllipsis v-else :key="item.type" :index="index" />
    </template>

    <PaginationNext @click="changePage(currentPage + 1)"/>
    <PaginationLast @click="changePage(pageCount)"/>
  </PaginationList>
</Pagination>
</template>
