import { defineStore } from 'pinia'
import { ref } from "vue";
// import { useToast } from '@/components/ui/toast/use-toast'
// const { toast } = useToast()
import {
  toast
} from 'vue-sonner'

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
    console.log(item);
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
    toast(`Лист ${deletingItem.title} перемещен в архив`);
    setListToStore()
    updateList()
  }

  function copyList(data) {
    data.tasks.forEach(task => {
      task.isDone = false
    })
    data.isArchived = false
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
    addTask,
    filters,
    changeStatus,
    updateMessage,
    activeLists,
    archiveLists,
    backupList,
    copyList
  }
})