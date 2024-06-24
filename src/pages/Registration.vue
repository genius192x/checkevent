<script setup lang="ts">
import { h, ref } from 'vue'
import * as z from 'zod'
import { useToast } from '@/components/ui/toast/use-toast'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserStore } from '@/store/UserStore'

const { toast } = useToast()
const userStore = useUserStore()
const userData = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
}
const accountFormSchema = toTypedSchema(z.object({
	'first-name': z
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
function onSubmit(data) {
	console.log('test');

	userStore.createUser(data)
	toast({
		description: 'Аккаунт успешно создан',
	});
}
</script>

<template>
	<div class="flex p-4 items-center justify-center">
		<Form :validation-schema="accountFormSchema" class="space-y-6 mt-3 flex flex-col"
			@submit="onSubmit">
			<Card class="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle class="text-xl">
						Регистрация
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="grid gap-4">
						<div class="grid grid-cols-2 gap-4">
							<FormField name="name">
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input type="text" placeholder="Иван"
											v-model="userData.firstName" />
									</FormControl>
								</FormItem>
							</FormField>
							<FormField name="name">
								<FormItem>
									<FormLabel>Фамилия</FormLabel>
									<FormControl>
										<Input type="text" placeholder="Иванов"
											v-model="userData.lastName" />
									</FormControl>
								</FormItem>
							</FormField>
						</div>
						<FormField name="name">
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="text"
										v-model="userData.email" />
								</FormControl>
							</FormItem>
						</FormField>
						<FormField name="name">
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input type="text"
										v-model="userData.password" />
								</FormControl>
							</FormItem>
						</FormField>
						<Button class="w-full" @click.prev="onSubmit(userData)">
							Создать аккаунт
						</Button>
					</div>
					<div class="mt-4 text-center text-sm">
						Уже есть аккаунт?
						<router-link to="/authorization" class="underline">Войти</router-link>
					</div>
				</CardContent>
			</Card>
		</Form>
	</div>
</template>