<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { FieldArray, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
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

import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'

const frameworks = [
{ value: 'zim@mail.ru', label: 'Антон Зимин' },
{ value: 'lev@mail.ru', label: 'Михаил Левченко' },
{ value: 'ser@mail.ru', label: 'Сергей Моисеев' },
{ value: 'kur@mail.ru', label: 'Настя Курбатова' },
]

const modelValue = ref<string[]>([])
const open = ref(false)
const searchTerm = ref('')

const filteredFrameworks = computed(() => frameworks.filter(i => !modelValue.value.includes(i.value)))



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


const dateValue = ref()
const placeholder = ref()
const openDate = ref(false)

const df = new DateFormatter('ru-RU', {
  dateStyle: 'long',
})

const profileFormSchema = toTypedSchema(z.object({
  listname: z
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
  date: z.string().datetime().optional().refine(date => date !== undefined, 'Выберите дату.'),
  participants: z.array(z.string({ message: 'Обязательно кого-то выбрать' })).min(1, { message: 'Обязательно кого-то выбрать' }),
}))

const { handleSubmit, setFieldValue,  resetForm } = useForm({
  validationSchema: profileFormSchema,
})

const onSubmit = handleSubmit((values) => {
  listStore.addList(values)
  toast('Лист успешно создан');
  console.log(values);
})
</script>

<template>
  <form class="space-y-8 mt-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="listname">
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
            <Calendar v-model:placeholder="placeholder" v-model="dateValue" calendar-label="День окончания"
              initial-focus :min-value="today(getLocalTimeZone())" @update:model-value="(v) => {
            if (v) {
              dateValue = v
              openDate = false
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
          День окончания всех внутренних задач
        </FormDescription>
      </FormItem>
      <input type="hidden" v-bind="field">
    </FormField>
    <FormField v-slot="{ value }" name="participants">
      <FormItem>
        <FormLabel>Участники</FormLabel>
        <FormControl>
          <TagsInput class="px-0 gap-0 w-80" :model-value="modelValue" @update:modelValue="value => {
    setFieldValue('participants', value);
          }">
            <div class="flex gap-2 flex-wrap items-center px-3">
              <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
                <TagsInputItemText />
                <TagsInputItemDelete />
              </TagsInputItem>
            </div>

            <ComboboxRoot v-model="modelValue" v-model:open="open" v-model:searchTerm="searchTerm" class="w-full z-100">
              <ComboboxAnchor as-child>
                <ComboboxInput placeholder="Участники..." as-child>
                  <TagsInputInput class="w-full px-3" :class="modelValue.length > 0 ? 'mt-2' : ''"
                    @keydown.enter.prevent />
                </ComboboxInput>
              </ComboboxAnchor>

              <ComboboxPortal>
                <ComboboxContent>
                  <CommandList position="popper"
                    class="z-50 w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                    <CommandEmpty />
                    <CommandGroup>
                      <CommandItem v-for="framework in filteredFrameworks" :key="framework.value"
                        :value="framework.label" @select.prevent="(ev) => {
                      if (typeof ev.detail.value === 'string') {
                        searchTerm = ''
                        modelValue.push(framework.value)
                        setFieldValue('participants', modelValue)
                      }

                      if (filteredFrameworks.length === 0) {
                        setFieldValue('participants', modelValue)
                      }
                    }">
                        {{ framework.label }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </ComboboxContent>
              </ComboboxPortal>
            </ComboboxRoot>
          </TagsInput>
        </FormControl>
        <FormDescription>
          Выберите людей, которые будут участвовать в проекте
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <!-- <FormField v-slot="{ componentField }" name="email">
  <FormItem>
    <FormLabel>Email</FormLabel>

    <Select v-bind="componentField">
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select an email" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="email in verifiedEmails" :key="email" :value="email">
            {{ email }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <FormDescription>
      You can manage verified email addresses in your email settings.
    </FormDescription>
    <FormMessage />
  </FormItem>
</FormField> -->


    <!-- <div>
  <FieldArray v-slot="{ fields, push, remove }" name="urls">
    <div v-for="(field, index) in fields" :key="`urls-${field.key}`">
      <FormField v-slot="{ componentField }" :name="`urls[${index}].value`">
        <FormItem>
          <FormLabel :class="cn(index !== 0 && 'sr-only')">
            URLs
          </FormLabel>
          <FormDescription :class="cn(index !== 0 && 'sr-only')">
            Add links to your website, blog, or social media profiles.
          </FormDescription>
          <div class="relative flex items-center">
            <FormControl>
              <Input type="url" v-bind="componentField" />
            </FormControl>
            <button type="button" class="absolute py-2 pe-3 end-0 text-muted-foreground" @click="remove(index)">
              <Cross1Icon class="w-3" />
            </button>
          </div>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <Button type="button" variant="outline" size="sm" class="text-xs w-20 mt-2" @click="push({ value: '' })">
      Add URL
    </Button>
  </FieldArray>
</div> -->

    <div class="flex gap-2 justify-start">
      <Button type="submit">
        Создать лист
      </Button>

      <Button type="button" variant="outline" @click="resetForm">
        Сбросить значения
      </Button>
    </div>
  </form>
</template>