<script setup lang="ts">
import { h, ref } from 'vue'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Check, ChevronsUpDown, Plus } from 'lucide-vue-next'
import { CalendarDate, DateFormatter, getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import { cn } from '@/lib/utils'
import router from '@/router'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
import RadixIconsCalendar from '@radix-icons/vue/CalendarIcon'
import {
	toDate
} from 'radix-vue/date'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from '@/components/ui/calendar'


import {useListStore} from '@/store/ListsStore'
import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'


interface Props {
	listId?: string
}

const props = defineProps<Props>()

//Сторы
const globalStore = useGlobalStore()
const userStore = useUserStore()
const listStore = useListStore()

const open = ref(false)
const openDate = ref(false)
const dateValue = ref()
const placeholder = ref()
const value = ref('')

type User = (typeof users.value)[number]
const openUserSelect = ref(false)
const selectedUsers = ref<User[]>([])
const list = ref(listStore.list)


const currList = ref(listStore.getItemById(props.listId))

// console.log(currList.value);


const types = [
	{ label: 'Высокий', value: 'high' },
	{ label: 'Средний', value: 'medium' },
	{ label: 'Низкий', value: 'low' },
] as const

const df = new DateFormatter('ru-RU', {
	dateStyle: 'long',
})
const formResult = {
	id: currList.value.tasks.length + 1,
	title: '',
	status: 'todo',
	label: null,
	priority: '',
	description: '',
	deadLine: dateValue,
	participants: [],
	messages: [],
	responsible:{}
}
const accountFormSchema = toTypedSchema(z.object({
	name: z
		.string({
			required_error: 'Обязательное поле.',
		}),
	description: z
		.string({
			required_error: 'Обязательное поле.',
		}),
	date: z.string().datetime().optional().refine(date => date !== undefined, 'Выберите дату.'),
	priority: z
		.string({
			required_error: 'Обязательное поле.',
		})
		.min(1, 'Необходимо выбрать тип.'),
	responsible: z
		.string({
			required_error: 'Обязательное поле.',
		})
		.min(1, 'Необходимо выбрать тип.'),
}))

function getImageUrl(name) {
	return new URL(`../../assets/avatars/${name}`, import.meta.url).href
}


const url = window.location.href;
const lastParam = url.split("/").slice(-1)[0];

const options = {
	day: 'numeric',
	month: 'long',
};


function onSubmit(values) {
	listStore.addTask(formResult, lastParam)
//
	globalStore.isSheetOpen = false
	toast({
		description: "Лист успешно создан",
	});
}

</script>

<template>
	<Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" class="space-y-6 mt-3 flex flex-col max-h-[95%]"
		@submit="onSubmit">
		<div class="form__fields max-h-[350px] overflow-auto md:overflow-auto space-y-4 md:space-y-6 md:max-h-none">
			<FormField v-slot="{ componentField }" name="name">
				<FormItem>
					<FormLabel>Название задачи</FormLabel>
					<FormControl>
						<Input type="text" placeholder="Введите название" v-bind="componentField"
							v-model="formResult.title" />
					</FormControl>

					<FormDescription>
						Название будет отображаться в спике задач. По названию можно легко найти задачу в поиске
					</FormDescription>
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="description">
				<FormItem>
					<FormLabel>Описание задачи</FormLabel>
					<FormControl>
						<Textarea placeholder="Введите описание" v-bind="componentField"
							v-model="formResult.description" />
					</FormControl>

					<FormDescription>
						Описание будет распологаться под названием и должно содержать краткую информацию о листе
					</FormDescription>
				</FormItem>
			</FormField>
			<FormField v-slot="{ field, value }" name="date">
				<FormItem class="flex flex-col">
					<FormLabel>Дедлайн</FormLabel>
					<Popover v-model:open="openDate">
						<PopoverTrigger as-child>
							<FormControl>
								<Button variant="outline" :class="cn(
									'w-[240px] justify-start text-left font-normal',
									!value && 'text-muted-foreground',
								)">
									<RadixIconsCalendar class="mr-2 h-4 w-4 opacity-50" />
									<span>{{ value ? df.format(toDate(dateValue, getLocalTimeZone())) : "Выберите день"
										}}</span>
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent class="p-0">
							<Calendar v-model:placeholder="placeholder" v-model="dateValue"
								calendar-label="День окончания" initial-focus :min-value="today(getLocalTimeZone())"
								@update:model-value="(v) => {
									if (v) {
										dateValue = v
										openDate = false
										formResult.deadLine = toDate(v).toLocaleDateString('ru-RU', options)
										setFieldValue('date', toDate(v).toISOString())
									}
									else {
										dateValue = undefined
										setFieldValue('date', undefined)
									}
									}" />
						</PopoverContent>
					</Popover>
					<FormDescription>
						Дата, до которой должна быть выполнена задача
					</FormDescription>
				</FormItem>
				<input type="hidden" v-bind="field">
			</FormField>
			<FormField v-slot="{ value }" name="priority">
				<FormItem class="flex flex-col">
					<FormLabel>Приоритет задачи</FormLabel>

					<Popover v-model:open="open">
						<PopoverTrigger as-child>
							<FormControl>
								<Button variant="outline" role="combobox" :aria-expanded="open" :class="cn(
						'w-[200px] justify-between',
						!value && 'text-muted-foreground',
					)">
									{{ value ? types.find(
									(type) => type.value === value,
									)?.label : 'Выберите приоритет' }}

									<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent class="w-[200px] p-0">
							<Command>
								<CommandList>
									<CommandGroup>
										<CommandItem v-for="type in types" :key="type.value" :value="type.label"
											@select="() => {
												formResult.priority = type.value
												setFieldValue('priority', type.value)
												open = false
											}">
											<Check :class="cn(
												'mr-2 h-4 w-4',
												value === type.value ? 'opacity-100' : 'opacity-0',
												)" />
											{{ type.label }}
										</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>


					<FormDescription>

					</FormDescription>
				</FormItem>
			</FormField>
			<FormField  v-slot="{ field, value }" name="responsible">
				<FormItem class="flex flex-col">
					<FormLabel>Исполнитель</FormLabel>

						<Select v-bind="field"
						@update:model-value="(v) => {
							if (v) {
								console.log(v);
								formResult.responsible = globalStore.defaultUsers.find(person => person.email === v)
							}
						}">
							<SelectTrigger
							id="model"
							class="items-center [&_[data-description]]:hidden h-auto"
							>
								<SelectValue placeholder="Выберите исполнителя" class="flex items-center" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem v-for="person in globalStore.defaultUsers" :value=person.email>
									<div class="flex items-center gap-3 text-muted-foreground">
										<Avatar>
											<AvatarImage :src="getImageUrl(person.avatar)" alt="Image" />
											<AvatarFallback>{{ person.name[0] }}</AvatarFallback>
										</Avatar>
										<div class="grid gap-0.5">
											<p>
												{{ person.surname }}
												<span class="font-medium text-foreground">
													{{ person.name }}
												</span>
											</p>
											<p class="text-xs" data-description>
												{{ person.email }}
											</p>
										</div>
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
					<FormDescription>
						Выберите ответственного для задачи человека
					</FormDescription>
				</FormItem>
			</FormField>
		</div>
		<div class="flex justify-start gap-2 mt-auto">
			<Button type="submit" class="outline-0 flex-auto md:flex-none">
				Создать лист
			</Button>
			<!-- <Button class="bg-transparent text-primary border hover:bg-primary-foreground outline-0">
				Сбросить значение полей
			</Button> -->
		</div>
	</Form>
</template>
