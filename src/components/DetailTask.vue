<script setup lang="ts">
import { computed, onBeforeUpdate, onMounted, ref } from 'vue'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import CaretSortIcon from '@radix-icons/vue/CaretSortIcon'
import AvatarsGroup from "@/components/AvatarsGroup.vue"
import { CalendarIcon, ChatBubbleIcon } from '@radix-icons/vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'
import UploadFile from '@/components/UploadFile.vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMedia } from "@/lib/useMedia";
import CardChat from '@/components/CardChat.vue'
import TeamMembers from '@/components/TeamMembers.vue'



import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'
import { useListStore } from '@/store/ListsStore'
import { item } from '@unovis/ts/components/bullet-legend/style'
const userStore = useUserStore()
const globalStore = useGlobalStore()
const listStore = useListStore()

interface Responsible{
	avatar: string,
	email: string,
	name: string,
	password: string,
	role: string,
	surname: string,
}

interface Item {
  id?: number,
  title: string,
  description: string,
  status: string,
  label: string,
	priority: string,
	deadLine: string,
	images: object,
	isDone: boolean,
	responsible: Responsible,
	messages: [],
}

const props = defineProps<{
  item: Item,
  id?: number,
}>()

function getClass(property) {
  return {
    'bg-red-300 text-red-900': (property === 'high'),
    'bg-amber-200 text-yellow-700': (property === 'medium'),
    'bg-green-300 text-green-800': (property === 'low'),
  }
}
const avatars = ref(
	[
		{
			"name": "Михаил", "surname": "Левченко", "email": "levchenko@mail.ru", "password": "lev123", "avatar": "04.png"
		},
		{ "name": "Олег", "surname": "", "email": "oleg@mail.ru", "password": "ole123", "avatar": "04.png" }, { "name": "Сергей", "surname": "Моисеев", "email": "moiseev@mail.ru", "password": "moi123", "avatar": "03.png" }, { "name": "Настя", "surname": "Курбатова", "email": "kurbatova@mail.ru", "password": "kur123", "avatar": "01.png" }])

const open = ref(false)
const openChat = ref(false)
const openImages = ref(false)

const isMobile = useMedia("(max-width: 768px)")


function saveImages(images) {
	console.log('save');


	if (isMobile.value) {
		openImages.value = false
	}
	listStore.list.forEach((list) => {
		list.tasks.forEach(element => {
			if (element.id === props.item.id) {
				element.images = images.value
			}
		});
	});
}

const messagesLength = computed(() => {
	return props.item.messages.length || 0
})

const messages = computed(() => {
	return props.item.messages
})

function updateMessages(value) {
	listStore.updateMessage(props.item.id, value);


}

function getImageUrl(name) {
	return new URL(`../assets/avatars/${name}`, import.meta.url).href
}

const isChatOpen = ref(false)

function initialsPersonal(name, surname) {
	let firstLetter = name.slice(0, 1)
	let secondLetter = surname.slice(0, 1)
	return (`${firstLetter}${secondLetter}`)
}
// console.log(props.item);
</script>

<template>
	<div class="transition-all duration-300">
		<div class=" bg-primary-foreground p-4 rounded-sm relative flex-1 flex flex-col gap-4 ">
			<div class="flex justify-between items-center">
				<div class="p-1 rounded-md text-xs min-w-16 text-center font-semibold shadow-muted-foreground"
					:class="getClass(props.item.priority)">
					{{ props.item.priority }}
				</div>
				<!-- TODO после mvp нужно добавить действия с задачей -->
				<!-- <DataTableRowActions :row="item" /> -->
			</div>
			<div class="text-xl">
				{{ props.item.title }}
			</div>
			<div class="">
				{{ props.item.description }}
			</div>
			<div class="flex items-center gap-7 mt-auto flex-wrap ">
				<div class="flex items-center gap-2">
					<CalendarIcon />
					<span>{{ new Date(props.item.deadLine).toLocaleDateString('ru-RU') }}</span>
				</div>
				<Button variant="ghost" class="flex items-center gap-2" @click="isChatOpen = !isChatOpen">
					<ChatBubbleIcon />
					<span>{{ messagesLength }}</span>
				</Button>
				<UploadFile @submit="saveImages" :images="props.item.images" />
			</div>
			<div class="flex flex-col-reverse gap-4 md:gap-10 md:flex-row-reverse">
				<div class="flex-1 md:pl-10 md:border-l flex flex-col gap-4">
					<Collapsible :open="isChatOpen" >
						<CollapsibleContent class="-mr-4 -ml-4 -mb-4 md:mr-0 md:ml-0 md:-mb-0">
							<CardChat :open="isChatOpen" :messages="messages" @change-message="(message) => { updateMessages(message) }"
								class="" />
						</CollapsibleContent>
					</Collapsible>
				</div>
				<TeamMembers :person="props.item.responsible" :is-changeable="false"/>
			</div>
		</div>

	</div>
</template>
