<script setup lang="ts">
import { h, ref } from 'vue'
import * as z from 'zod'
// import { toDate } from 'radix-vue/dist/date'
import { toTypedSchema } from '@vee-validate/zod'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { CalendarDate, DateFormatter, getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import { cn } from '@/lib/utils'

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
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {useListStore} from '@/store/ListsStore'
import { useGlobalStore } from '@/store/GlobalStore'
const globalStore = useGlobalStore()
const listStore = useListStore()
const open = ref(false)
const openDate = ref(false)
const dateValue = ref()
const placeholder = ref()

const list = ref(listStore.list)

const types = [
	{ label: 'Гандбол Мужской', value: 'Гандбол Мужской' },
	{ label: 'Гандбол Женский', value: 'Гандбол Женский' },
] as const

const df = new DateFormatter('ru-RU', {
	dateStyle: 'long',
})
const formResult = {
	title: '',
	id: `${list.value.length + 1}`,
	description: '',
	lastApdate: dateValue,
	type: null,
	tasks: []
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
	type: z
		.string({
			required_error: 'Обязательное поле.',
		})
		.min(1, 'Необходимо выбрать тип.'),
}))

function onSubmit(values: any) {
	listStore.addList(formResult)
	globalStore.isSheetOpen = false
	toast({
		description: 'Лист успешно создан',
	});
}
</script>

<template>
	<Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" class="space-y-6 mt-3 flex flex-col"
		@submit="onSubmit">
		<div class="form__fields max-h-[350px] overflow-y-auto overflow-x-visible space-y-4 md:space-y-6 md:max-h-none">
			<FormField v-slot="{ componentField }" name="name">
				<FormItem>
					<FormLabel>Название листа</FormLabel>
					<FormControl>
						<Input type="text" placeholder="Введите название" v-bind="componentField"
							v-model="formResult.title" />
					</FormControl>

					<FormDescription>
						Название будет отображаться в спике листов жирным шрифтом
					</FormDescription>
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="description">
				<FormItem>
					<FormLabel>Описание листа</FormLabel>
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
					<FormLabel>Дата окончания</FormLabel>
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
						formResult.lastApdate = toDate(v).toLocaleDateString()
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
						Your date of birth is used to calculate your age.
					</FormDescription>
				</FormItem>
				<input type="hidden" v-bind="field">
			</FormField>
			<FormField v-slot="{ value }" name="type">
				<FormItem class="flex flex-col">
					<FormLabel>Тип мероприятия</FormLabel>

					<Popover v-model:open="open">
						<PopoverTrigger as-child>
							<FormControl>
								<Button variant="outline" role="combobox" :aria-expanded="open" :class="cn(
						'w-[200px] justify-between',
						!value && 'text-muted-foreground',
					)">
									{{ value ? types.find(
									(type) => type.value === value,
									)?.label : 'Выберите тип...' }}

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
												formResult.type = type.value
												setFieldValue('type', type.value)
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
						Тип будет отображаться под описанием лита для удобства
					</FormDescription>
				</FormItem>
			</FormField>
		</div>
		<div class="flex justify-start gap-2 mt-auto">
			<Button type="submit" class="outline-0 flex-auto md:flex-none">
				Создать лист
			</Button>
			<Button class="bg-transparent text-primary border hover:bg-primary-foreground outline-0">
				Сбросить значение полей
			</Button>
		</div>
	</Form>
</template>
