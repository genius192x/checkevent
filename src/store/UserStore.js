import { defineStore } from 'pinia'
import { ref } from "vue";
import { useGlobalStore } from '@/store/GlobalStore';
import router from '@/router';
import { useToast } from '@/components/ui/toast/use-toast'
import axios from 'axios'
const { toast } = useToast()


export const useUserStore = defineStore('userStore', () => {
  const userData = ref({})
  const userToken = ref('')
  const userTokenRefresh = ref('')
  const isLoaded = ref(false)


	if (localStorage.getItem('curUser') !== null) {
		userData.value = JSON.parse(localStorage.getItem("curUser") || {})
		useGlobalStore().isAuth = true
		// router.push('/')
	} else {
		console.log('Нет актуального пользователя')
	}


  function setUserTokens(data) {
    console.log(data)
    userToken.value = data.token
    userTokenRefresh.value = data.token
    getUserInfo(userToken.value)
		//
  }


  function getUserInfo(token) {
    axios
      .get('https://6bccdedf-dcf6-42bd-b1b6-ee13ec818593.mock.pstmn.io/profile', {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      .then((response) =>
        setUser(response.data.User[0])
      )
  }


  function setUser(data) {
    userData.value = data
    localStorage.setItem('curUser', JSON.stringify(userData.value))
    isLoaded.value = false
    useGlobalStore().isAuth = true
    router.push('/')
  }


	function createUser(data) {
		const globalStore = useGlobalStore()
		userData.value = data
		globalStore.defaultUsers.push(data)
		globalStore.updateUsersList()
		setUserInfo()
	}


	function logout() {
		userData.value = {}
		useGlobalStore().isAuth = false
		localStorage.removeItem('curUser')
		router.push('/authorization')
	}


  function authorization(email, password) {
    isLoaded.value = true
    axios
      .post('https://6bccdedf-dcf6-42bd-b1b6-ee13ec818593.mock.pstmn.io/auth', {
        email: email,
        password: password,
      })
      .then((response) =>
        setUserTokens(response.data)
    );
    // TODO тестовый код, можно будет удалить
		// const users = ref([])
		// users.value = JSON.parse(localStorage.getItem("users") || [])
		// if (users) {
		// 	const user = ref({})
		// 	user.value = users.value.find(item => item.email === email)

		// 	if (user.value) {
		// 		console.log('email есть');
		// 		if (user.value.password == password) {
		// 			console.log('пароль есть');
		// 			userData.value = user.value
		// 			useGlobalStore().isAuth = true
		// 			setUserInfo()
		// 			router.push('/')
		// 			toast({
		// 				description: `С возвращением ${userData.value.name}!`,
		// 			});
		// 		} else {
		// 			toast({
		// 				description: `Неверный пароль, попробуй еще раз`,
		// 			});
		// 		}
		// 	} else {
		// 		toast({
		// 			description: `Не нашли пользователя с таким email :(`,
		// 		});
		// 	}
		// }
	}


	return {userData, createUser, logout, authorization, isLoaded}
})