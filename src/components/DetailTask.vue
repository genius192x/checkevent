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
  id: number,
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
  id: number,
  isCheckable: boolean
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

const isChangeable = ref(false)

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
	listStore.updateMessage(props.id, value)
	console.log('update message');
	console.log(messages.value);

}

function getImageUrl(name) {
	return new URL(`../assets/avatars/${name}`, import.meta.url).href
}

function initialsPersonal(name, surname) {
	let firstLetter = name.slice(0, 1)
	let secondLetter = surname.slice(0, 1)
	return (`${firstLetter}${secondLetter}`)
}
// console.log(props.item);
</script>

<template>
	<div class="transition-all duration-300" :class="{'translate-x-10 md:translate-y-5 md:translate-x-0': isCheckable}">
			<div class="cursor-pointer bg-primary-foreground p-4 rounded-sm relative flex-1 flex flex-col gap-4 ">
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
				<div class="flex items-center gap-7 mt-auto">
					<div class="flex items-center gap-2">
						<CalendarIcon />
						<span>{{ props.item.deadLine }}</span>
					</div>
					<div class="flex items-center gap-2">
						<ChatBubbleIcon />
						<span>{{ messagesLength }}</span>
					</div>
					<div class="block ml-auto">
						<Avatar class="h-8 w-8 border-2 border-background">
							<AvatarImage :src="getImageUrl(props.item.responsible.avatar)" :alt="initialsPersonal(props.item.responsible.name, props.item.responsible.surname)" />
							<AvatarFallback>{{ initialsPersonal(props.item.responsible.name, props.item.responsible.surname) }}</AvatarFallback>
						</Avatar>
					</div>
				</div>
        <div class="flex gap-10">
          <div class="flex-1 md:pr-10 md:border-r flex flex-col gap-4">
            <UploadFile @submit="saveImages" :images="props.item.images"/>
            <CardChat :messages="messages" @change-message="(message) => { updateMessages(message) }"/>
          </div>
          <TeamMembers :isChangeable="isCheckable" :person="props.item.responsible" />
        </div>
        <!-- <div class="align-top">
          <TeamMembers :isChangeable="isCheckable" :person="props.item.responsible" />
        </div>
        <div class="flex w-full justify-between gap-3">
          <Button @click="openChat = !openChat" class="bg-muted text-primary flex-1">
            Чат
          </Button>
          <Button @click="openImages = !openImages" class="bg-muted text-primary flex-1">
            Изображения
          </Button>
        </div> -->
        <!-- <div class="absolute top-0 w-full left-0  h-full bg-card  transition-all duration-300  flex flex-col" :class="{ 'left-full': !openChat }">
          <div class="px-6 pt-6 cursor-pointer" @click="openChat = !openChat">Назад</div>
          <CardChat :messages="messages" @change-message="(message) => { updateMessages(message) }" class=""/>
        </div> -->
        <!-- <Collapsible v-model:open="openChat">
          <CollapsibleContent>
            <CardChat :messages="messages" @change-message="(message)=>{ updateMessages(message) }"/>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible v-model:open="openImages">
          <CollapsibleContent>
            <UploadFile @submit="saveImages" :images="props.item.images"/>
          </CollapsibleContent>
        </Collapsible> -->
			</div>

	</div>
</template>
