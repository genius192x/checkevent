<script setup>
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'
const activeUsers = [
	{
		image: 'src/assets/avatars/04.png'
	},
	{
		image: 'src/assets/avatars/02.png'
	},
	{
		image: 'src/assets/avatars/03.png'
	},
]
</script>

<template>
	<div class="flex gap-1">
		<div class="block" v-for="avatar in activeUsers">
			<Avatar class="h-8 w-8">
				<AvatarImage :src="avatar.image" alt="АЗ" />
				<AvatarFallback>АЗ</AvatarFallback>
			</Avatar>
		</div>
	</div>
</template>
