<script setup lang="ts">
import { h, ref } from 'vue'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { cn } from '@/lib/utils'

import RadixIconsCalendar from '@radix-icons/vue/CalendarIcon'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
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
import { useToast } from '@/components/ui/toast/use-toast'

import {useListStore} from '@/store/ListsStore'
const { toast } = useToast()
const open = ref(false)
const dateValue = ref()
const placeholder = ref()

const languages = [
	{ label: 'English', value: 'en' },
	{ label: 'French', value: 'fr' },
	{ label: 'German', value: 'de' },
	{ label: 'Spanish', value: 'es' },
	{ label: 'Portuguese', value: 'pt' },
	{ label: 'Russian', value: 'ru' },
	{ label: 'Japanese', value: 'ja' },
	{ label: 'Korean', value: 'ko' },
	{ label: 'Chinese', value: 'zh' },
] as const

const df = new DateFormatter('en-US', {
	dateStyle: 'long',
})

const accountFormSchema = toTypedSchema(z.object({
	name: z
		.string({
		required_error: 'Required.',
		})
		.min(2, {
		message: 'Name must be at least 2 characters.',
		})
		.max(30, {
		message: 'Name must not be longer than 30 characters.',
		}),
	dob: z.string().datetime().optional().refine(date => date !== undefined, 'Please select a valid date.'),
	language: z.string().min(1, 'Please select a language.'),
}))

// https://github.com/logaretm/vee-validate/issues/3521
// https://github.com/logaretm/vee-validate/discussions/3571
async function onSubmit(values: any) {
	console.log('awdw');
	toast({
		title: 'You submitted the following values:',
		description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
	})
}
</script>

<template>
	<div>
		<h3 class="text-lg font-medium">
		Аккаунт
		</h3>
		<p class="text-sm text-muted-foreground">
		Обновите настройки своей учетной записи. Установите предпочитаемый язык.
		</p>
	</div>
	<Separator />
	<Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" class="space-y-8" @submit="onSubmit">
		<FormField v-slot="{ componentField }" name="name">
		<FormItem>
			<FormLabel>Имя</FormLabel>
			<FormControl>
			<Input type="text" placeholder="Ваше имя" v-bind="componentField" />
			</FormControl>
			<FormDescription>
			Оно будет отображаться в приложении и в email письмах (уведомлениях)
			</FormDescription>
			<FormMessage />
		</FormItem>
		</FormField>

		<div class="flex justify-start">
		<Button type="submit">
			Update account
		</Button>
		</div>
	</Form>
</template>
