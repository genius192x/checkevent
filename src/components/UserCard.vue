<script setup lang="ts">
import { ChevronDownIcon } from '@radix-icons/vue'
import { CircleIcon } from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from '@/components/ui/dialog'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useListStore } from '@/store/ListsStore'
import { Switch } from '@/components/ui/switch'
const list = useListStore()
defineProps<{
	item: object
}>()
function getImageUrl(name) {
	return new URL(`../assets/avatars/${name}`, import.meta.url).href
}
</script>

<template>
	<Card class="h-full flex flex-col justify-between">
		<CardHeader class="flex-row items-start gap-4 space-y-0 p-4 md:p-4">
			<Avatar class="h-8 w-8">
				<AvatarImage :src="getImageUrl(item.avatar)" alt="АЗ" />
				<AvatarFallback>АЗ</AvatarFallback>
			</Avatar>
			<div class="space-y-1">
				<CardTitle>{{ item.name }}
				</CardTitle>
				<CardDescription class="pt-2">
					{{ item.surname }}
				</CardDescription>
			</div>
			<div class=" rounded-md text-secondary-foreground ml-auto" @click.stop>
				<Popover>
					<PopoverTrigger as-child>
						<Button variant="outline" class="ml-auto">
						{{ item.role }}
						<ChevronDownIcon class="ml-2 h-4 w-4 text-muted-foreground" />
						</Button>
					</PopoverTrigger>
					<PopoverContent class="p-0" align="end">
						<Command v-model="item.role">
							<CommandList>
								<CommandEmpty>No roles found.</CommandEmpty>
								<CommandGroup>
									<CommandItem value="Viewer" class="teamaspace-y-1 flex flex-col items-start px-4 py-2">
										<p>Наблюдатель</p>
										<p class="text-sm text-muted-foreground">
										Может наблюдать.
										</p>
									</CommandItem>
									<CommandItem value="Developer" class="teamaspace-y-1 flex flex-col items-start px-4 py-2">
										<p>Исполнитель</p>
										<p class="text-sm text-muted-foreground">
											Выпоняет задачи.
										</p>
									</CommandItem>
									<CommandItem value="Owner" class="teamaspace-y-1 flex flex-col items-start px-4 py-2">
										<p>Создатель</p>
										<p class="text-sm text-muted-foreground">
											Может делать все, что связано с листом задач.
										</p>
									</CommandItem>

									<Dialog>
										<DialogTrigger as-child>
											<CommandItem value="custom" class="teamaspace-y-1 flex flex-col items-start px-4 py-2">
												<p>Особенные права</p>
											</CommandItem>
										</DialogTrigger>
										<DialogContent class="lg:max-w-[900px] xl:max-w-[1100px]">
										<DialogHeader>
											<DialogTitle>Права</DialogTitle>
											<DialogDescription>
												Можете задать те права, которые нужны этому пользователю
											</DialogDescription>
										</DialogHeader>
										<div class="grid max-h-96 overflow-auto gap-1 lg:grid-cols-2 lg:gap-x-8 lg:max-h-none lg:overflow-hidden ">
											<div class="grid gap-4 py-4">
												<div class="flex items-center justify-between space-x-2">
													<Label for="deactivate" class="flex flex-col space-y-1 cursor-pointer">
													<span>Деактивация пользователей</span>
													<span class="font-normal leading-snug text-muted-foreground">
														Пользователь может ограничивать возможность использовать приложение другим пользователям
													</span>
													</Label>
													<Switch id="deactivate" />
												</div>
											</div>
											<div class="grid gap-4 py-4">
												<div class="flex items-center justify-between space-x-2">
													<Label for="checklistCreate" class="flex flex-col space-y-1 cursor-pointer">
													<span>Создание чек-листа</span>
													<span class="font-normal leading-snug text-muted-foreground">
														Пользователь может создавать новые чек-листы
													</span>
													</Label>
													<Switch id="checklistCreate" />
												</div>
											</div>
											<div class="grid gap-4 py-4">
												<div class="flex items-center justify-between space-x-2">
													<Label for="checklistView" class="flex flex-col space-y-1 cursor-pointer">
													<span>Просмотр чек-листов</span>
													<span class="font-normal leading-snug text-muted-foreground">
														Пользователь имеет доступ к просмотру любого чек-листа
													</span>
													</Label>
													<Switch id="checklistView" />
												</div>
											</div>
											<div class="grid gap-4 py-4">
												<div class="flex items-center justify-between space-x-2">
													<Label for="taskEdit" class="flex flex-col space-y-1 cursor-pointer">
													<span>Редактирование задачи</span>
													<span class="font-normal leading-snug text-muted-foreground">
														Пользователь может редактировать любую задачу
													</span>
													</Label>
													<Switch id="taskEdit" />
												</div>
											</div>
											<div class="grid gap-4 py-4">
												<div class="flex items-center justify-between space-x-2">
													<Label for="taskCreate" class="flex flex-col space-y-1 cursor-pointer">
													<span>Создание задачи</span>
													<span class="font-normal leading-snug text-muted-foreground">
														Пользователь может создавать новые задачи в люом чек-листе
													</span>
													</Label>
													<Switch id="taskCreate" />
												</div>
											</div>
											<div class="grid gap-4 py-4">
												<div class="flex items-center justify-between space-x-2">
													<Label for="taskDelete" class="flex flex-col space-y-1 cursor-pointer">
													<span>Удаление задачи</span>
													<span class="font-normal leading-snug text-muted-foreground">
														Пользователь может удалять задачи в любом чек-листе
													</span>
													</Label>
													<Switch id="taskDelete" />
												</div>
											</div>
											<div class="grid gap-4 py-4">
												<div class="flex items-center justify-between space-x-2">
													<Label for="addComment" class="flex flex-col space-y-1 cursor-pointer">
														<span>Комментировать задачи</span>
														<span class="font-normal leading-snug text-muted-foreground">
															Пользователь добавлять свои комментарии к задачам
														</span>
													</Label>
													<Switch id="addComment" />
												</div>
											</div>
											<div class="grid gap-4 py-4">
												<div class="flex items-center justify-between space-x-2">
													<Label for="deleteComment" class="flex flex-col space-y-1 cursor-pointer">
														<span>Удалять комментарии</span>
														<span class="font-normal leading-snug text-muted-foreground">
															Пользователь удалять сови комментарии, оставленные в чате задачи
														</span>
													</Label>
													<Switch id="deleteComment" />
												</div>
											</div>
											<div class="grid gap-4 py-4">
												<div class="flex items-center justify-between space-x-2">
													<Label for="xls" class="flex flex-col space-y-1 cursor-pointer">
														<span>Импорт/Экспорт XLS</span>
														<span class="font-normal leading-snug text-muted-foreground">
															Пользователь испортировать/экспортировать xls файлы
														</span>
													</Label>
													<Switch id="xls" />
												</div>
											</div>
										</div>
										<DialogFooter>
											<DialogClose as-child>
												<Button type="button" variant="secondary">
													Сохранить настройки
												</Button>
											</DialogClose>
										</DialogFooter>
										</DialogContent>
									</Dialog>

								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
		</CardHeader>
		<CardContent class="p-4 pt-0 md:p-4">
			<div class="flex items-end gap-4 justify-between md:flex-row md:items-center">
				<div
					class="flex space-y-2 text-sm text-muted-foreground flex-col md:space-x-4 md:flex-wrap md:space-y-0 2xl:flex-row">
					<div class="flex items-center">
						<CircleIcon class="mr-1 h-3 w-3 fill-sky-400 text-red-500" />
						{{ item.email }}
					</div>
					<div class=" md:mt-0">Зарегистрирован - {{ item.lastApdate }}</div>
				</div>
			</div>
		</CardContent>
	</Card>
</template>
