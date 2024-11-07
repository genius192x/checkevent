<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-icons/vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	FormLabel,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useUserStore } from '@/store/UserStore';
import { useGlobalStore } from '@/store/GlobalStore';
import router from '@/router';

import {
  toast
} from 'vue-sonner'


const userStore = useUserStore()
const globalStore = useGlobalStore()


const accountFormSchema = toTypedSchema(z.object({
	email: z
		.string()
		.min(1, { message: "Обязательное поле." })
		.email("Неверный формат."),
	password: z
		.string({
			required_error: 'Обязательное поле.',
		})
		.trim()
		.min(4, { message: 'Необходимо минимум 5 символов' })
}))
function onSubmit(data) {
	userStore.authorization(data.email, data.password)

}
</script>

<template>
	<div class="flex p-4 items-center justify-center">
		<Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" class="space-y-6 mt-3 flex flex-col"
			@submit="onSubmit">
			<Card class="w-full max-w-sm">
				<CardHeader>
					<CardTitle class="text-2xl">
						Авторизация
					</CardTitle>
					<CardDescription>
						Введите указаные при регистрации данные ниже
					</CardDescription>
				</CardHeader>
				<CardContent class="grid gap-4">
					<div class="grid gap-4">
						<FormField v-slot="{ componentField }" name="email">
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email"
										v-bind="componentField"/>
								</FormControl>
							</FormItem>
						</FormField>
						<FormField v-slot="{ componentField }" name="password">
							<FormItem>
								<FormLabel class="flex justify-between">Пароль
									<a href="#" class="ml-auto inline-block text-sm underline text-card-foreground">
										Забыли свой пароль?
									</a>
								</FormLabel>

								<FormControl>
									<Input type="password" placeholder=""
										v-bind="componentField"/>
								</FormControl>
							</FormItem>
						</FormField>
					</div>
					<Button class="w-full" type="submit" :disabled="userStore.isLoaded">
            <ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="userStore.isLoaded"/>
						{{ userStore.isLoaded ? 'Загружаю' : 'Войти' }}
					</Button>
					<div class="mt-4 text-center text-sm">
						Еще нет аккаунта?
						<router-link to="/registration" class="underline">Регистрация</router-link>
					</div>
				</CardContent>
			</Card>
		</Form>
	</div>
</template>