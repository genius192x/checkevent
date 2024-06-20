import { defineStore } from 'pinia'
import {ref} from "vue";

export const useListStore = defineStore('listStore', () => {
    const list = ref([
        {
            title: 'Матч ЦСКА-СГАУ-Саратов',
            description: 'Список задач по организации/проведению матча',
            type: 'Гандбол Мужской',
            lastApdate: '19.06.2023',
            id: '1',
        },
        {
            title: 'Корпоратив женской команды',
            description: 'Список задач по организации/проведению корпоратива',
            type: 'Гандбол Женский',
            lastApdate: '15.05.2023',
            id: '2',
        },
        {
            title: 'Матч Зенит-ЦСКА',
            description: 'Список задач по организации/проведению матча',
            type: 'Гандбол Мужской',
            lastApdate: '10.06.2023',
            id: '3',
        },
        {
            title: 'Матч ЦСКА-Томь',
            description: 'Список задач по организации/проведению матча',
            type: 'Гандбол Мужской',
            lastApdate: '19.01.2023',
            id: '4',
        },
    ])
    function addItem(item){
        list.value.push(item)
    }
    return { addItem, list}
})