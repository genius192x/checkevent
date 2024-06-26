<script setup lang="ts">
import Search from '@/components/Search.vue'
import UserNav from '@/components/UserNav.vue'
import { useColorMode } from '@vueuse/core'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/toast/use-toast'
import { useGlobalStore } from './store/GlobalStore';
import { onMounted } from 'vue'
import router from './router'
import { useUserStore } from './store/UserStore'

const mode = useColorMode()
const { toast } = useToast()
const userStore = useUserStore()
const globalStore = useGlobalStore()

onMounted(() => {
	if (!globalStore.isAuth) {
		router.push('/authorization')
	}
});

</script>

<template>
	<TooltipProvider :delay-duration="0">
		<div class="flex-col md:flex transition-all duration-500 h-full" :class="{'scale-95' : globalStore.isSheetOpen }">
			<div class="border-b h-full">
				<div class="sticky top-0 flex h-16 z-50 items-center gap-4 border-b bg-background px-4 md:px-6 "  v-if="globalStore.isAuth">
					<div class="ml-auto flex items-center space-x-4 relative z-20">
						<Search />
						<UserNav />
					</div>
				</div>
				<router-view class="relative z-20 h-full"></router-view>
			</div>
		</div>
	</TooltipProvider>
	<Toaster />
</template>

<style>
body{
	min-height: 100dvh;
}
#app{
	height: 100dvh;
}
</style>
