import { defineStore } from 'pinia'
import {ref} from "vue";

export const useGlobalStore = defineStore('globalStore', () => {
    const isSettingsOpen = ref(false)
	const isSheetOpen = ref(false)
	const isAuth = ref(false)
	const usersList = ref([])
    return { isSettingsOpen, isSheetOpen, isAuth, usersList}
})