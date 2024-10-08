<script setup lang="ts">
import { h, ref } from 'vue'
import * as z from 'zod'
// import { useToast } from '@/components/ui/toast/use-toast'
import { ReloadIcon } from '@radix-icons/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	FormLabel,
} from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserStore } from '@/store/UserStore'
import { useGlobalStore } from '@/store/GlobalStore'
import router from '@/router'
import {
  toast
} from 'vue-sonner'


// const { toast } = useToast()
const userStore = useUserStore()
const globalStore = useGlobalStore()
const accountFormSchema = toTypedSchema(z.object({
	name: z
		.string(),
	surname: z
		.string(),
	email: z
		.string()
		.min(1, { message: "Обязательное поле." })
		.email("Неверный формат."),
	password: z
		.string({
			required_error: 'Обязательное поле.',
		})
		.trim()
		.min(5, { message: 'Необходимо минимум 5 символов' })
}))
function onSubmit(data) {
	userStore.createUser(data)
}
</script>

<template>
  <div class="flex p-4 items-center justify-center">
    <Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" class="space-y-6 mt-3 flex flex-col"
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
              <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Иван" v-bind="componentField" />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="surname">
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Иванов" v-bind="componentField" />
                  </FormControl>
                </FormItem>
              </FormField>
            </div>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Пароль" v-bind="componentField" />
                </FormControl>
              </FormItem>
              <FormMessage />
            </FormField>
            <Button class="w-full" type="submit" :disabled="userStore.isLoaded">
              <ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="userStore.isLoaded" />
              {{ userStore.isLoaded ? 'Создаем аккаунт' : 'Создать аккаунт' }}
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