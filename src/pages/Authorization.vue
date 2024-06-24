<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
	<div class="flex p-4 items-center justify-center">
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
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
							<a href="#" class="ml-auto inline-block text-sm underline">
								Забыли свой пароль?
							</a>
						</div>
						<Input id="password" type="password" required />
					</div>
				</div>
				<Button class="w-full">
					Войти
				</Button>
				<div class="mt-4 text-center text-sm">
					Еще нет аккаунта?
					<router-link to="/registration" class="underline">Регистрация</router-link>
				</div>
			</CardContent>

		</Card>
	</div>
</template>