<script setup lang="ts">
import { computed, ref } from 'vue'
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

const messages = computed(() => {
	return props.item.messages.length || 0
})

function updateMessages(value) {
	console.log(value);

}

function getImageUrl(name) {
	return new URL(`../assets/avatars/${name}`, import.meta.url).href
}
function initialsPersonal(name, surname) {
	let firstLetter = name.slice(0, 1)
	let secondLetter = surname.slice(0, 1)
	return (`${firstLetter}${secondLetter}`)
}
console.log(props.item);

</script>

<template>
	<div class="transition-all duration-300" :class="{'translate-x-10 md:translate-y-5 md:translate-x-0': isCheckable}">
		<Checkbox class="absolute top-1/2 left-2 transition-all md:left-0 md:top-1"
			:class="{'-left-8 md:-left-0 md:-top-5' : isCheckable}" :id="`${props.item.id}`" />
		<Sheet v-if="!isMobile" v-model:open="open">
			<div class="cursor-pointer bg-primary-foreground p-4 rounded-sm relative h-full flex flex-col gap-4">
				<div class="flex justify-between items-center">
					<div class="p-1 rounded-md text-xs min-w-16 text-center font-semibold shadow-muted-foreground"
						:class="getClass(props.item.priority)">
						{{ props.item.priority }}
					</div>
					<!-- TODO после mvp нужно добавить действия с задачей -->
					<!-- <DataTableRowActions :row="item" /> -->
				</div>
				<div class="text-xl" :class="{'line-through':props.item.isDone}">
					{{ props.item.title }}
				</div>
				<div class="flex items-center gap-7 mt-auto">
					<div class="flex items-center gap-2">
						<CalendarIcon />
						<span>{{ props.item.deadLine }}</span>
					</div>
					<div class="flex items-center gap-2">
						<ChatBubbleIcon />
						<span>{{ messages }}</span>
					</div>
					<div class="block ml-auto">
						<Avatar class="h-8 w-8 border-2 border-background">
							<AvatarImage :src="getImageUrl(props.item.responsible.avatar)" :alt="initialsPersonal(props.item.responsible.name, props.item.responsible.surname)" />
							<AvatarFallback>{{ initialsPersonal(props.item.responsible.name, props.item.responsible.surname) }}</AvatarFallback>
						</Avatar>
					</div>
				</div>
				<SheetTrigger class="absolute w-full h-full top-0 left-0" />
				<SheetContent
					class="w-[100%] p-0 pb-4 rounded-t-xl md:w-[540px] sm:max-w-none md:max-h-none md:rounded-xl md:p-6 outline-0 md:m-3 h-auto">
					<div class="flex justify-between pr-10">
						<div class="p-1 rounded-md text-xs min-w-16 text-center font-semibold shadow-muted-foreground"
							:class="getClass(props.item.priority)">
							{{ props.item.priority }}
						</div>
						<div class="flex items-center gap-7 mt-auto">
							<div class="flex items-center gap-2">
								<CalendarIcon />
								<span>{{ props.item.deadLine }}</span>
							</div>
							<div class="flex items-center gap-2">
								<ChatBubbleIcon />
								<span>{{ messages }}</span>
							</div>
						</div>
					</div>
					<SheetHeader class="mt-6">
						<SheetTitle> {{ props.item.title }}</SheetTitle>
						<SheetDescription>{{ props.item.description }}</SheetDescription>
					</SheetHeader>
					<div class="align-top">
						<TeamMembers :isChangeable="isCheckable" :person="props.item.responsible" />
					</div>
					<div class="flex w-full justify-between gap-3">
						<Button @click="openChat = !openChat" class="bg-muted text-primary flex-1">
							Чат
						</Button>
						<Button @click="openImages = !openImages" class="bg-muted text-primary flex-1">
							Картинки
						</Button>
					</div>
					<Collapsible v-model:open="openChat">
						<CollapsibleContent>
							<CardChat :messages="props.item.messages" @change-message="(value)=>{ updateMessages(value) }"/>
						</CollapsibleContent>
					</Collapsible>
					<Collapsible v-model:open="openImages">
						<CollapsibleContent>
							<UploadFile @submit="saveImages" :images="props.item.images"/>
						</CollapsibleContent>
					</Collapsible>
				</SheetContent>
			</div>
		</Sheet>
		<Drawer v-else v-model:open="open">
			<DrawerTrigger as-child>
				<div class="cursor-pointer bg-primary-foreground p-4 rounded-sm relative h-full flex flex-col gap-4">
					<div class="flex justify-between items-center">
						<div class="p-1 rounded-md text-xs min-w-16 text-center font-semibold shadow-muted-foreground"
							:class="getClass(props.item.priority)">
							{{ props.item.priority }}
						</div>
						<!-- TODO после mvp нужно добавить действия с задачей -->
						<!-- <DataTableRowActions :row="item" /> -->
					</div>
					<div class="text-xl" :class="{ 'line-through': props.item.isDone }">
						{{ props.item.title }}
					</div>
					<div class="flex items-center gap-7 mt-auto">
						<div class="flex items-center gap-2">
							<CalendarIcon />
							<span>{{ props.item.deadLine }}</span>
						</div>
						<div class="flex items-center gap-2">
							<ChatBubbleIcon />
							<span>{{ messages }}</span>
						</div>
						<div class="block ml-auto">
							<Avatar class="h-8 w-8 border-2 border-background">
								<AvatarImage :src="getImageUrl(props.item.responsible.avatar)" :alt="initialsPersonal(props.item.responsible.name, props.item.responsible.surname)" />
								<AvatarFallback>{{ initialsPersonal(props.item.responsible.name, props.item.responsible.surname) }}</AvatarFallback>
							</Avatar>
						</div>
					</div>
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader class="text-left space-y-4">
					<div class="flex justify-between">
						<div class="p-1 rounded-md text-xs min-w-16 text-center text-white font-semibold shadow-muted-foreground"
							:class="getClass(props.item.priority)">
							{{ props.item.priority }}
						</div>
						<div class="flex items-center gap-7 mt-auto">
							<div class="flex items-center gap-2">
								<CalendarIcon />
								<span>{{ props.item.deadLine }}</span>
							</div>
							<div class="flex items-center gap-2">
								<ChatBubbleIcon />
								<span>{{ messages }}</span>
							</div>
						</div>
					</div>
					<DrawerTitle> {{ props.item.title }}</DrawerTitle>
					<DrawerDescription>
						{{ props.item.description }}
					</DrawerDescription>
				</DrawerHeader>
				<div class="align-top p-2 md:p-4">
					<TeamMembers :isChangeable="isCheckable" />
				</div>

				<div class="flex w-full justify-between px-4 gap-3">
					<Button @click="openChat = true" class="bg-muted text-primary flex-1">
						Чат
					</Button>
					<Button @click="openImages = true" class="bg-muted text-primary flex-1">
						Картинки
					</Button>
				</div>
				<Drawer v-model:open="openChat">
					<DrawerContent>
						<div class="max-w-full flex-1 p-2 md:p-4">
							<CardChat :messages="props.item.messages" @change-message="(value) => {updateMessages(value.value);}"/>
						</div>
						<DrawerFooter class="pt-2">
							<DrawerClose as-child>
								<Button variant="outline" @click="openChat = false">
									Закрыть
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
				<Drawer v-model:open="openImages">
					<DrawerContent>
						<div class="px-4 pb-3">
							<UploadFile @submit="saveImages" />
						</div>
						<DrawerFooter class="pt-2">
							<DrawerClose as-child>
								<Button variant="outline" @click="openImages = false">
									Закрыть
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
				<DrawerFooter class="pt-2">
					<DrawerClose as-child>
						<Button variant="outline">
							Изменить
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	</div>
</template>
