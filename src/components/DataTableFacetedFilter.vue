<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import type { Component } from 'vue'
import { computed, ref } from 'vue'
import type { Task } from '@/lib/schema'
import {PlusCircledIcon} from '@radix-icons/vue'
import {CheckIcon} from '@radix-icons/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useListStore } from '@/store/ListsStore'
import { boolean } from 'zod'
const listStore = useListStore()
interface DataTableFacetedFilter {
  value?: string
  title?: string
  options: {
    checked?: boolean
		label: string
		value: string
		icon?: Component
  }[]
  checked: any[]
}


defineEmits(['setFilter'])
const props = defineProps<DataTableFacetedFilter>()

function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) { return text_forms[2]; }
  if (n1 > 1 && n1 < 5) { return text_forms[1]; }
  if (n1 == 1) { return text_forms[0]; }
  return text_forms[2];
}
const filterOptions = props.options.map((element) => element)
console.log(filterOptions);

const isChecked = function (item) {
  let value = false
  if (filterOptions.filter((filter) => filter.checked == item.checked)){
    value = true
  }

  return value
}

const clearFilters = function () {
  listStore.filters[0].checked = []
  filterOptions.forEach(option => {
    option.checked = false

  })
}

const selectedValues = ref([])

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
          v-if="props.checked.length > 0"
          variant="secondary"
          class="rounded-sm px-1 font-normal"
          >
          {{ props.checked.length }} {{ declOfNum(props.checked.length, ['выбран', 'выбраны']) }}
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
				v-for="option in filterOptions"
				:key="option.value"
				:value="option"
				@select="(e) => {
				  const isSelected = listStore.filters[0].checked.find(item => item.label == e.detail.value.label);
          if(!isSelected){
            option.checked = true
            listStore.filters[0].checked.push(e.detail.value)
            // console.log('Add filter item', listStore.filters[0].checked);
            // $emit('setFilter', filterOptions)
          } else {
            option.checked = false
            const filteredFilters = listStore.filters[0].checked.filter((filter) => filter.label !== e.detail.value.label);
            listStore.filters[0].checked = filteredFilters
            // console.log('Delete filter item', listStore.filters[0].checked);
            // $emit('setFilter', filterOptions)
          }
				}"
				>

          <Checkbox class="mr-2" :checked="option.checked"/>
          <component :is="option.icon" v-if="option.icon" class="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{{ option.label }}</span>

				</CommandItem>
			</CommandGroup>

			<template v-if="props.checked.length > 0">
				<CommandSeparator />
				<CommandGroup>
				<CommandItem
					:value="{ label: 'Clear filters' }"
					class="justify-center text-center"
          @click="clearFilters"
				>
          Очистить фильтры
				</CommandItem>
				</CommandGroup>
			</template>
			</CommandList>
		</Command>
		</PopoverContent>
	</Popover>
</template>
