<script setup lang="ts">
import { ref } from 'vue'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMedia } from "@/lib/useMedia";
import CardChat from '@/components/CardChat.vue'
import TeamMembers from '@/components/TeamMembers.vue'
import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'
// Reuse `form` section
const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMedia('(min-width: 768px)')

const isOpen = ref(false)

const userStore = useUserStore()
const globalStore = useGlobalStore()

const isMobile = useMedia("(max-width: 768px)")
</script>

<template>

  <UseTemplate>
    <form class="grid items-start gap-4 px-4" @submit.prev="">
      <div class="grid gap-2">
        <Label html-for="result">Результат</Label>
        <Textarea id="result" type="textarea" default-value="Выполнил задачу" />
      </div>
      <Button type="submit">
        Отправить результат
      </Button>
    </form>
  </UseTemplate>

  <Dialog v-if="isDesktop" v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline">
        Резульатат задания
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Резульатат</DialogTitle>
        <DialogDescription>
          Здесь вы можете оставить комментарий о проделанной работе
        </DialogDescription>
      </DialogHeader>
      <GridForm />
    </DialogContent>
  </Dialog>

  <Drawer v-else v-model:open="isOpen">
    <DrawerTrigger as-child>
      <Button variant="outline">
         Резульатат задания
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle> Резульатат задания</DrawerTitle>
        <DrawerDescription>
          Здесь вы можете оставить комментарий о проделанной работе
        </DrawerDescription>
      </DrawerHeader>
      <GridForm />
      <DrawerFooter class="pt-2">
        <DrawerClose as-child>
          <Button variant="outline">
            Отменить
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
