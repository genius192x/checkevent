import { defineStore } from 'pinia'
import { ref } from "vue";
// import { useToast } from '@/components/ui/toast/use-toast'
// const { toast } = useToast()
import {
	toast
} from 'vue-sonner'
import axios from 'axios'
import tasks from '@/lib/tasks.json'
import { priorities } from '@/lib/data.ts'
import { useGlobalStore } from './GlobalStore';
import {
	useUserStore
} from './UserStore';
const myTasks = tasks

export const useListStore = defineStore('listStore', () => {
	let list = ref([]);
	const currentTasks = ref([])

	getLists()

	function getFullParticipants(participants) {
		const result = ref([])
		const globalStore = useGlobalStore()
		participants.forEach(participant => {
			globalStore.defaultUsers.filter(user => {
				if (user.email == participant) {
					result.value.push(user)
				}
			})
		})
		return result
	}

	function getFullUserData(email) {
		const result = ref({})
		const globalStore = useGlobalStore()
		globalStore.defaultUsers.filter(user => {
			if (user.email == email) {
				result.value = user;
			}
		})
		return result
	}

	// function updateListItem(values, id) {
	// 	let index = list.value.findIndex(item => item.id === values.id)
	// 	// let changedItem = list.value.filter(item => item.id == id)
	// 	let emails = ref([])
	// 	values.participants.forEach(participant => {
	// 		emails.value.push(participant)
	// 	})
	// 	list.value[index].participants = getFullParticipants(emails.value).value
	// 	list.value[index].title = values.title
	// 	list.value[index].description = values.description
	// 	list.value[index].lastUpdate = values.lastUpdate
	// 	setListToStore()
	// }

	function updateTaskItem(values, listId, taskId) {
		let taskIndex = list.value[listId - 1].tasks.findIndex(item => item.id === taskId)
		list.value[listId - 1].tasks[taskIndex].title = values.title
		list.value[listId - 1].tasks[taskIndex].description = values.description
		list.value[listId - 1].tasks[taskIndex].deadLine = values.deadLine
		list.value[listId - 1].tasks[taskIndex].priority = values.priority
		list.value[listId - 1].tasks[taskIndex].responsible = getFullUserData(values.responsible)
		setListToStore()
	}

	function addList(item) {
		item.id = Date.now();
		item.isArchived = false;
		item.tasks = [];
		item.participants = getFullParticipants(item.participants)
		// list.value.unshift(item)
		createList(item)
		// setListToStore()
	}

	function addTask(item, listId) {
		let curList = list.value.find(({ id }) => id == listId);
		item.status = 'todo';
		item.isDone = false;
		item.messages = [];
		curList.tasks.unshift(item);
		item.responsible = getFullUserData(item.responsible)
		setListToStore()
	}

	function deleteTask(listId, task) {
		let curList = list.value.find(({ id }) => id == listId);
		let taskIndex = curList.tasks.findIndex(function (element) {
			return element.id == task.id;
		})
		curList.tasks.splice(taskIndex, 1)
		setListToStore()
		toast(`Задача "${task.title}" удалена`);
	}

	function copyList(data) {
		data.tasks.forEach(task => {
			task.isDone = false
		})
		data.isArchived = false
		data.id = list.value.length + 1;
		list.value.unshift(data)
		toast(`Создана копия листа ${data.title}`);
		setListToStore()
		// updateList()
	}

	function setCurrDataForm(dataForm) {
		const data = JSON.stringify(dataForm)
		currData.value = JSON.parse(data)
	}

	function activeLists() {
		return list.value.filter(item => item.isArchived === false)
	}

	function archiveLists() {
		return list.value.filter(item => item.isArchived === true)
	}

	function changeStatus(listId, taskId) {
		list.value.forEach(list => {
			if (list.id == listId) {
				list.tasks.forEach(task => {
					if (task.id == taskId) {
						task.isDone = !task.isDone
						setListToStore()
					}
				})
			}
		})
	}

	function updateMessage(id, value) {
		list.value.forEach(list => {
			list.tasks.forEach(task => {
				if (task.id === id) {
					console.log(task.id, id, value);
					task.messages.push(value)
				}
			});
			// list.tasks.find(task=> task.id === id).messages.push(value)
			setListToStore()
		})
	}

	function setListToStore() {
		localStorage.setItem('lists', JSON.stringify(list.value));
	}


	function getItemById(id) {
		return list.value.find(item=>item.id == id)
	}

	//========================================================================================================================================================
	async function getNewToken() {
		const userStore = useUserStore()
		const res = await axios.post('https://chkevent.ru:8080/api/token/refresh', {
				"refresh": userStore.userToken.refresh
			}, {
				headers: {
					'Authorization': `Bearer ${userStore.userToken.access}`
				}
			})
			.then((response) =>
				userStore.setUserTokens(response.data),
				getLists()
			)
			.catch((error) => {
				console.log(error);
			})
	}
	async function getLists() {
		const userStore = useUserStore()
		const res = await axios.get('https://chkevent.ru:8080/api/checklists',
			{
				headers: {
					'Authorization': `Bearer ${userStore.userToken.access}`
				}
			}
		)
		.then((response) => {
			console.log('lists response', response.data.results),
			list.value = response.data.results || []
		})
			.catch((error) => {
				if (error.response.status === 401) {
					console.log('i will take a new token');
					getNewToken()
				}
				else {
					console.log(error);
				}
		})
	}
	async function getTasks(id) {
		const userStore = useUserStore()
		const res = await axios.get(`https://chkevent.ru:8080/api/checklists/${id}/tasks`,
			{
				headers: {
					'Authorization': `Bearer ${userStore.userToken.access}`
				}
			}
		)
			.then((response) => {
			currentTasks.value = response.data.results
		})
			.catch((error) => {
			if (error.response.status === 401) {
				getNewToken()
			} else {
				console.log(error);
			}
		})
	}
	async function createList(data) {
		const userStore = useUserStore()
		const res = await axios.post('https://chkevent.ru:8080/api/checklists', {
			"title": data.title,
			"description": data.description,
			"deadline": data.deadline
		},
		{
			headers: {
				'Authorization': `Bearer ${userStore.userToken.access}`
			}
		})
		.then((response) =>
			console.log('Created!'),
			getLists()
		)
		.catch((error) => {
			console.log(error);
		})
	}
	async function deleteList(id) {
		const userStore = useUserStore()
		const res = await axios.delete(`https://chkevent.ru:8080/api/checklists/${id}`, {
			headers: {
				'Authorization': `Bearer ${userStore.userToken.access}`
			}
		})
		.then((response) =>
			toast(`Лист перемещен в архив`),
			getLists()
		)
		.catch((error) => {
			console.log(error);
		})
	}
	async function updateListItem(data, id) {
		const userStore = useUserStore()
		const res = await axios.patch(`https://chkevent.ru:8080/api/checklists/${id}`, {
			"title": data.title,
			"description": data.description,
			"deadline": data.deadline
		}, {
			headers: {
				'Authorization': `Bearer ${userStore.userToken.access}`
			}
		})
			.then(function (response) {
				toast(`Информация о листе изменена`)
				getLists()
			}
		)
		.catch((error) => {
			console.log(error);
		})
	}
	async function archiveListItem(id) {
		const userStore = useUserStore()
		const res = await axios.patch(`https://chkevent.ru:8080/api/checklists/${id}`, {
			"archived_at": new Date(),
		}, {
			headers: {
				'Authorization': `Bearer ${userStore.userToken.access}`
			}
		})
		.then(function (response) {
			console.log(response.data)
			getLists()
		}
		)
		.catch((error) => {
			if (error.response.status === 401) {
				getNewToken()
			} else {
				console.log(error);
			}
		})
	}
	async function backupListItem(id) {
		const userStore = useUserStore()
		const res = await axios.patch(`https://chkevent.ru:8080/api/checklists/${id}`, {
				"archived_at": null,
			}, {
				headers: {
					'Authorization': `Bearer ${userStore.userToken.access}`
				}
			})
			.then(function(response) {
				console.log(response.data)
				getLists()
			}
			)
			.catch((error) => {
				if (error.response.status === 401) {
					getNewToken()
				} else {
					console.log(error);
				}
			})
	}
	return {
		list,
		currentTasks,
		addList,
		getItemById,
		archiveListItem,
		backupListItem,
		deleteList,
		deleteTask,
		addTask,
		updateListItem,
		updateTaskItem,
		changeStatus,
		updateMessage,
		activeLists,
		archiveLists,
		copyList,
		setCurrDataForm,
		getLists,
		getTasks,
		createList,
	}
})