import { h } from 'vue'
import {ArrowDownIcon} from '@radix-icons/vue'
import {ArrowRightIcon} from '@radix-icons/vue'
import {ArrowUpIcon} from '@radix-icons/vue'
import {CheckCircledIcon} from '@radix-icons/vue'
import {CircleIcon} from '@radix-icons/vue'
import {CrossCircledIcon} from '@radix-icons/vue'
import {QuestionMarkCircledIcon} from '@radix-icons/vue'
import {StopwatchIcon} from '@radix-icons/vue'

export const labels = [
	{
		value: 'sound',
		label: 'Звук',
	},
	{
		value: 'light',
		label: 'Свет',
	},
	{
		value: 'documents',
		label: 'Документы',
	},
]

export const statuses = [
	{
		value: 'todo',
		label: 'Поставлена',
		icon: h(CircleIcon),
	},
	{
		value: 'in progress',
		label: 'Выполняется',
		icon: h(StopwatchIcon),
	},
	{
		value: 'check',
		label: 'Ждет проверки',
		icon: h(StopwatchIcon),
	},
	{
		value: 'done',
		label: 'Выполнено',
		icon: h(CheckCircledIcon),
	},
	// {
	// 	value: 'canceled',
	// 	label: 'Canceled',
	// 	icon: h(CrossCircledIcon),
	// },
]

export const priorities = [
	{
		label: 'Низкий',
		value: 'low',
		icon: h(ArrowDownIcon),
	},
	{
		label: 'Средний',
		value: 'medium',
		icon: h(ArrowRightIcon),
	},
	{
		label: 'Высокий',
		value: 'high',
		icon: h(ArrowUpIcon),
	},
]
