<script setup lang="ts">
import {ChevronDownIcon} from '@radix-icons/vue'
import {CircleIcon} from '@radix-icons/vue'
import {PlusIcon} from '@radix-icons/vue'
import {StarIcon} from '@radix-icons/vue'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

defineProps<{
  item: object

}>()
</script>

<template>
  <Card @click="this.$router.push('/list')" class="cursor-pointer">
    <CardHeader class="grid grid-cols-[minmax(0,1fr)_32px] items-start gap-4 space-y-0">
      <div class="space-y-1">
        <CardTitle>{{item.title}}
        </CardTitle>
        <CardDescription class="pt-2">
          {{item.description}}
        </CardDescription>
      </div>
      <div class=" rounded-md bg-white text-secondary-foreground" @click.stop>
        <DropdownMenu>
          <DropdownMenuTrigger class="bg-transparent" as-child>
            <Button variant="secondary" class="px-2 shadow-none">
              <ChevronDownIcon class="h-5 w-5 text-secondary-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            :align-offset="-5"
            class="w-[200px]"
          >
            <DropdownMenuItem>
              Скопировать лист
            </DropdownMenuItem>
            <DropdownMenuItem>Редактировать лист</DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem class="text-red-500">
              Удалить лист
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex space-x-4 text-sm text-muted-foreground">
        <div class="flex items-center">
          <CircleIcon class="mr-1 h-3 w-3 fill-sky-400 text-red-500" />
          {{item.type}}
        </div>
        <div>Последнее обновление {{item.lastApdate}}</div>
      </div>
    </CardContent>
  </Card>
</template>
