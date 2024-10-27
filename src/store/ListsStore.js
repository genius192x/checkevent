import { defineStore } from 'pinia'
import { ref } from "vue";
// import { useToast } from '@/components/ui/toast/use-toast'
// const { toast } = useToast()
import {
	toast
} from 'vue-sonner'

import tasks from '@/lib/tasks.json'
import { priorities } from '@/lib/data.ts'
import { useGlobalStore } from './GlobalStore';
const myTasks = tasks

export const useListStore = defineStore('listStore', () => {
	let list = ref([]);
	const currData = ref('text');
	const filters = ref([
		{
			value: "proirity",
			label: 'Приоритет',
			options: priorities,
			checked: [],
			filtered: false,
		}
	]);
	list.value = myTasks

	updateList()


	if (localStorage.getItem('lists') !== null) {
		console.log('список есть');
	} else {
		console.log('списка нет, берем из файла')
		list.value = myTasks
		setListToStore()
	};

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

	function updateListItem(values, id) {
		let index = list.value.findIndex(item => item.id === values.id)
		// let changedItem = list.value.filter(item => item.id == id)
		let emails = ref([])
		values.participants.forEach(participant => {
			emails.value.push(participant)
		})
		list.value[index].participants = getFullParticipants(emails.value).value
		list.value[index].title = values.title
		list.value[index].description = values.description
		list.value[index].lastUpdate = values.lastUpdate
		setListToStore()
	}

	function updateTaskItem(values, listId, taskId) {
		let taskIndex = list.value[listId - 1].tasks.findIndex(item => item.id === taskId)
		list.value[listId - 1].tasks[taskIndex].title = values.title
		list.value[listId - 1].tasks[taskIndex].description = values.description
		list.value[listId - 1].tasks[taskIndex].deadLine = values.deadLine
		list.value[listId - 1].tasks[taskIndex].priority = values.priority
		list.value[listId - 1].tasks[taskIndex].responsible = getFullUserData(values.responsible)
		console.log(values);
		setListToStore()
		console.log(list.value[listId - 1].tasks[taskIndex]);
	}

	function addList(item) {
		item.id = list.value.length + 1;
		item.isArchived = false;
		item.tasks = [];
		item.participants = getFullParticipants(item.participants)
		list.value.unshift(item)
		setListToStore()
	}

	function addTask(item, listId) {
		let curList = list.value.find(({ id }) => id == listId);
		item.status = 'todo';
		item.isDone = false;
		item.messages = [];
		curList.tasks.unshift(item);
		item.responsible = getFullUserData(item.responsible)
		console.log('item', item);
		setListToStore()
	}


	function deleteList(id) {
		let deletingItem = getItemById(id)
		list.value.forEach(list => {
			if (list.id == deletingItem.id) {
				list.isArchived = true;
				list.tasks.forEach(task => {
					task.isDone = true
				})
			}
		})
		toast(`Лист "${deletingItem.title}" перемещен в архив`);
		setListToStore()
		updateList()
	}

	function deleteTask(listId, task) {
		let curList = list.value.find(({ id }) => id == listId);
		console.log(curList);
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
		updateList()
	}
	function backupList(id) {
		let backupItem = getItemById(id)
		list.value.forEach(list => {
			if (list.id == backupItem.id) {
				list.isArchived = false;
				list.tasks.forEach(task => {
					task.isDone = false
				})
			}
		})
		toast(`Лист ${backupItem.title} перемещен из архива`);
		setListToStore()
		updateList()

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
		console.log('updateMessage', id, value);
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


	function updateList() {
		list.value = JSON.parse(localStorage.getItem("lists"))
	}


	function setListToStore() {
		localStorage.setItem('lists', JSON.stringify(list.value));
	}


	function getItemById(id) {
		return list.value.find(item=>item.id == id)
	}


	return {
		addList,
		list,
		getItemById,
		deleteList,
		deleteTask,
		addTask,
		updateListItem,
		updateTaskItem,
		filters,
		changeStatus,
		updateMessage,
		activeLists,
		archiveLists,
		backupList,
		copyList,
		setCurrDataForm
	}
})