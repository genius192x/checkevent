import axios from 'axios'

const API_URL = 'https://6bccdedf-dcf6-42bd-b1b6-ee13ec818593.mock.pstmn.io'
// let ACCESS_TOKEN = window.userAuth || import.meta.env.VITE_ACCESS_TOKEN
// const DADATA_API_KEY = '' || import.meta.env.VITE_DADATA_API_KEY
// const AXIOS_TIMEOUT = 999999 || import.meta.env.VITE_AXIOS_TIMEOUT

export const api = {
  /*
   * Собирает URL Запроса
   */
  buildUrl: (requestName) => {
    const urlBody = API_URL,
      path = [urlBody, requestName].join('/')

    return path
  },
  /**
   * Общие для всех типов пользователей запросы
   */
  getUserInfo: async (token) => {
    axios
      .get('https://6bccdedf-dcf6-42bd-b1b6-ee13ec818593.mock.pstmn.io/profile', {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
      return response.data.User[0]
    })
  },
}