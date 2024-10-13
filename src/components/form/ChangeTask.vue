<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import { FieldArray, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Check, ChevronsUpDown, Plus } from 'lucide-vue-next'
import { Cross1Icon } from '@radix-icons/vue'
import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { CalendarDate, DateFormatter, getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import RadixIconsCalendar from '@radix-icons/vue/CalendarIcon'

import { useListStore } from '@/store/ListsStore'
import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'

const globalStore = useGlobalStore()
const userStore = useUserStore()
const listStore = useListStore()

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'

const frameworks = [
{ value: 'zimin@mail.ru', label: 'Антон Зимин' },
{ value: 'levchenko@mail.ru', label: 'Михаил Левченко' },
{ value: 'moiseev@mail.ru', label: 'Сергей Моисеев' },
{ value: 'kurbatova@mail.ru', label: 'Настя Курбатова' },
]

const modelValue = ref<string[]>([])
const open = ref(false)
const searchTerm = ref('')
const openUserList = ref(false)

const filteredFrameworks = computed(() => frameworks.filter(i => !modelValue.value.includes(i.value)))


interface Responsible {
	avatar: string,
	email: string,
	name: string,
	password: string,
	role: string,
	surname: string,
}

interface Item {
	id: number,
	deadLine: any,
	title: string,
	type: string,
	description: string,
	status: string,
	priority: string,
	participant: {avatar: string, email: string, name: string, password: string, role: string, surname: string },
}

const props = defineProps<{
	item: Item
}>()



import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import {
	toDate
} from 'radix-vue/date'


const types = [
{ label: 'Высокий', value: 'high' },
{ label: 'Средний', value: 'medium' },
{ label: 'Низкий', value: 'low' },
]

const users = [
{ value: 'zimin@mail.ru', label: 'Антон Зимин' },
{ value: 'levchenko@mail.ru', label: 'Михаил Левченко' },
{ value: 'moiseev@mail.ru', label: 'Сергей Моисеев' },
{ value: 'kurbatova@mail.ru', label: 'Настя Курбатова' },
]

const dateValue = ref()
const placeholder = ref()
const openDate = ref(false)



const df = new DateFormatter('ru-RU', {
	dateStyle: 'long',
})



const createTaskFormSchema = toTypedSchema(z.object({
	title: z
	.string(
	{
		message: 'Обязательное поле',
	}
	)
	.min(2, {
		message: 'Минимум 2 символа',
	})
	.max(30, {
		message: 'Username must not be longer than 30 characters.',
	}),
	description: z.string({
		message: 'Обязательное поле',
	}).max(200, { message: 'Максимум 200 символов' }).min(4, { message: 'Минимум 2 символа.' }),
	deadLine: z.string().datetime().optional().refine(date => date !== undefined, 'Выберите дату.'),
	priority: z
	.string({
		required_error: 'Обязательное поле.',
	})
	.min(1, 'Необходимо выбрать тип.'),
	participant: z
	.string({
		required_error: 'Обязательное поле.',
	})
	.min(1, 'Необходимо исполнителя.'),
}))
const curUser = ref({ value: '', label: '' })

if (props.item.participant) {
	curUser.value.value = props.item.participant.email
	curUser.value.label = `${props.item.participant.name} ${props.item.participant.surname}`
}

const { handleSubmit, setFieldValue, resetForm } = useForm({
	validationSchema: createTaskFormSchema,
	initialValues: {
		title: props.item.title,
		description: props.item.description,
		deadLine: new Date(props.item.deadLine).toISOString(),
		priority: props.item.priority,
		participant: curUser.value.value,
	},
})



const emit = defineEmits(['close'])

const reset = () => {
	resetForm()
}
const onSubmit = handleSubmit((values) => {
	listStore.updateListItem(values, props.item.id);
	emit('close');
})
</script>

<template>
	<form class="space-y-8 mt-4" @submit="onSubmit">
		<FormField v-slot="{ componentField }" name="title">
			<FormItem>
				<FormLabel>Название</FormLabel>
				<FormControl>
					<Input type="text" placeholder="Новый лист" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>

		<FormField v-slot="{ componentField }" name="description">
			<FormItem>
				<FormLabel>Описание листа</FormLabel>
				<FormControl>
					<Textarea placeholder="Краткое (или нет) описание листа" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>

		<FormField v-slot="{ field, value }" name="deadLine">
			<FormItem class="flex flex-col">
				<FormLabel>Дата окончания</FormLabel>
				<Popover v-model:open="openDate">
					<PopoverTrigger as-child>
						<FormControl>
							<Button variant="outline" :class="cn(
							'w-[240px] justify-start text-left font-normal',
							!value && 'text-muted-foreground',
							)">
							<RadixIconsCalendar class="mr-2 h-4 w-4 opacity-50" />
							<span>{{ value ? new Date(props.item.deadLine).toLocaleDateString('ru-RU') : "Выберите день"
							}}</span>
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent class="p-0">
					<Calendar v-model:placeholder="placeholder" v-model="dateValue" calendar-label="День окончания" initial-focus
					:min-value="today(getLocalTimeZone())" @update:model-value="(v) => {
						if (v) {
							dateValue = v
							openDate = false
							setFieldValue('deadLine', toDate(v).toISOString())
						}
						else {
							dateValue = undefined
							setFieldValue('deadLine', undefined)
						}
					}" />
				</PopoverContent>
			</Popover>
			<FormDescription>
				День окончания всех внутренних задач
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

<FormField v-slot="{ field, value }" name="participant">
	<FormItem class="flex flex-col">
		<FormLabel>Исполнитель</FormLabel>

		<Popover v-model:open="openUserList">
			<PopoverTrigger as-child>
				<FormControl>
					<Button variant="outline" role="combobox" :aria-expanded="open" :class="cn(
					'w-[200px] justify-between',
					!value && 'text-muted-foreground',
					)">
					{{ value ? users.find(
						(type) => type.value === value,
						)?.label : 'Выберите исполнителя' }}

						<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent class="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandGroup>
							<CommandItem v-for="type in users" :key="type.value" :value="type.label"
							@select="() => {
								setFieldValue('participant', type.value)
								openUserList = false
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


<div class="flex gap-2 justify-start">
	<Button type="submit">
		Сохранить изменения
	</Button>

	<Button type="button" variant="outline" @click="reset">
		Сбросить значения
	</Button>
</div>
</form>
</template>