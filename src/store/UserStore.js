import { defineStore } from 'pinia'
import { ref } from "vue";
import { useGlobalStore } from '@/store/GlobalStore';
import router from '@/router';

export const useUserStore = defineStore('userStore', () => {
	const userData = ref({})
	if (localStorage.getItem('curUser') !== null) {
		userData.value = JSON.parse(localStorage.getItem("curUser") || {})
		useGlobalStore().isAuth = true
		router.push('/')
	} else {
		console.log('Нет актуального пользователя')
	};

	function createUser(data) {
		userData.value = data
		localStorage.setItem('curUser',JSON.stringify(userData.value));
	}
	return {userData, createUser}
})