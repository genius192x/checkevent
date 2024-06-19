<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
const data =
[
	{
		name: 'Январь',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Февраль',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Март',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Апрель',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Май',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Июнь',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Июль',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Август',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Сентябрь',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Октябрь',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Ноябрь',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
	{
		name: 'Декабрь',
		'Доход': Math.floor(Math.random() * 5000) + 1000,
		'Расход': Math.floor(Math.random() * 5000) + 1000
	},
]
</script>

<template>
	<CardHeader>
		<CardTitle>Отчет за год</CardTitle>
	</CardHeader>
	<CardContent class="pl-2">
		<BarChart :data="data" :categories="['Доход', 'Расход']" :index="'name'" :rounded-corners="4" />
	</CardContent>
</template>