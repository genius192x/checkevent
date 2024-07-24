<script setup  >
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUserStore } from '@/store/UserStore'

const userStore = useUserStore()
function getImageUrl(name) {
	return new URL(`../assets/avatars/${name}`, import.meta.url).href
}
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="ghost" class="relative h-8 w-8 rounded-full">
				<Avatar class="h-8 w-8">
					<AvatarImage :src="getImageUrl(userStore.userData.avatar)" alt="АЗ" v-if="userStore.userData.avatar"/>
					<AvatarFallback v-else>АЗ</AvatarFallback>
				</Avatar>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56" align="end">
			<DropdownMenuLabel class="font-normal flex">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none">
						{{ userStore.userData.first_name }} {{ userStore.userData.last_name }}
					</p>
					<p class="text-xs leading-none text-muted-foreground">
						{{ userStore.userData.email }}
					</p>
				</div>
			</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem v-if="userStore.userData.admin">
					<router-link to="/management">
						Управление
					</router-link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<router-link to="/settings">
						Настройки
					</router-link>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="userStore.logout()">
				Выйти
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
