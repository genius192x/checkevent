<script setup  >
import { Input } from '@/components/ui/input'
import {ref} from 'vue'


const value = ref('')
</script>

<template>
	<div>
		<Input
		type="search"
    v-model="value"
		placeholder="Поиск..."
		class="md:w-[300px] lg:w-[350px]"
    @input="$emit('changeQuery', value)"
		/>
	</div>
</template>
