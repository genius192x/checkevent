<script setup>
import { computed } from "vue";
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaViewport,
} from "radix-vue";
import ScrollBar from "./ScrollBar.vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  type: { type: String, required: false },
  dir: { type: String, required: false },
  scrollHideDelay: { type: Number, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ScrollAreaRoot
    v-bind="delegatedProps"
		class="max-w-[100%]"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <ScrollAreaViewport class="h-full w-full rounded-[inherit] block ScrollAreaViewport">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<style>
.ScrollAreaViewport > div{
	display: block !important;
}
</style>
