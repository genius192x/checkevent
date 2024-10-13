<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed, ref } from 'vue'
import { labels } from '@/lib/data'
import { taskSchema } from '@/lib/schema'
import type { Task } from '@/lib/schema'
import { DotsHorizontalIcon } from '@radix-icons/vue'

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
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { useListStore } from '@/store/ListsStore'
import ChangeTask from '@/components/form/ChangeTask.vue'

const listStore=useListStore()
interface DataTableRowActionsProps {
	row: Row<Task>
	}
	const props = defineProps<DataTableRowActionsProps>()
	defineEmits(['openEdit', 'delete'])

	const url = window.location.href;
	const lastParam = url.split("/").slice(-1)[0];

	const task = computed(() => props.row.original)


	let side = 'bottom';
	if (window.innerWidth > 768) {
		side = 'right'
	}
	const isChangeOpen = ref(false)
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
		<DropdownMenuItem @click="$emit('openEdit')">Изменить</DropdownMenuItem>
		<Sheet :open="isChangeOpen">
			<!-- TODO v-if="userStore.userData.admin" верни на кнопку -->
			<SheetContent @close="isChangeOpen = !isChangeOpen" :side=side
			class="w-[100%] max-h-[80%] p-4 pb-4 rounded-t-xl md:w-[440px] sm:max-w-none md:max-h-none md:rounded-xl md:p-3 outline-0 md:m-3 h-auto">
			<SheetHeader>
				<SheetTitle>Редактирование листа</SheetTitle>
			</SheetHeader>
			<ChangeTask :item="task" @close="isChangeOpen = !isChangeOpen"/>
		</SheetContent>
	</Sheet>
	<!-- <DropdownMenuItem>Make a copy</DropdownMenuItem> -->
	<!-- <DropdownMenuItem>Favorite</DropdownMenuItem> -->
	<!-- <DropdownMenuSeparator /> -->
	<!-- <DropdownMenuSub>
		<DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
		<DropdownMenuSubContent>
			<DropdownMenuRadioGroup :value="task.label">
				<DropdownMenuRadioItem v-for="label in labels" :key="label.value" :value="label.value">
					{{ label.label }}
				</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
		</DropdownMenuSubContent>
	</DropdownMenuSub> -->
	<DropdownMenuSeparator />
	<DropdownMenuItem >
		Удалить
		<!-- <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> -->
	</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
</template>