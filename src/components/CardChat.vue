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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const input = ref('')
const inputLength = computed(() => input.value.trim().length)
const users = ref([
	{
		name: 'Olivia Martin',
		email: 'm@example.com',
		avatar: '/avatars/01.png',
	},
	{
		name: 'Isabella Nguyen',
		email: 'isabella.nguyen@email.com',
		avatar: '/avatars/03.png',
	},
	{
		name: 'Emma Wilson',
		email: 'emma@example.com',
		avatar: '/avatars/05.png',
	},
	{
		name: 'Jackson Lee',
		email: 'lee@example.com',
		avatar: '/avatars/02.png',
	},
	{
		name: 'William Kim',
		email: 'will@email.com',
		avatar: '/avatars/04.png',
	},
])

type User = (typeof users.value)[number]

const messages = ref([
	{ role: 'agent', content: 'Здарова' },
	{ role: 'user', content: 'Привет' },
	{ role: 'agent', content: 'Получилось сделать разворачивание в таблице?' },
	{ role: 'user', content: 'ДА!' },
])

const open = ref(false)
const selectedUsers = ref<User[]>([])
</script>

<template>
	<Card>
		<CardContent class="p-2 pt-2 md:p-6 md:pt-6">
		<div class="space-y-4">
			<div
			v-for="(message, index) in messages"
			:key="index"
			:class="cn(
				'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
				message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted',
			)"
			>
			{{ message.content }}
			</div>
		</div>
		</CardContent>
		<CardFooter class="p-2 pt-2 md:p-6 md:pt-6">
		<form
			class="flex w-full items-center space-x-2"
			@submit.prevent="() => {
			if (inputLength === 0) return
			messages.push({
				role: 'user',
				content: input,
			}),
			input = ''
			}"
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
