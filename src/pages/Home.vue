<script setup lang="ts">
import DateRangePicker from '@/components/DateRangePicker.vue'
import RecentSales from '@/components/RecentSales.vue'
import ListCard from '@/components/ListCard.vue'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
const events = [
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
]
const eventsExpired = [
  {
    title: 'Матч ЦСКА-Томь',
    description: 'Список задач по организации/проведению матча',
    type: 'Гандбол Мужской',
    lastApdate: '19.01.2023',
    id: '4',
  },
]
</script>

<template>
    <div class="flex-1 space-y-4 p-2 pt-6 md:p-8">
		<div class="flex justify-between space-y-3 flex-col md:flex-row md:items-center md:space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">
				Список мероприятий
			</h2>
			<div class="flex items-center gap-2 flex-wrap md:space-x-2">
        <DateRangePicker/>
<!--				<Button class="m-0" @click="() => {-->
<!--          toast('Скачали статистику за указанный период', {-->
<!--            description: '20 янв. 2023 г. - 9 февр. 2023 г.',-->
<!--            action: {-->
<!--              label: 'Ок',-->
<!--              onClick: () => console.log('Ок'),-->
<!--            },-->
<!--          })-->
<!--        }">Скачать</Button>-->
        <Toaster />
			</div>
		</div>
		<Tabs default-value="active" class="space-y-1 md:space-y-4 overflow-hidden">
			<TabsList class="overflow-auto">
				<TabsTrigger value="active">
					Активные
				</TabsTrigger>
				<TabsTrigger value="archive" >
					Архив
				</TabsTrigger>
			</TabsList>
			<TabsContent value="active" class="space-y-4">
        <div v-for="item in events" :key="item.id">
          <ListCard
              :item="item"
          />
        </div>
			</TabsContent>
			<TabsContent value="archive" class="space-y-4">
        <div v-for="item in eventsExpired" :key="item.id">
          <ListCard
              :item="item"
          />
        </div>
			</TabsContent>
		</Tabs>
	</div>
</template>