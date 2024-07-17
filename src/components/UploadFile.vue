<script setup lang="ts">
import { computed, ref, watch,} from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusIcon, TrashIcon } from '@radix-icons/vue'
import { Label } from '@/components/ui/label'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'


let images = ref([])

function handleFileUpload(event) {
	const files = event.target.files;
	for (let i = 0; i < files.length; i++) {
		const reader = new FileReader();
		reader.onload = (e) => {
			images.value.push({
				file: files[i],
				previewUrl: e.target.result
			});
		};
		reader.readAsDataURL(files[i]);
	}
}

function removeImage(index) {
	images.value.splice(index, 1);
}
</script>

<template>
	<form class="space-y-6 py-6">
		<FormField name="file">
			<FormItem class="relative">
				<FormLabel>Файлы с результатом</FormLabel>
				<FormControl >
					<Button class="absolute bottom-0 left-0 bg-transparent border text-current w-full">
						<PlusIcon/>
					</Button>

					<Input
						id="picture"
						type="file"
						@change="handleFileUpload"
						multiple
						class="opacity-0"/>
				</FormControl>
			</FormItem>
		</FormField>
	</form>
	<div class="flex gap-4 flex-wrap pb-4">
		<div v-for="(image, index) in images" :key="index" class=" flex justify-between items-center relative ">
			<img :src="image.previewUrl" alt="Preview" class="profile-pic  rounded-md max-w-[150px] max-h-[100px] object-contain">
			<button class="border p-2 rounded-md absolute top-0 right-0 backdrop-blur-sm" @click="removeImage(index)"><TrashIcon class="w-30"/></button>
		</div>
	</div>
</template>
