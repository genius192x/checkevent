<script setup>
import { cn } from "@/lib/utils";
import { ref } from "vue";
const props = defineProps({
	class: { type: null, required: false },
	isRow:{type: Boolean, required: false}
});
import { CaretSortIcon } from '@radix-icons/vue'

import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { boolean } from "zod";
const isOpen = ref(false)
</script>

<template>
	<tr class="w-[350px] space-y-2 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" as="tr">
		<slot />
	</tr>
	<!-- <CollapsibleContent class="space-y-2 w-full" :as-child="true" v-if="isRow" colspan="6">
		<div class="w-full">
			<div class="rounded-md border px-4 py-3 font-mono text-sm">
				@radix-ui/colors
			</div>
			<div class="rounded-md border px-4 py-3 font-mono text-sm">
				@stitches/react
			</div>
		</div>
	</CollapsibleContent> -->
</template>
