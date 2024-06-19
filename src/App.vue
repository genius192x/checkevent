<script setup lang="ts">
import { cn } from '@/lib/utils'
import {onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Search from '@/components/Search.vue'
import UserNav from '@/components/UserNav.vue'
import Nav from '@/components/Nav.vue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'

import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import { useGlobalStore } from '@/store/GlobalStore'
import router from './router'
import {useRoute} from "vue-router";
const globalStore = useGlobalStore()
const { isSettingsOpen } = storeToRefs(globalStore)


const route = useRoute()


watch(route, (to) => {
  globalStore.isSheetOpen = false
})

onMounted(() => {
  const currPath = window.location.hash;
  if(currPath.includes('settings')){
    console.log(currPath)
    globalStore.isSettingsOpen = true
  }
  console.log(globalStore.isSettingsOpen)
})

interface collapsedProps {
	defaultLayout?: number[]
	defaultCollapsed?: boolean
	navCollapsedSize: number
}
const props = withDefaults(defineProps < collapsedProps > (), {
	defaultCollapsed: false,
	defaultLayout: () => [20, 80],
})
const isCollapsed = ref(props.defaultCollapsed)
const links = [
    {
		title: 'Главная',
		link: '/',
    label: '128',
    icon: 'lucide:home',
    variant: 'ghost',
    },
    {
		title: 'Задачи',
		link: '/tasks',
    label: '9',
    icon: 'lucide:clipboard-edit',
    variant: 'ghost',
    },
]
const settingsLinks =[
  {
    title: 'Настройки профиля',
    link: '/settings',
    icon: 'gravity-ui:person-gear',
    variant: 'ghost',
  },
  {
    title: 'Внешний вид',
    link: '/settings/appearance',
    icon: 'pajamas:appearance',
    variant: 'ghost',
  },{
    title: 'Отображение',
    link: '/settings/display',
    icon: 'fa6-solid:display',
    variant: 'ghost',
  },{
    title: 'Уведомления',
    link: '/settings/notifications',
    icon: 'material-symbols:edit-notifications-outline-sharp',
    variant: 'ghost',
  },
]
function onCollapse() {
	isCollapsed.value = true
}

function onExpand() {
	isCollapsed.value = false
}

const defaultLayout = [20, 80]
</script>

<template>
    <TooltipProvider :delay-duration="0">
        <ResizablePanelGroup
            id="resize-panel-group-1"
            direction="horizontal"
            class="h-full items-stretch relative"
        >
            <ResizablePanel
              id="resize-panel-1"
              :default-size="defaultLayout[0]"
              :collapsed-size="navCollapsedSize"
              collapsible
              :min-size="15"
              :max-size="20"
              class="hidden md:block md:overflow-hidden"
              :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
              @expand="onExpand"
              @collapse="onCollapse"
            >
              <Nav
                :is-collapsed="isCollapsed"
                :links="links"
                class="relative z-10 transition-all duration-500 ease-in-out translate-x-0"
              />
              <Nav
                :is-collapsed="isCollapsed"
                :links="settingsLinks"
                class="relative z-20 transition-all duration-500 ease-in-out -translate-y-12  bg-white"
                :class=
                  "{ 'relative translate-x-0': globalStore.isSettingsOpen,
                    'translate-x-full' : !globalStore.isSettingsOpen
                  }"
              />
            </ResizablePanel>
            <ResizableHandle id="resize-handle-1" with-handle class="hidden md:flex z-30" />
            <ResizablePanel id="resize-panel-3" :default-size="defaultLayout[1]" class="relative z-20 bg-background">
                <div class=" flex-col md:flex">
                    <div class="border-b">
                        <div class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                            <Sheet :open=globalStore.isSheetOpen>
                                <SheetTrigger as-child @click="globalStore.isSheetOpen=true">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        class="shrink-0 md:hidden"
                                    >
                                        <span class="sr-only">Toggle navigation menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" class="flex flex-col overflow-hidden">
                                  <Nav
                                      :is-collapsed="isCollapsed"
                                      :links="links"
                                      class="relative z-10 transition-all duration-1000 ease-in-out translate-x-0"
                                  />
                                  <Nav
                                      :is-collapsed="isCollapsed"
                                      :links="settingsLinks"
                                      class="relative z-20 transition-all duration-500 ease-in-out -translate-y-16  bg-white"
                                      :class=
                                          "{ 'relative translate-x-0': globalStore.isSettingsOpen,
                                            'translate-x-[120%]' : !globalStore.isSettingsOpen
                                          }"
                                  />
                                </SheetContent>
                                </Sheet>
                            <div class="ml-auto flex items-center space-x-4 relative z-20">
                                <Search />
                                <UserNav />
                            </div>
                        </div>
                      <router-view class="relative z-20"></router-view>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </TooltipProvider>

</template>
