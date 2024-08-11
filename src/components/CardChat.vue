<script setup lang="ts">
import { Check, Plus, Send } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

import { useDateFormat, useNow, useTimeAgo, formatTimeAgo   } from '@vueuse/core'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'
import { useListStore } from '@/store/ListsStore'
import { ScrollArea } from '@/components/ui/scroll-area'
const userStore = useUserStore()
const globalStore = useGlobalStore()
const listStore = useListStore()

const emit = defineEmits(['changeMessage'])

interface Message {
	text: string,
	userEmail: string,
	date: string,
	time: string,
	isReaded: boolean
}

const props = defineProps<{
	messages: Message[],
}>()

const input = ref('')
const inputLength = computed(() => input.value.trim().length)

const formattedDate = useDateFormat(useNow(), 'DD.MM.YYYY', { locales: 'ru-RU' })
const formattedTime = useDateFormat(useNow(), 'HH:mm', { locales: 'ru-RU' })

const open = ref(false)

// const messages = ref(props.messages)
// console.log(messages.value);
const messages = ref([...props.messages])

function pushMessage() {
	if (inputLength === 0) {
		return
	} else {
		const newMessage = ref({})
		newMessage.value.userEmail = userStore.userData.email;
		newMessage.value.text= input.value;
		newMessage.value.time= formattedTime;
		newMessage.value.date= formattedDate;
		listStore.updateMessage(4231, newMessage.value)
		// emit('changeMessage', messages)
		input.value = ''
	}
}
</script>

<template>
	<Card class="border-none">
		<CardContent class="p-2 pt-2 md:p-6 md:pt-6">
			<ScrollArea class="h-72 rounded-md border p-2">
				<div class="space-y-4">
					<div
					v-for="(message, index) in messages"
					:key="index"
					:class="cn(
						'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
						message.userEmail === userStore.userData.email ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted',
					)"
					>
					{{ message.text }}
					<div class="text-[10px]">{{ message.date }} {{ message.time }}</div>
					</div>
				</div>
			</ScrollArea>
		</CardContent>
		<CardFooter class="p-2 pt-2 md:p-6 md:pt-6">
		<form
			class="flex w-full items-center space-x-2"
			@submit.prevent="pushMessage"
		>
			<Input v-model="input" placeholder="Type a message..." class="flex-1" />
			<Button class="p-2.5 flex items-center justify-center" :disabled="inputLength === 0">
			<Send class="w-4 h-4" />
			<span class="sr-only">Send</span>
			</Button>
		</form>
		</CardFooter>
	</Card>
</template>
