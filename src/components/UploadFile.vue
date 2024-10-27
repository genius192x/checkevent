<script setup lang="ts">
import { computed, onMounted, ref, watch, } from 'vue'
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
import Separator from '@/components/ui/separator/Separator.vue'

const props = defineProps<{
	files?: object,
	limit?:  number,
	type?: string,
}>()

let files = ref([])

const emit = defineEmits(['submit'])

function handleFileUpload(event) {
	const items = event.target.files;
	for (let i = 0; i < items.length; i++) {
		const reader = new FileReader();
		console.log(items[i]);

		reader.onload = (e) => {
			if (props.type) {
				if (items[i].type === props.type) {
					files.value.push({
						file: items[i],
						name: items[i].name,
						previewUrl: e.target.result
					});
				}
			} else {
				files.value.push({
					file: items[i],
					name: items[i].name,
					previewUrl: e.target.result
				});
			}
		};
		reader.readAsDataURL(items[i]);
	}
}

function removeImage(index) {
	files.value.splice(index, 1);
}

function onSubmit() {
	emit('submit', files)
}

</script>

<template>
	<form class="space-y-2" @submit.prevent="onSubmit">
		<div class="flex gap-4">
			<div @touchstart.stop class="flex flex-wrap gap-2">
				<div v-for="(image, index) in files" :key="index" class=" flex justify-between items-center">
					<div class="space-x-2 flex overflow-hidden items-center bg-transparent border text-current p-1 h-10 justify-center rounded-lg">
						<div class="" v-if="props.type === 'application/vnd.ms-excel'">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox = "0 0 24 24" fill = "none" > <path fill-rule="evenodd" clip-rule="evenodd" d = "M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V9C21 9.55228 20.5523 10 20 10C19.4477 10 19 9.55228 19 9V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H7C7.55228 21 8 21.4477 8 22C8 22.5523 7.55228 23 7 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM19 12C19.5523 12 20 12.4477 20 13V19H23C23.5523 19 24 19.4477 24 20C24 20.5523 23.5523 21 23 21H19C18.4477 21 18 20.5523 18 20V13C18 12.4477 18.4477 12 19 12ZM11.8137 12.4188C11.4927 11.9693 10.8682 11.8653 10.4188 12.1863C9.96935 12.5073 9.86526 13.1318 10.1863 13.5812L12.2711 16.5L10.1863 19.4188C9.86526 19.8682 9.96935 20.4927 10.4188 20.8137C10.8682 21.1347 11.4927 21.0307 11.8137 20.5812L13.5 18.2205L15.1863 20.5812C15.5073 21.0307 16.1318 21.1347 16.5812 20.8137C17.0307 20.4927 17.1347 19.8682 16.8137 19.4188L14.7289 16.5L16.8137 13.5812C17.1347 13.1318 17.0307 12.5073 16.5812 12.1863C16.1318 11.8653 15.5073 11.9693 15.1863 12.4188L13.5 14.7795L11.8137 12.4188Z" fill = "currentColor" /> </svg>
						</div>
						<img v-else :src="image.previewUrl" alt="Preview" class="profile-pic  rounded-md w-12 h-8 object-contain">
						<Separator orientation="vertical"/>
						<button class="p-2 rounded-md backdrop-blur-sm  hover:bg-muted" @click="removeImage(index)">
							<TrashIcon class="w-30 text-red-700" />
						</button>
					</div>
				</div>
				<FormField name="file">
					<FormItem class="relative flex gap-2 group">
						<FormControl class="relative mt-0 ">
							<Button v-if="!props.limit || !props.limit >= files.length" type="button" class="bg-transparent group-hover:bg-muted border text-current w-16 space-y-0 cursor-pointer">
								<PlusIcon />
							</Button>

							<Input v-if="!props.limit" id="picture" type="file" @change="handleFileUpload" multiple
								class="input opacity-0 absolute top-0 left-0 w-16 cursor-pointer" />
							<Input v-else id="picture" type="file" @change="handleFileUpload" :accept="props.type"
								class="input opacity-0 absolute top-0 left-0 w-16 cursor-pointer" />

						</FormControl>
					</FormItem>
				</FormField>
			</div>
		</div>
	</form>
</template>

