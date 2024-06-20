<script setup lang="ts">
import {useRoute} from "vue-router";
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Item {
  title: string
  href: string
}

const $route = useRoute()

const sidebarNavItems: Item[] = [
  {
    title: 'Аккаунт',
    href: '/settings',
  },
  {
    title: 'Внешний вид',
    href: '/settings/appearance',
  },
  {
    title: 'Уведомления',
    href: '/settings/notifications',
  },
]
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:mr-20">
    <div
        v-for="item in sidebarNavItems"
        :key="item.title"
    >
      <router-link active-class=" bg-muted hover:bg-muted" :to="item.href" class="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full text-left justify-start">
          {{ item.title }}
      </router-link>
    </div>

  </nav>
</template>
