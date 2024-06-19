<script setup lang="ts">
import Overview from '@/components/Overview.vue'
import DateRangePicker from '@/components/DateRangePicker.vue'
import RecentSales from '@/components/RecentSales.vue'
import {onMounted} from "vue"
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'vue-sonner'
import { gsap } from 'gsap'

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
onMounted(() => {
  const nums = document.querySelectorAll(".anim-num");

  gsap.from(nums, {
    textContent: 0,
    duration: 2,
    snap: { textContent: 1 },
    // stagger: 1,
    // onUpdate: textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  });
});

</script>

<template>
    <div class="flex-1 space-y-4 p-2 pt-6 md:p-8">
		<div class="flex justify-between space-y-3 flex-col md:flex-row md:items-center md:space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">
				Статистика
			</h2>
			<div class="flex items-center gap-2 flex-wrap md:space-x-2">
        <DateRangePicker/>
				<Button class="m-0" @click="() => {
          toast('Скачали статистику за указанный период', {
            description: '20 янв. 2023 г. - 9 февр. 2023 г.',
            action: {
              label: 'Ок',
              onClick: () => console.log('Ок'),
            },
          })
        }">Скачать</Button>
        <Toaster />
			</div>
		</div>
		<Tabs default-value="overview" class="space-y-1 md:space-y-4 overflow-hidden">
			<TabsList class="overflow-auto">
				<TabsTrigger value="overview">
					Общее
				</TabsTrigger>
				<TabsTrigger value="analytics" >
					Финансы
				</TabsTrigger>
				<TabsTrigger value="reports" >
					Отчеты
				</TabsTrigger>
				<TabsTrigger value="notifications" >
					Уведомления
				</TabsTrigger>
			</TabsList>
			<TabsContent value="overview" class="space-y-4">
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">
								Общая выручка
							</CardTitle>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   class="h-4 w-4 text-muted-foreground">
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">
                <span class="anim-num">450231</span> ₽
							</div>
							<p class="text-xs text-muted-foreground">
								+20.1% относительно прошлого месяца
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">
								Посетителей
							</CardTitle>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   class="h-4 w-4 text-muted-foreground">
								<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">
                +<span class="anim-num">340</span>
							</div>
							<p class="text-xs text-muted-foreground">
								+18.1% относительно прошлого месяца
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">
								Оказано услуг
							</CardTitle>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
								stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								class="h-4 w-4 text-muted-foreground">
								<rect width="20" height="14" x="2" y="5" rx="2" />
								<path d="M2 10h20" />
							</svg>
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">
                +<span class="anim-num">420</span>
							</div>
							<p class="text-xs text-muted-foreground">
								+19% относительно прошлого месяца
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">
								Посетителей в день
							</CardTitle>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
								stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								class="h-4 w-4 text-muted-foreground">
								<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
							</svg>
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">
                <span class="anim-num">30</span>
							</div>
							<p class="text-xs text-muted-foreground">
								+5 относительно прошлого месяца
							</p>
						</CardContent>
					</Card>
				</div>
				<div class="grid gap-4 grid-cols-4 md:grid-cols-2 lg:grid-cols-7">
					<Card class="col-span-4">
						<Overview />
					</Card>
					<Card class="col-span-4 md:col-span-3">
						<CardHeader>
							<CardTitle>Последние продажи</CardTitle>
							<CardDescription>
								Было выполнено 256 услуг за этот месяц.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<RecentSales />
						</CardContent>
					</Card>
				</div>
			</TabsContent>
			<TabsContent value="analytics" class="space-y-4">
				<Card class="col-span-4">
					<Overview />
				</Card>
			</TabsContent>
      <TabsContent value="reports" class="space-y-4">
        <Card class="col-span-4 p-5">
          <span class="">Тут будут отчеты</span>
        </Card>
      </TabsContent><TabsContent value="notifications" class="space-y-4">
        <Card class="col-span-4 p-5">
          <span class="">Тут будут уведомления</span>
        </Card>
      </TabsContent>
		</Tabs>
	</div>
</template>