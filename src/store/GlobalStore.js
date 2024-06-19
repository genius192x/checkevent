import { defineStore } from 'pinia'
import {ref} from "vue";

export const useGlobalStore = defineStore('globalStore', () => {
    let isSettingsOpen = ref(false)
    let isSheetOpen = false
    function setSettings(){
        console.log('change')
        this.isSettingsOpen = !this.isSettingsOpen
    }
    return { isSettingsOpen, isSheetOpen}
})