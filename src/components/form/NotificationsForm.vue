<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
// import { toast } from '@/components/ui/toast'
import {
  toast
} from 'vue-sonner'


const notificationsFormSchema = toTypedSchema(z.object({
	type: z.enum(['all', 'mentions', 'none'], {
		required_error: 'You need to select a notification type.',
	}),
	mobile: z.boolean().default(false).optional(),
	communication_emails: z.boolean().default(false).optional(),
	social_emails: z.boolean().default(false).optional(),
	marketing_emails: z.boolean().default(false).optional(),
	security_emails: z.boolean(),
}))

const { handleSubmit } = useForm({
	validationSchema: notificationsFormSchema,
	initialValues: {
		communication_emails: false,
		marketing_emails: false,
		social_emails: true,
		security_emails: true,
	},
})

const onSubmit = handleSubmit((values, { resetForm }) => {
	toast({
		title: 'You submitted the following values:',
		description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
	})
})
</script>

<template>
	<div>
		<h3 class="text-lg font-medium">
			Уведомления
		</h3>
		<p class="text-sm text-muted-foreground">
			Вы можете настроить/ограничить получение уведомлений от приложения
		</p>
	</div>
	<Separator />
	<form class="space-y-8" @submit="onSubmit">
		<FormField v-slot="{ componentField }" type="radio" name="type">
		<FormItem class="space-y-3">
			<FormLabel>Получать уведомления...</FormLabel>
			<FormControl>
				<RadioGroup
					class="flex flex-col space-y-1"
					v-bind="componentField"
				>
					<FormItem class="flex items-center space-x-3 space-y-0">
						<FormControl>
							<RadioGroupItem value="all" />
						</FormControl>
						<FormLabel class="font-normal">
							о всем, что происходит
						</FormLabel>
					</FormItem>
					<FormItem class="flex items-center space-x-3 space-y-0">
						<FormControl>
							<RadioGroupItem value="mentions" />
						</FormControl>
						<FormLabel class="font-normal">
							о сообщениях которые адресованы только мне
						</FormLabel>
					</FormItem>
					<FormItem class="flex items-center space-x-3 space-y-0">
						<FormControl>
							<RadioGroupItem value="none" />
						</FormControl>
						<FormLabel class="font-normal">
							ни о чем
						</FormLabel>
					</FormItem>
				</RadioGroup>
			</FormControl>
			<FormMessage />
		</FormItem>
		</FormField>

		<div>
			<h3 class="mb-4 text-lg font-medium">
				Email уведомления
			</h3>
			<div class="space-y-4">
				<FormField v-slot="{ handleChange, value }" type="checkbox" name="communication_emails">
					<FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
						<div class="space-y-0.5">
							<FormLabel class="text-base">
								Письма на почту о активности
							</FormLabel>
							<FormDescription>
								Письмо будет приходить как реакция на любое взаимодействие с листом/задачей
							</FormDescription>
						</div>
						<FormControl>
							<Switch
								:checked="value"
								@update:checked="handleChange"
							/>
						</FormControl>
					</FormItem>
				</FormField>

				<FormField v-slot="{ handleChange, value }" type="checkbox" name="marketing_emails">
					<FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
						<div class="space-y-0.5">
							<FormLabel class="text-base">
								Письма о новых функциях
							</FormLabel>
							<FormDescription>
								Приложение постоянно развивается и добавляется новый функционал, что бы не пропустить новые функции, мы о них расскажем в письме.
							</FormDescription>
						</div>
						<FormControl>
							<Switch
								:checked="value"
								@update:checked="handleChange"
							/>
						</FormControl>
					</FormItem>
				</FormField>
			</div>
		</div>

		<FormField v-slot="{ handleChange, value }" type="checkbox" name="mobile">
			<FormItem class="flex flex-row items-start space-x-3 space-y-0">
				<FormControl>
					<Checkbox
						:checked="value"
						@update:checked="handleChange"
					/>
				</FormControl>
				<div class="space-y-1 leading-none">
					<FormLabel>
						Использовать инные настройки уведомлений для мобильной версии приложения
					</FormLabel>
					<FormDescription>
						Вы можете изменить настройки уведомлений для мобильной версии на
						<a href="/examples/forms">
							странице уведомлений для мобильной
						</a> версии.
					</FormDescription>
				</div>
			</FormItem>
		</FormField>

		<div class="flex justify-start">
		<Button type="submit">
			Обновить информацию
		</Button>
		</div>
	</form>
</template>
