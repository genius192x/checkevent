<script setup lang="ts">
import { ref } from 'vue'
import UserCard from '@/components/UserCard.vue'
import { useListStore } from '@/store/ListsStore'
import { useGlobalStore } from '@/store/GlobalStore'
import { useUserStore } from '@/store/UserStore'
const userStore = useUserStore()
const globalStore = useGlobalStore()
const listStore = useListStore()
</script>

<template>
	<div class="flex-1 space-y-6 p-2 pt-6 md:p-8">
		<div class="grid gap-4 lg:grid-cols-3 xl:grid-cols-4">
			<div v-for="user, index in globalStore.defaultUsers" :key="index">
				<UserCard
					:item="user"
				/>
			</div>
		</div>
	</div>
</template>