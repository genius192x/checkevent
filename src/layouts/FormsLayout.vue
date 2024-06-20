<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import SidebarNav from '@/components/SidebarNav.vue'
</script>

<template>
  <div class="space-y-6 p-3 px-4 md:block md:pb-16 md:p-5">
    <router-link to="/"><-назад</router-link>
    <div class="space-y-0.5 md:ml-[20%]">
      <h2 class="text-2xl font-bold tracking-tight">
        Настройки
      </h2>
      <p class="text-muted-foreground">
        Управляйте настройками своей учетной записи, внешним видом приложения и устанавливайте настройки электронной почты.
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-y-0">
      <aside class=" lg:w-1/5">
        <SidebarNav />
      </aside>
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>