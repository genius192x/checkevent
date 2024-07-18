<script setup lang="ts">
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'

const props = defineProps({
	avatars: { type: Array, required: true },
})
function getImageUrl(name) {
	return new URL(`../assets/avatars/${name}`, import.meta.url).href
}
function initialsPersonal(name, surname) {
	let firstLetter = name.slice(0, 1)
	let secondLetter = surname.slice(0, 1)
	return (`${firstLetter}${secondLetter}`)
}
</script>

<template>
	<div class="flex -space-x-2">
		<div class="block" v-for="(avatar, index) in $props.avatars">
			<Avatar class="h-8 w-8 border-2 border-background" v-if="index < 3">
				<AvatarImage :src="getImageUrl(avatar.avatar)" :alt="initialsPersonal(avatar.name, avatar.surname)" />
				<AvatarFallback>{{ initialsPersonal(avatar.name, avatar.surname) }}</AvatarFallback>
			</Avatar>
		</div>
	</div>
</template>
