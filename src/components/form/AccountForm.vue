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

import { useListStore } from '@/store/ListsStore'
import { useUserStore } from '@/store/UserStore'
const userStore = useUserStore()
const { toast } = useToast()
const open = ref(false)
const name = ref('')
console.log(userStore.userData.name);

name.value = userStore.userData.name
const placeholder = ref()

const df = new DateFormatter('en-US', {
	dateStyle: 'long',
})

const accountFormSchema = toTypedSchema(z.object({
	name: z
		.string({
			required_error: 'обязательное поле',
		})
		.min(2, {
			message: 'имя должно содержать минимум 2 символа',
		}),
}))

// https://github.com/logaretm/vee-validate/issues/3521
// https://github.com/logaretm/vee-validate/discussions/3571
async function onSubmit(values: any) {
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
		<FormField  name="name">
			<FormItem>
				<FormLabel>Имя</FormLabel>
					<FormControl>
						<Input type="text" placeholder="Ваше имя"  v-model="name" disabled/>
					</FormControl>
					<FormDescription>
					Оно будет отображаться в приложении и в email письмах (уведомлениях)
					</FormDescription>
				<FormMessage />
			</FormItem>
		</FormField>

		<div class="flex justify-start">
		<Button type="submit" disabled>
			Update account
		</Button>
		</div>
	</Form>
</template>
