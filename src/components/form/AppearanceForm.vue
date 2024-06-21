<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/toast'
import { useColorMode } from '@vueuse/core'
const mode = useColorMode()

const themeValue = localStorage.getItem('vueuse-color-scheme')
const { handleSubmit } = useForm({
  initialValues: {
    theme: themeValue,
  },
})

</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Внешний вид приложения
    </h3>
    <p class="text-sm text-muted-foreground">
      Настройте внешний вид приложения. Автоматическое переключение между дневной и ночной темами.
    </p>
  </div>
  <Separator />
  <form class="space-y-8">

    <FormField v-slot="{ componentField }" type="radio" name="theme">
      <FormItem class="space-y-1">
        <FormLabel>Тема</FormLabel>
        <FormDescription>
          Выберите цветовую тему для приложения
        </FormDescription>
        <FormMessage />

        <RadioGroup
          class="grid max-w-md grid-cols-2 gap-8 pt-2"
          v-bind="componentField"
        >
          <FormItem @click="mode = 'light'">
            <FormLabel class="[&:has([data-state=checked])>div]:border-primary">
              <FormControl>
                <RadioGroupItem value="light" class="sr-only" />
              </FormControl>
              <div class="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div class="h-2 w-20 rounded-lg bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span class="block w-full p-2 text-center font-normal">
                Light
              </span>
            </FormLabel>
          </FormItem>
          <FormItem @click="mode = 'dark'">
            <FormLabel class="[&:has([data-state=checked])>div]:border-primary">
              <FormControl>
                <RadioGroupItem value="dark" class="sr-only" />
              </FormControl>
              <div class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div class="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div class="h-2 w-20 rounded-lg bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div class="h-4 w-4 rounded-full bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div class="h-4 w-4 rounded-full bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span class="block w-full p-2 text-center font-normal">
                Dark
              </span>
            </FormLabel>
          </FormItem>
          <FormItem @click="mode = 'auto'">
            <FormLabel class="[&:has([data-state=checked])>div]:border-primary">
              <FormControl>
                <RadioGroupItem value="auto" class="sr-only" />
              </FormControl>
              <div class="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                  <svg width="200" height="148" viewBox="0 0 208 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 4C0 1.79086 1.79086 0 4 0H104V148H4C1.79086 148 0 146.209 0 144V4Z" fill="#ECEDEF"/>
                    <path d="M104 0H204C206.209 0 208 1.79086 208 4V144C208 146.209 206.209 148 204 148H104V0Z" fill="#020817"/>
                    <path d="M13 68C13 64.6863 15.6863 62 19 62H104V94H19C15.6863 94 13 91.3137 13 88V68Z" fill="white"/>
                    <path d="M13 20C13 16.6863 15.6863 14 19 14H104V54H19C15.6863 54 13 51.3137 13 48V20Z" fill="white"/>
                    <path d="M13 108C13 104.686 15.6863 102 19 102H104V134H19C15.6863 134 13 131.314 13 128V108Z" fill="white"/>
                    <path d="M104 62H187C190.314 62 193 64.6863 193 68V88C193 91.3137 190.314 94 187 94H104V62Z" fill="#1E293B"/>
                    <path d="M104 14H187C190.314 14 193 16.6863 193 20V48C193 51.3137 190.314 54 187 54H104V14Z" fill="#1E293B"/>
                    <path d="M104 102H187C190.314 102 193 104.686 193 108V128C193 131.314 190.314 134 187 134H104V102Z" fill="#1E293B"/>
                    <path d="M19 26C19 23.7909 20.7909 22 23 22H104V30H23C20.7909 30 19 28.2091 19 26V26Z" fill="#ECEDEF"/>
                    <path d="M45 78C45 75.7909 46.7909 74 49 74H104V82H49C46.7909 82 45 80.2091 45 78V78Z" fill="#ECEDEF"/>
                    <path d="M104 74H159C161.209 74 163 75.7909 163 78V78C163 80.2091 161.209 82 159 82H104V74Z" fill="#94A3B8"/>
                    <path d="M45 118C45 115.791 46.7909 114 49 114H104V122H49C46.7909 122 45 120.209 45 118V118Z" fill="#ECEDEF"/>
                    <path d="M104 114H159C161.209 114 163 115.791 163 118V118C163 120.209 161.209 122 159 122H104V114Z" fill="#94A3B8"/>
                    <path d="M19 42C19 39.7909 20.7909 38 23 38H104V46H23C20.7909 46 19 44.2091 19 42V42Z" fill="#ECEDEF"/>
                    <path d="M104 22H129C131.209 22 133 23.7909 133 26V26C133 28.2091 131.209 30 129 30H104V22Z" fill="#94A3B8"/>
                    <path d="M104 38H151C153.209 38 155 39.7909 155 42V42C155 44.2091 153.209 46 151 46H104V38Z" fill="#94A3B8"/>
                    <circle cx="29" cy="78" r="8" fill="#ECEDEF"/>
                    <circle cx="29" cy="118" r="8" fill="#ECEDEF"/>
                  </svg>
              </div>
              <span class="block w-full p-2 text-center font-normal">
                Auto
              </span>
            </FormLabel>
          </FormItem>
        </RadioGroup>
      </FormItem>
    </FormField>

<!--    <div class="flex justify-start">-->
<!--      <Button type="submit">-->
<!--        Update preferences-->
<!--      </Button>-->
<!--    </div>-->
  </form>
</template>
