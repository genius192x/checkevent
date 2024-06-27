<script setup>
import { cn } from "@/lib/utils";
import { ref } from "vue";
const props = defineProps({
  class: { type: null, required: false },
});
import { CaretSortIcon } from '@radix-icons/vue'

import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'

const isOpen = ref(false)
</script>

<template>
	<Collapsible
		v-model:open="isOpen"
		class="w-[350px] space-y-2 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
		as="tr"
		>
		<slot />

	</Collapsible>
</template>
