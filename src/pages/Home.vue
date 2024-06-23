<script setup lang="ts">
import {ref} from 'vue'
import DateRangePicker from '@/components/DateRangePicker.vue'
import CreateList from "@/components/form/CreateList.vue"
import { PlusIcon } from '@radix-icons/vue'
import ListCard from '@/components/ListCard.vue'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import {useListStore} from '@/store/ListsStore'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetHeader,
	SheetTitle,
	SheetDescription
} from '@/components/ui/sheet'
import { useGlobalStore } from '@/store/GlobalStore'
const globalStore = useGlobalStore()
const listStore = useListStore()

let side= 'bottom';
if (window.innerWidth > 768){
	side = 'right'
}
</script>

<template>
    <div class="flex-1 space-y-4 p-2 pt-6 md:p-8">
		<div class="flex justify-between space-y-3 flex-col md:flex-row md:items-center md:space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">
				Список мероприятий
			</h2>
			<div class="flex items-center flex-wrap">
        <DateRangePicker/>
        <Toaster />
			</div>
		</div>

		<Tabs default-value="active" class="space-y-3 md:space-y-4">
			<div class="flex justify-between">
				<TabsList class="overflow-auto">
				<TabsTrigger value="active">
					Активные
				</TabsTrigger>
				<TabsTrigger value="archive" >
					Архив
				</TabsTrigger>
				</TabsList>
				<Sheet :open="globalStore.isSheetOpen">
				<SheetTrigger>
					<Button @click="globalStore.isSheetOpen = true">
					<PlusIcon class="w-4 h-4 mr-2" /> Новый лист
					</Button>
				</SheetTrigger>
				<SheetContent :side=side class="w-[100%] max-h-[70%] rounded-t-xl md:w-[440px] sm:max-w-none md:max-h-none md:rounded-xl p-3 outline-0 md:m-3 h-auto">
					<SheetHeader>
					<SheetTitle>Создание нового листа</SheetTitle>
					</SheetHeader>
					<CreateList/>
				</SheetContent>
				</Sheet>

			</div>
			<TabsContent value="active" class="space-y-4">
			<div v-for="item in listStore.list" :key="item.id">
				<ListCard
					:item="item"
				/>
			</div>
			</TabsContent>
			<TabsContent value="archive" class="space-y-4">
		<div v-for="item in eventsExpired" :key="item.id">
		<ListCard
			:item="item"
		/>
		</div>
			</TabsContent>
		</Tabs>
	</div>
</template>