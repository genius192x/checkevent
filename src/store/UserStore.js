import { defineStore } from 'pinia'
import {ref} from "vue";

export const useUserStore = defineStore('userStore', () => {
	const userData = ref({})

	function createUser(data) {
		userData.value = data
	}
	return {userData, createUser}
})