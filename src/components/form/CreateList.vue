<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Check, ChevronsUpDown, Plus } from 'lucide-vue-next'
import { CalendarDate, DateFormatter, getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import { cn } from '@/lib/utils'
import {
  toast
} from 'vue-sonner'

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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Calendar } from '@/components/ui/calendar'
import { useForm } from 'vee-validate'


import {useListStore} from '@/store/ListsStore'
import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'

interface Responsible {
  avatar: string,
  email: string,
  name: string,
  password: string,
  role: string,
  surname: string,
}

// interface Item {
//   id: number,
//   title: string,
//   description: string,
//   status: string,
//   label: string,
//   priority: string,
//   deadLine: string,
//   images: object,
//   isDone: boolean,
//   responsible: Responsible,
//   messages: [],
// }
interface Item {
id: number,
lastApdate: any,
title: string,
type: string,
description: string,
status: string,
isArchived: boolean,
participants: [],
}
// const props = defineProps<Item>()
// const props = defineProps({
//   likes: Number
// })

const props = defineProps<{
  item: Item
}>()

// const props = defineProps<{
  //   text: string,
  // }>()
  const globalStore = useGlobalStore()
  const userStore = useUserStore()
  const listStore = useListStore()

  const open = ref(false)
  const openDate = ref(false)
  const dateValue = ref()
  const placeholder = ref()

  type User = (typeof users.value)[number]
  const openUserSelect = ref(false)
  const selectedUsers = ref<User[]>([])
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
    participants: [],
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

  function getImageUrl(name) {
    return new URL(`../../assets/avatars/${name}`, import.meta.url).href
  }

onMounted(() => {
    console.log(props.item);

    if (props.item) {
      formResult.title = props.item.title
      formResult.description = props.item.description
      formResult.lastApdate = props.item.lastApdate
      formResult.type = props.item.type
      formResult.participants = props.item.participants
    }
  })

// function onSubmit(values: any) {
//   listStore.addList(formResult)
//   globalStore.isSheetOpen = false
//   toast('Лист успешно создан');
// }

const form = useForm({
  validationSchema: accountFormSchema,
})
form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

    <template>
      <Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" class="space-y-6 mt-3 flex flex-col max-h-[95%]"
      @submit="onSubmit">
      <div class="form__fields max-h-[350px] overflow-y-auto overflow-x-visible md:overflow-auto space-y-4 md:space-y-6 md:max-h-none">
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
    <FormField v-slot="{ value }" name="participants">
      <FormItem class="flex flex-col">
        <FormLabel>ыбрать участников</FormLabel>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <div variant="outline"
              class="rounded-full p-2.5 flex items-center justify-center cursor-pointer hover:bg-muted"
              @click="openUserSelect = true">
              <Plus class="w-4 h-4" />
            </div>
            <Command class="overflow-hidden rounded-t-none border-t">
              <CommandList>
                <CommandEmpty>Нет участников.</CommandEmpty>
                <CommandGroup class="p-2 max-h-[180px] overflow-y-scroll">
                  <CommandItem v-for="user in selectedUsers" :key="user.email" :value="user"
                  class="flex items-center px-2" @select="() => {
                    const index = selectedUsers.findIndex(u => u === user)
                    if (index !== -1) {
                      formResult.participants.splice(index, 1)
                      selectedUsers.splice(index, 1)
                    }
                    else {
                      formResult.participants.push(user)
                      selectedUsers.push(user)
                    }
                  }">
                  <Avatar>
                    <AvatarImage :src="getImageUrl(user.avatar)" alt="Image" />
                    <AvatarFallback>{{ user.name[0] }}</AvatarFallback>
                  </Avatar>
                  <div class="ml-2">
                    <p class="text-sm font-medium leading-none">
                      {{ user.name }}
                    </p>
                    <p class="text-sm text-muted-foreground">
                      {{ user.email }}
                    </p>
                  </div>
                  <Check v-if="selectedUsers.includes(user)"
                  class="ml-auto flex h-5 w-5 text-primary" />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>


    <FormDescription>
      Тут будет список участников листа
    </FormDescription>
  </FormItem>
</FormField>
      </div>
      <div class="flex justify-start gap-2 mt-auto">
        <Button type="submit" class="outline-0 flex-auto md:flex-none">
          Создать лист
        </Button>
        <!-- <Button class="bg-transparent text-primary border hover:bg-primary-foreground outline-0">
          Сбросить значение полей
        </Button> -->
      </div>
      <Dialog v-model:open="openUserSelect">
        <DialogContent class="gap-0 p-0 outline-none">
          <DialogHeader class="px-4 pb-4 pt-5">
            <DialogTitle>Список пользователей</DialogTitle>
            <DialogDescription>
              Вы можете добавить людей, которые будут заниматься задачами по новому листу
            </DialogDescription>
          </DialogHeader>
          <Command class="overflow-hidden rounded-t-none border-t"
          :filter-function="(list: User[], search) => list.filter(l => l.name.toLowerCase().includes(search.toLowerCase()))">
          <CommandInput placeholder="Найти пользователя..." />
          <CommandList>
            <CommandEmpty>Нет пользователей.</CommandEmpty>
            <CommandGroup class="p-2">
              <CommandItem v-for="user in globalStore.defaultUsers" :key="user.email" :value="user"
              class="flex items-center px-2" @select="() => {
                const index = selectedUsers.findIndex(u => u === user)
                if (index !== -1) {
                  formResult.participants.splice(index, 1)
                  selectedUsers.splice(index, 1)
                }
                else {
                  formResult.participants.push(user)
                  selectedUsers.push(user)
                }
              }">
              <Avatar>
                <AvatarImage :src="getImageUrl(user.avatar) " alt="Image" />
                <AvatarFallback>{{ user.name[0] }}</AvatarFallback>
              </Avatar>
              <div class="ml-2">
                <p class="text-sm font-medium leading-none">
                  {{ user.name }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ user.email }}
                </p>
              </div>
              <Check v-if="selectedUsers.includes(user)" class="ml-auto flex h-5 w-5 text-primary" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <DialogFooter class="flex items-center border-t p-4 sm:justify-between">
        <div v-if="selectedUsers.length > 0" class="flex -space-x-2 overflow-hidden">
          <Avatar v-for="user in selectedUsers" :key="user.email"
          class="inline-block border-2 border-background">
          <AvatarImage :src="getImageUrl(user.avatar) " />
          <AvatarFallback>{{ user.name[0] }}</AvatarFallback>
        </Avatar>
      </div>

      <p v-else class="text-sm text-muted-foreground">
        Нужно выбрать минимум 1 человека
      </p>

      <Button :disabled="selectedUsers.length < 1" @click="openUserSelect = false">
        Continue
      </Button>
      </DialogFooter>
      </DialogContent>
      </Dialog>
</Form>
</template>
