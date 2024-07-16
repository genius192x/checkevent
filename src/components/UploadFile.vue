<script setup lang="ts">
import { computed, ref, watch,} from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-icons/vue'
import { Label } from '@/components/ui/label'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

let previewImage = ref(null);

let images = ref([])

function onFileChange(e) {
	let vm = this;

	var selectedFiles = e.target.files;
	for (let i = 0; i < selectedFiles.length; i++) {
		// console.log(selectedFiles[i]);
		images.value.push(selectedFiles[i]);
	}

	for (let i = 0; i < images.value.length; i++) {
		let reader = new FileReader();
		reader.onload = (e) => {

			images.value[i].src = ref(e.target.result)
			// console.log(images.value);
			// previewImage.value = e.target.result
			// console.log(e.target.result);
			// this.$refs.image[i].src = reader.result;
			// console.log(this.$refs.image[i].src);
		};

		reader.readAsDataURL(images.value[i]);
	}
}

function getImageValue(key) {

	// console.log(images.value[key].value);
	return images.value[key].value
}
watch(images.value, ()=> {
	console.log(images.value);

})
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
						@change="onFileChange"
						multiple
						class="opacity-0"/>
				</FormControl>
			</FormItem>
		</FormField>
		<!-- <Button type="submit">
			Submit
		</Button> -->
	</form>
	<div v-for="(image, key) in images" :key="key">
		<div>
			<img v-if="image.src" class="preview" :src="image.src.value" />
			{{ image.name }}
		</div>
	</div>
</template>
