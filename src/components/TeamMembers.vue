
<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon } from '@radix-icons/vue'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

function getImageUrl(name) {
  return new URL(`../assets/avatars/${name}`, import.meta.url).href
}
interface Person {
  admin: boolean,
  avatar: string,
  email: string,
  name: string,
  password: string,
  role: string,
  surname: string,
}

const props = defineProps<{
  person: Person,
  isChangeable: boolean
}>()
const defaultRole = ref('Исполнитель')

function initialsPersonal(name, surname) {
  let firstLetter = name.slice(0, 1)
  let secondLetter = surname.slice(0, 1)
  return (`${firstLetter}${secondLetter}`)
}
// const jacksonRole = ref('Исполнитель')
</script>

<template>
  <Card class="h-full flex flex-col border-none">
    <CardContent class="p-8	 grid gap-6 py-2">
      <div class="flex flex-col-reverse gap-4 justify-between sm:space-y-0">
        <div class="flex items-center space-x-4">
          <Avatar>
            <AvatarImage :src="getImageUrl(props.person.avatar)" />
            <AvatarFallback>{{ initialsPersonal(props.person.name, props.person.surname) }}</AvatarFallback>
          </Avatar>
          <div>
            <p class="text-sm font-medium leading-none">
              {{ props.person.name }} {{ props.person.surname }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ props.person.email }}
            </p>
          </div>
        </div>
        <div v-if="!props.isChangeable" class="ml-0">
          {{ defaultRole }}
        </div>
        <Popover v-else>
          <PopoverTrigger as-child>
            <Button variant="outline" class="">
              {{ defaultRole }}
              <ChevronDownIcon class="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0" align="end">
            <Command v-model="defaultRole">
              <CommandInput placeholder="Select new role..." />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem value="Зритель" class="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                    <p>Зритель</p>
                    <p class="text-sm text-muted-foreground">
                      Можете просматривать и комментировать.
                    </p>
                  </CommandItem>
                  <CommandItem value="Исполнитель" class="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                    <p>Исполнитель</p>
                    <p class="text-sm text-muted-foreground">
                      Можно просматривать, комментировать и редактировать.
                    </p>
                  </CommandItem>
                  <CommandItem value="Админ" class="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                    <p>Админ</p>
                    <p class="text-sm text-muted-foreground">
                      Доступ ко всем ресурсам на уровне администратора.
                    </p>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </CardContent>
  </Card>
</template>
