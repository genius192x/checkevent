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
import AvatarsGroup from '@/components/AvatarsGroup.vue'
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
	<Card @click="$router.push(`/list/${item.id}`)" class="cursor-pointer h-full flex flex-col justify-between">
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
					<DropdownMenuContent align="end" :align-offset="-5" class="w-[200px]">
						<DropdownMenuItem>
							Скопировать лист
						</DropdownMenuItem>
						<DropdownMenuItem>Редактировать лист</DropdownMenuItem>
						<DropdownMenuSeparator />
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
			<div class="flex items-end gap-4 justify-between md:flex-row md:items-center">
				<div
					class="flex space-y-2 text-sm text-muted-foreground flex-col md:space-x-4 md:flex-wrap md:space-y-0 2xl:flex-row">
					<div class="flex items-center">
						<CircleIcon class="mr-1 h-3 w-3 fill-sky-400 text-red-500" />
						{{item.type}}
					</div>
					<div class=" md:mt-0">Крайний срок {{item.lastApdate}}</div>
				</div>
				<div class="block">
					{{ item.participants }}
					<AvatarsGroup :avatars="item.participants" />
				</div>
			</div>
		</CardContent>
	</Card>
</template>
