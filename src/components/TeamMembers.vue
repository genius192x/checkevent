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

const sofiaRole = ref('Админ')
const jacksonRole = ref('Исполнитель')
</script>

<template>
  <Card class="h-full flex flex-col border-none">
    <CardHeader class="p-4 md:p-6">
      <CardTitle>Участники Задания</CardTitle>
      <CardDescription>
        Тут отображаются все участники и их роли
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6 p-4 md:p-6">
      <div
        class="flex items-stretch justify-between space-y-4  sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0 ">
        <div class="flex items-center space-x-4">
          <Avatar>
            <AvatarImage :src="getImageUrl('01.png')" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p class="text-sm font-medium leading-none">
              Ольга Михайловна
            </p>
            <p class="text-sm text-muted-foreground">
              m@example.com
            </p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="">
              {{ sofiaRole }}
              <ChevronDownIcon class="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0" align="end">
            <Command v-model="sofiaRole">
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
                  <CommandItem value="Бухгалтер" class="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                    <p>Бухгалтер</p>
                    <p class="text-sm text-muted-foreground">
                      Может просматривать, комментировать и управлять выставлением счетов.
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
      <div
        class="flex  items-stretch justify-between space-y-4  sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0 ">
        <div class="flex items-center space-x-4">
          <Avatar>
            <AvatarImage :src="getImageUrl('02.png')" />
            <AvatarFallback>ДЖ</AvatarFallback>
          </Avatar>
          <div>
            <p class="text-sm font-medium leading-none">
              Дарья Жданова
            </p>
            <p class="text-sm text-muted-foreground">
              p@example.com
            </p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="">
              {{ jacksonRole }}
              <ChevronDownIcon class="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0" align="end">
            <Command v-model="jacksonRole">
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
                  <CommandItem value="Бухгалтер" class="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                    <p>Бухгалтер</p>
                    <p class="text-sm text-muted-foreground">
                      Может просматривать, комментировать и управлять выставлением счетов.
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