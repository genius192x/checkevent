<script setup lang="ts">
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'

const props = defineProps({
	avatars: { type: Array, required: true },
})
</script>

<template>
	<div class="flex -space-x-1">
		<div class="block" v-for="(avatar, index) in $props.avatars">
			<Avatar class="h-8 w-8 border-2 border-background" v-if="index < 3">
				<AvatarImage :src="avatar.avatar" alt="АЗ" />
				<AvatarFallback>АЗ</AvatarFallback>
			</Avatar>
		</div>
	</div>
</template>
