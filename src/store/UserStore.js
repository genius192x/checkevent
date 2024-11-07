import { defineStore } from 'pinia'
import { ref } from "vue";
import { useGlobalStore } from '@/store/GlobalStore';
import router from '@/router';
import { useToast } from '@/components/ui/toast/use-toast'
import axios from 'axios'
import { rudderAnalytics } from '@/lib/rudderAnalytics.js'
import {
  toast
} from 'vue-sonner'



export const useUserStore = defineStore('userStore', () => {
  const userData = ref({})
  const userToken = ref(JSON.parse(localStorage.getItem('curToken')) || '')
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
		userToken.value = data
		let token = JSON.stringify(userToken.value)
    localStorage.setItem('curToken', token)
    userTokenRefresh.value = data.refresh
    getUserInfo(userToken.value)
  }



  function getUserInfo(token) {
    axios
			.get('https://chkevent.ru:8080/api/me', {
				headers: {
					'Authorization': `Bearer ${token.access}`
				},
      })
      .then((response) =>
        setUser(response.data)
			)
      .catch((error) => {
				console.log(error);
				isLoaded.value = false
    })
  }


  function setUser(data) {
    userData.value = data
    localStorage.setItem('curUser', JSON.stringify(userData.value))

    isLoaded.value = false
    useGlobalStore().isAuth = true
		toast(`С возвращением!`);
    rudderAnalytics.identify(
      userToken.value, {
      firstName: userData.value.first_name,
      lastName: userData.value.last_name,
      email: userData.value.email,
    },
      () => {
        console.log("Identify event successfully submitted to the RudderStack SDK.");
      }
    );

    router.push('/')
  }

  function createUser(data) {
		isLoaded.value = true
		axios
			.post('https://chkevent.ru:8080/api/register', {
				"first_name": data.name,
				"last_name": data.surname,
				"email": data.email,
				"password": data.password
			})
				.then((response) =>
					setUserTokens(response.data.tokens),
					//TODO Убери это!
					setTimeout(() => {
						isLoaded.value = false
					}, 500)
				)
			.catch((error) => {
					console.log(error);
				if (error.response.data.email) {
						toast(`Данный email уже используется`);
						isLoaded.value = false
						}
					})

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
			.post('https://chkevent.ru:8080/api/token', {
				"email": email,
				"password": password
			})
				.then((response) =>
					// console.log(response)
					setUserTokens(response.data)
				)
				.catch((error) => {
					console.log(error);
					toast(`Проверьте правильность введенных данных`);
					isLoaded.value = false
				})
			}


	return {
		userData,
		createUser,
		logout,
		authorization,
		isLoaded,
		userToken
	}
})