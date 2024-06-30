<script setup lang="ts">
import { ref,} from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

let previewImage = ref(null);
function uploadImage(e) {
	const image = e.target.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onload = e => {
		previewImage.value = e.target.result;
		console.log(e);
	};
}
</script>

<template>
	<div class="grid w-full max-w-80 items-center gap-1.5 1 p-2 md:p-4">
		<Label for="picture">Файлы с результатом</Label>
		<Input id="picture" type="file" @change="uploadImage" enctype="multipart/form-data" multiple/>
	</div>
	<div v-if="previewImage" class="flex max-w-24 max-h-24  p-2 md:p-4 border rounded overflow-hidden">
		<img :src="previewImage" class="uploading-image object-cover" />
	</div>
</template>
