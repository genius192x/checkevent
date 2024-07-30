<script setup lang="ts">
import devtools from '@vue/devtools'
import { useToggle } from '@vueuse/core'
import Search from '@/components/Search.vue'
import UserNav from '@/components/UserNav.vue'
import { useColorMode } from '@vueuse/core'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/toast/use-toast'
import { useGlobalStore } from './store/GlobalStore';
import { computed, onMounted } from 'vue'
import router from './router'
import { useUserStore } from './store/UserStore'
import { rudderAnalytics } from '@/lib/rudderAnalytics.js'
import Button from '@/components/ui/button/Button.vue'

import {MoonIcon} from '@radix-icons/vue'
import {SunIcon} from '@radix-icons/vue'
import {Half2Icon} from '@radix-icons/vue'
const mode = useColorMode()

const themeValue = localStorage.getItem('vueuse-color-scheme')
rudderAnalytics.ready(() => {
  console.log("The JavaScript SDK is ready.");
});


const { toast } = useToast()
const userStore = useUserStore()
const globalStore = useGlobalStore()

const changeTheme = function () {
  switch (mode.value) {
    case "light":
      mode.value = 'dark'
      break;

    case 'dark':
      mode.value = "light"
      break;

    default:
      break;
  }
}

onMounted(() => {
	if (!globalStore.isAuth) {
		router.push('/authorization')
  }
});

const isDark = computed(() => {
  return mode.value === 'dark'
})

</script>

<template>
	<TooltipProvider :delay-duration="0">
		<div class="flex-col md:flex transition-all duration-500 h-full" :class="{'scale-95' : globalStore.isSheetOpen }">
			<div class="border-b min-h-[100dvh]">
				<div class="sticky top-0 flex h-16 z-50 items-center gap-4 border-b bg-background px-4 md:px-6 "  v-if="globalStore.isAuth">
					<router-link to="/" class="w-[40px] h-[40px]">
						<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M27.4302 22.927C26.4164 24.5813 24.8629 25.8709 23.0086 26.5976C21.1542 27.3243 19.1019 27.4477 17.1671 26.9489C15.2324 26.4501 13.5224 25.3567 12.3003 23.8369C11.0782 22.3171 10.4116 20.455 10.4031 18.5372C10.3945 16.6194 11.0446 14.752 12.2531 13.2223C13.4617 11.6926 15.1618 10.5853 17.0921 10.0708C19.0223 9.55626 21.0757 9.66296 22.9364 10.3745C24.7972 11.086 26.3621 12.363 27.3905 14.0089M22.8664 16.5986C22.431 15.9018 21.7684 15.3612 20.9807 15.0599C20.1929 14.7587 19.3236 14.7135 18.5064 14.9314C17.6892 15.1492 16.9694 15.618 16.4577 16.2656C15.9461 16.9132 15.6709 17.7038 15.6745 18.5158C15.6781 19.3277 15.9603 20.116 16.4777 20.7594C16.9951 21.4029 17.719 21.8658 18.5382 22.077C19.3573 22.2881 20.2262 22.2359 21.0112 21.9282C21.7963 21.6206 22.454 21.0746 22.8832 20.3743" stroke="#1A535C"/>
							<path d="M25.983 22.2963C25.1195 23.6216 23.8274 24.6447 22.3007 25.212C20.774 25.7793 19.0951 25.8602 17.5159 25.4426C15.9368 25.025 14.5426 24.1313 13.5428 22.8958C12.5429 21.6603 11.9913 20.1496 11.9708 18.5904C11.9502 17.0313 12.4618 15.5079 13.4287 14.2489C14.3957 12.9899 15.7658 12.0633 17.3334 11.6081C18.901 11.1528 20.5816 11.1936 22.1228 11.7243C23.664 12.255 24.9826 13.2469 25.8808 14.5512M24.2431 15.5719C23.577 14.6047 22.5992 13.8692 21.4564 13.4757C20.3136 13.0822 19.0674 13.0519 17.905 13.3895C16.7426 13.727 15.7266 14.4142 15.0096 15.3477C14.2926 16.2813 13.9132 17.4109 13.9285 18.5671C13.9437 19.7232 14.3528 20.8434 15.0942 21.7596C15.8356 22.6757 16.8694 23.3384 18.0403 23.6481C19.2113 23.9578 20.4563 23.8978 21.5884 23.4771C22.7204 23.0564 23.6785 22.2978 24.3188 21.315" stroke="#1A535C"/>
							<path d="M36 1H1V36H36V1Z" stroke="#1A535C"/>
						</svg>
					</router-link>
					<div class="ml-auto flex items-center space-x-4 relative z-20">
						<!-- <Search /> -->
            <Button
              class="w-9 h-9"
              aria-label="Toggle dark mode"
              :variant="'ghost'"
              :size="'icon'"
              @click="changeTheme"
            >
              <component
                :is="isDark ? SunIcon : MoonIcon"
                class="w-5 h-5 text-foreground"
              />
            </Button>
						<UserNav />
					</div>
				</div>
				<router-view class="relative z-20 min-h-full"></router-view>
			</div>
		</div>
	</TooltipProvider>
	<Toaster />
</template>

<style>
body{
	min-height: 100dvh;
  transition: all 0.3s ease 0s;
}
#app{
	min-height: 100dvh;

}
</style>
