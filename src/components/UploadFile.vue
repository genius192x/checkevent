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

const props = defineProps<{
  images: object,
}>()

let images = ref([])

const emit = defineEmits(['submit'])

function handleFileUpload(event) {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      images.value.push({
        file: files[i],
        name: files[i].name,
        previewUrl: e.target.result
      });
    };
    reader.readAsDataURL(files[i]);
    // console.log(files[i]);
  }
}

function removeImage(index) {
  images.value.splice(index, 1);
}

function onSubmit() {
  // console.log('отправлено', images),
  emit('submit', images)
}
// onMounted(() => {
// 	if (props.images) {
// 		images.value = props.images
// 	}
// }),
</script>

<template>
  <form class="space-y-6 pt-6" @submit.prevent="onSubmit">
    <FormField name="file">
      <FormItem class="relative flex items-center space-y-0">
        <FormLabel>Файлы с результатом</FormLabel>
        <FormControl class="relative mt-0">
          <Button class="bg-transparent border text-current w-full mt-0">
            <PlusIcon />
          </Button>

          <Input id="picture" type="file" @change="handleFileUpload" multiple
            class="opacity-0 absolute top-0 left-0 w-full h-full" />
        </FormControl>
      </FormItem>
    </FormField>
    <div @touchstart.stop class="flex gap-1 flex-wrap pb-4" v-if="images.length">
      <div v-for="(image, index) in images" :key="index" class=" flex justify-between items-center w-full gap-3">
        <div class="space-x-2 flex overflow-hidden items-center">
          <img :src="image.previewUrl" alt="Preview" class="profile-pic  rounded-md w-12 h-12 object-contain">
          <div class="truncate">{{ image.name }}</div>
        </div>
        <button class="border p-2 rounded-md backdrop-blur-sm" @click="removeImage(index)">
          <TrashIcon class="w-30 text-red-700" />
        </button>
      </div>
    </div>
    <Button type="submit" class="w-full" v-if="images.length">
      Отправить
    </Button>
  </form>
</template>