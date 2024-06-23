<script setup lang="ts">
import {ChevronDownIcon} from '@radix-icons/vue'
import {CircleIcon} from '@radix-icons/vue'
import {ref} from 'vue'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useListStore } from '@/store/ListsStore'
const list = useListStore()
defineProps<{
	item: object

}>()
const container = ref(null)
</script>

<template>
	<Card @click="$router.push(`/list/${item.id}`)" class="cursor-pointer" >
		<CardHeader class="grid grid-cols-[minmax(0,1fr)_32px] items-start gap-4 space-y-0 p-4 md:p-6">
		<div class="space-y-1">
			<CardTitle>{{item.title}}
			</CardTitle>
			<CardDescription class="pt-2">
			{{item.description}}
			</CardDescription>
		</div>
		<div class=" rounded-md text-secondary-foreground" @click.stop ref="container">
			<DropdownMenu>
				<DropdownMenuTrigger as-child>
					<Button variant="secondary" class="px-2 shadow-none">
					<ChevronDownIcon class="h-5 w-5 text-secondary-foreground" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					:align-offset="-5"
					class="w-[200px]"
				>
					<DropdownMenuItem>
					Скопировать лист
					</DropdownMenuItem>
					<DropdownMenuItem>Редактировать лист</DropdownMenuItem>
					<DropdownMenuSeparator/>
					<DropdownMenuItem class="text-red-500" @click="list.deleteList(item.id)">Удалить лист
					<!-- <AlertDialog>
						<AlertDialogTrigger as-child>
							<span>Удалить лист</span>
						</AlertDialogTrigger>
						<AlertDialogPortal :to="container">
							<AlertDialogOverlay />
						</AlertDialogPortal>>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction>Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog> -->
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
		</CardHeader>
		<CardContent class="p-4 pt-0 md:p-6">
		<div class="flex space-x-4 text-sm text-muted-foreground flex-col md:flex-row">
			<div class="flex items-center">
			<CircleIcon class="mr-1 h-3 w-3 fill-sky-400 text-red-500" />
			{{item.type}}
			</div>
			<div class="mt-3 md:mt-0">Крайний срок {{item.lastApdate}}</div>
		</div>
		</CardContent>
	</Card>
</template>
