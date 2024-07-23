<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import type { Component } from 'vue'
import { computed } from 'vue'
import type { Task } from '@/lib/schema'
import {PlusCircledIcon} from '@radix-icons/vue'
import {CheckIcon} from '@radix-icons/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useListStore } from '@/store/ListsStore'
const listStore = useListStore()
interface DataTableFacetedFilter {
  value?: string
	title?: string
	options: {
		label: string
		value: string
		icon?: Component
  }[]
  checked: any[]
}
defineEmits(['setFilter'])
const props = defineProps<DataTableFacetedFilter>()

// const facets = computed(() => props.column?.getFacetedUniqueValues())
// const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]))
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
		<Button variant="outline" size="sm" class="h-8 border-dashed">
			<PlusCircledIcon class="mr-2 h-4 w-4" />
			{{ title }}
			<template v-if="props.checked.length > 0">
			<Separator orientation="vertical" class="mx-2 h-4" />
			<Badge
				variant="secondary"
				class="rounded-sm px-1 font-normal lg:hidden"
			>
				{{ props.checked.length }}
			</Badge>
			<div class="hidden space-x-1 lg:flex">
				<Badge
				v-if="props.checked.length > 2"
				variant="secondary"
				class="rounded-sm px-1 font-normal"
				>
				{{ props.checked.length }} selected
				</Badge>

				<template v-else>
				<!-- <Badge
					v-for="option in options
					.filter((option) => selectedValues.has(option.value))"
					:key="option.value"
					variant="secondary"
					class="rounded-sm px-1 font-normal"
				>
					{{ option.label }}
				</Badge> -->
				</template>
			</div>
			</template>
		</Button>
		</PopoverTrigger>
		<PopoverContent class="w-[200px] p-0" align="start">
		<Command
			:filter-function="(list: DataTableFacetedFilter['options'], term) => list.filter(i => i.label.toLowerCase()?.includes(term)) "
		>
			<CommandList>
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandGroup>
				<CommandItem
				v-for="option in props.options"
				:key="option.value"
				:value="option"
				@select="(e) => {
          console.log(e.detail.value);

				  const isSelected = listStore.filters[0].checked.filter(item => item.label == e.detail.value.label);
          console.log('isSelected', isSelected);

				  if (isSelected.length) {
				    // selectedValues.delete(option.value)
				    // $emit('setFilter', selectedValues)
            listStore.filters[0].checked = listStore.filters[0].checked.filter(item => item.value !== e.detail.value[0].value)
				  }
				  else {
				    listStore.filters[0].checked.push(e.detail.value)
            console.log(listStore.filters);

				  }
				  // const filterValues = Array.from(selectedValues)
				  // $emit('setFilter', filterValues)
				  // column?.setFilterValue(
				  //   filterValues.length ? filterValues : undefined,
				  // )
				}"
				>
				<div
					:class="cn(
					'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
					props.checked.includes(option.value)
						? 'bg-primary text-primary-foreground'
						: 'opacity-50 [&_svg]:invisible',
					)"
				>
					<CheckIcon :class="cn('h-4 w-4')" />
				</div>
				<component :is="option.icon" v-if="option.icon" class="mr-2 h-4 w-4 text-muted-foreground" />
				<span>{{ option.label }}</span>
				<!-- <span v-if="facets?.get(option.value)" class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
					{{ facets.get(option.value) }}
				</span> -->
				</CommandItem>
			</CommandGroup>

			<!-- <template v-if="selectedValues.size > 0">
				<CommandSeparator />
				<CommandGroup>
				<CommandItem
					:value="{ label: 'Clear filters' }"
					class="justify-center text-center"
					@select="column?.setFilterValue(undefined)"
				>
					Clear filters
				</CommandItem>
				</CommandGroup>
			</template> -->
			</CommandList>
		</Command>
		</PopoverContent>
	</Popover>
</template>
