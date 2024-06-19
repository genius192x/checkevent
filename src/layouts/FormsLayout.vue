<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <div class=" space-y-6 p-3 px-4 md:block md:pb-16 md:p-10">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Settings
      </h2>
      <p class="text-muted-foreground">
        Manage your account settings and set e-mail preferences.
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <div class="flex-1">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>