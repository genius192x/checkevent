import { defineStore } from 'pinia'
import {ref} from "vue";

export const useGlobalStore = defineStore('globalStore', () => {
	const isSettingsOpen = ref(false)
	const isSheetOpen = ref(false)
	const isCreateListOpen = ref(false)
	const isAuth = ref(false)
	const usersList = ref([])

	const defaultUsers = ref([
		{
			name: 'Антон',
			surname: 'Зимин',
			email: 'zimin@mail.ru',
			password: 'zim123',
			avatar: '02.png',
			role: 'admin',
			admin: true,
		},
		{
			name: 'Настя',
			surname: 'Курбатова',
			email: 'kurbatova@mail.ru',
			password: 'kur123',
			avatar: '01.png',
			role: 'viewer',
		},
		{
			name: 'Сергей',
			surname: 'Моисеев',
			email: 'moiseev@mail.ru',
			password: 'moi123',
			avatar: '03.png',
			role: 'owner',
		},
		{
			name: 'Олег',
			surname: '',
			email: 'oleg@mail.ru',
			password: 'ole123',
			avatar: '04.png',
			role: 'viewer',
		},
		{
			name: 'Михаил',
			surname: 'Левченко',
			email: 'levchenko@mail.ru',
			password: 'lev123',
			avatar: '04.png',
			role: 'editor',
		},
	])
	if (localStorage.getItem('users') !== null) {
		console.log('пользователи есть');
	} else {
		updateUsersList()
	};

	function updateUsersList() {
		localStorage.setItem('users', JSON.stringify(defaultUsers.value));
	}

	return { isSettingsOpen, isSheetOpen, isAuth, usersList, defaultUsers, updateUsersList, isCreateListOpen}
})