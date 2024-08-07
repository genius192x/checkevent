import { defineStore } from 'pinia'
import { ref } from "vue";
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
import tasks from '@/lib/tasks.json'
import {priorities} from '@/lib/data.ts'
const myTasks = tasks

export const useListStore = defineStore('listStore', () => {
  let list = ref([]);

  const filters = ref([
    {
      value: "proirity",
      label: 'Приоритет',
      options: priorities,
      checked: [],
      filtered: false,
    }
  ]);
  console.log(filters.value);
  list.value = myTasks


	updateList()


	if (localStorage.getItem('lists') !== null) {
		console.log('список есть');
	} else {
		console.log('списка нет, берем из файла')
		list.value = myTasks
		setListToStore()
	};


	function addList(item) {
		list.value.unshift(item)
		setListToStore()
	}

	function addTask(item, listId) {
		let curList = list.value.find(({ id }) => id == listId);
		curList.tasks.unshift(item)
		setListToStore()
	}


  function deleteList(id) {
    let deletingItem = getItemById(id)
    list.value = list.value.filter(el => el.id !== id);
		toast({
			description: `Лист ${deletingItem.title} успешно удален`,
		});
		setListToStore()
		updateList()
	}


	function updateList() {
		list.value = JSON.parse(localStorage.getItem("lists"))
	}


	function setListToStore() {
		localStorage.setItem('lists', JSON.stringify(list.value));
	}


	function getItemById(id){
		return list.value.find(item=>item.id == id)
	}


	return { addList, list, getItemById, deleteList, addTask, filters}
})