<script setup lang="ts">
import tasks from '@/lib/tasks.json'
import DataTable from '@/components/DataTable.vue'
import UserNav from '@/components/UserNav.vue'
import { columns } from '@/components/columns'

const myTasks = tasks
</script>

<template>
	<div class=" h-full flex-1 flex-col space-y-8 p-4  md:flex md:p-8">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">
					Welcome back!
				</h2>
				<p class="text-muted-foreground line-clamp-1">
					Here&apos;s a list of your <br> tasks for this month!
				</p>
			</div>
		</div>
		<DataTable :data="myTasks" :columns="columns" />
	</div>
</template>