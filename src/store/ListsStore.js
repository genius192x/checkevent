import { defineStore } from 'pinia'
import {ref} from "vue";
import tasks from '@/lib/tasks.json'
const myTasks = tasks

export const useListStore = defineStore('listStore', () => {
    const list = myTasks
    function addItem(item){
        list.value.unshift(item)
    }
    function getItemById(id){
        return list.find(item=>item.id === id)
    }
    return { addItem, list, getItemById}
})