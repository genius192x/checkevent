import { defineStore } from 'pinia'
import { ref } from "vue";
import { useGlobalStore } from '@/store/GlobalStore';
import router from '@/router';
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

export const useUserStore = defineStore('userStore', () => {
	const userData = ref({})

	if (localStorage.getItem('curUser') !== null) {
		userData.value = JSON.parse(localStorage.getItem("curUser") || {})
		useGlobalStore().isAuth = true
		// router.push('/')
	} else {
		console.log('Нет актуального пользователя')
	}


	function setUserInfo() {
		localStorage.setItem('curUser',JSON.stringify(userData.value));
	}
	function createUser(data) {
		userData.value = data
		setUserInfo()
	}


	function logout() {
		userData.value = {}
		useGlobalStore().isAuth = false
		localStorage.removeItem('curUser')
		router.push('/authorization')
	}


	function authorization(email, password) {
		const users = ref([])
		users.value = JSON.parse(localStorage.getItem("users") || [])
		if (users) {
			const user = ref({})
			user.value = users.value.find(item => item.email === email)

			if (user.value) {
				console.log('email есть');
				if (user.value.password == password) {
					console.log('пароль есть');
					userData.value = user.value
					useGlobalStore().isAuth = true
					setUserInfo()
					router.push('/')
					toast({
						description: `С возвращением ${userData.value.name}!`,
					});
				} else {
					toast({
						description: `Неверный пароль, попробуй еще раз`,
					});
				}
			} else {
				toast({
					description: `Не нашли пользователя с таким email :(`,
				});
			}
		}
	}


	return {userData, createUser, logout, authorization}
})