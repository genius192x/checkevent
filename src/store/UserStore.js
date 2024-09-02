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
    localStorage.setItem('curToken', userToken.value)
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
      .catch((error) => {
      console.log(error);
    })
  }


  function setUser(data) {
    userData.value = data
    localStorage.setItem('curUser', JSON.stringify(userData.value))

    isLoaded.value = false
    useGlobalStore().isAuth = true

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
      .post('https://6bccdedf-dcf6-42bd-b1b6-ee13ec818593.mock.pstmn.io/register', {
        "first_name" : data.name,
        "last_name" : data.surname,
        "email": data.email,
        "password": data.password,
      })
      .then((response) =>
        setUserTokens(response.data)
    );
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
	}


	return {userData, createUser, logout, authorization, isLoaded}
})