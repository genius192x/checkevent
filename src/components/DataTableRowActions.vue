<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import { priorities } from '@/lib/data'
import { taskSchema } from '@/lib/schema'
import type { Task } from '@/lib/schema'
import {DotsHorizontalIcon} from '@radix-icons/vue'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableRowActionsProps {
	row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => taskSchema.parse(props.row.original))

console.log(props.row);


</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
		<Button
			variant="ghost"
			class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
		>
			<DotsHorizontalIcon class="h-4 w-4" />
			<span class="sr-only">Open menu</span>
		</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="w-[160px]">
		<DropdownMenuItem>Изменить</DropdownMenuItem>
		<DropdownMenuItem>Сделать копию</DropdownMenuItem>
		<DropdownMenuItem>Избранное</DropdownMenuItem>
		<DropdownMenuSeparator />
		<!-- TODO Сделать смену приоритета для админов -->
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>Приоритет</DropdownMenuSubTrigger>
			<DropdownMenuSubContent>
			<DropdownMenuRadioGroup :value="props.row.priority">
				<DropdownMenuRadioItem v-for="priority in priorities" :key="priority.value" :value="priority.value">
					{{ priority.label }}
				</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
		<DropdownMenuSeparator />
		<DropdownMenuItem>
			Удалить
		</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
