<script setup lang="ts">
import { Check, Plus, Send } from 'lucide-vue-next'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
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
const messages = computed(() => {
	return props.messages
})



function pushMessage() {
	if (inputLength.value === 0) {
		return
	} else {
		let newMessage = {}
		newMessage.userEmail = userStore.userData.email;
		newMessage.text= input.value;
		newMessage.time= formattedTime;
		newMessage.date= formattedDate;
		listStore.updateMessage(props.id, newMessage.value)
		console.log(newMessage);

		emit('changeMessage', newMessage)

		// scroll.value.scrollIntoView({ behavior: "smooth", block: "end" });
		input.value = ''
	}
}
</script>

<template>
	<Card class="border-none flex flex-col">
		<CardContent class="p-2 pt-2 md:p-6 md:pt-6 flex-1">
			<ScrollArea class="h-72 rounded-md border p-2  max-h-96" ref="scroll">
				<div class="space-y-4">
					<div
					v-for="(message, index) in messages"
					:key="index"
					:class="cn(
					'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
					message.userEmail === userStore.userData.email ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted',
					)"
					>
					<div class="max-w-full">
						{{ message.text }}
					</div>
					<div class="text-[10px]">{{ message.date }} {{ message.time }}</div>
				</div>
			</div>
		</ScrollArea>
	</CardContent>
	<CardFooter class="p-2 pt-1 md:p-6 md:pt-6 mt-auto">
		<form
		class="flex w-full items-center space-x-2"
		@submit.stop.prevent="pushMessage"
		>
		<Input v-model="input" placeholder="Сообщение" class="flex-1" />
		<Button class="p-2.5 flex items-center justify-center" :disabled="inputLength === 0">
			<Send class="w-4 h-4" />
			<span class="sr-only">Send</span>
		</Button>
	</form>
</CardFooter>
</Card>
</template>
