import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { labels, priorities, statuses } from '@/lib/data'
import type { Task } from '@/lib/schema'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import { CalendarIcon, ChatBubbleIcon } from '@radix-icons/vue'
import UploadFile from '@/components/UploadFile.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Task>[] = [
	{
		id: 'select',
		// header: ({ table }) => h(Checkbox, {
		//   'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
		//   'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
		//   'ariaLabel': 'Select all',
		//   'class': 'translate-y-0.5',
		// }),
		cell: ({ row }) => h(Checkbox, {
			'checked': row.original.isDone,
			'onUpdate:checked': value => value ? row.original.isDone = true : row.original.isDone = false,
			'ariaLabel': 'Select row', 'class': 'translate-y-0.5'
		}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Задачи', className: 'hidden md:block' }),
		cell: ({ row }) => h('div', { class: 'hidden md:block' }, row.getValue('id')),
	},
	{
		accessorKey: 'title',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Название, исполнитель', className: '' }),
		cell: ({ row }) => {

			const label = labels.find(label => label.value === row.original.label)

			const avatart = getImageUrl(row.original?.responsible?.avatar)
			function getImageUrl(name) {
				return new URL(`../assets/avatars/${name}`, import.meta.url).href
			}

			return h('div', { class: 'flex flex-col gap-4 flex-wrap md:space-x-2 min-w-40 items-start md:flex-row md:gap-0 md:justify-between md:items-center' },
				[

					h('p', { class: `line-clamp-2 md:line-clamp-1 text-xl leading-none ${row.original.isDone ? 'line-through' : ''} md:underline md:font-medium md:text-base` }, row.getValue('title'),),
					h('div', { class: 'flex gap-6 flex-wrap md:flex-nowrap' }, [
						avatart ? h('img', { src: `${avatart}`, class: 'w-10 rounded-full' }, () => '') : null,
						h('div', { class: 'flex items-center gap-2' }, [
							h(CalendarIcon),
							h('span', new Date(row.original.deadLine).toLocaleDateString('ru-RU'))
						]),
						h('div', { class: 'flex items-center gap-2' }, [
							h(ChatBubbleIcon),
							h('span', row.original.messages.length),
						]),
						h(UploadFile, { limit: 1}),
					])

			])
		},
		enableHiding: false,
	},
	{
		accessorKey: 'status',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Статус', className: 'hidden md:block' }),

		cell: ({ row }) => {
			const status = statuses.find(
				status => status.value === row.getValue('status'),
			)

			if (!status)
				return null


			return h('div', { class: 'flex w-[110px] items-center hidden md:flex line-through' }, [
				status.icon && h(status.icon, { class: `mr-2 h-4 min-w-4 text-muted-foreground` }),
				h('span', status.label),
			])
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'priority',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Приоритет', className: 'hidden md:block' }),
		cell: ({ row }) => {
			const priority = priorities.find(
				priority => priority.value === row.getValue('priority'),
			)

			if (!priority)
				return null

			return h('div', { class: 'flex items-center hidden md:flex' }, [
				priority.icon && h(priority.icon, { class: 'mr-2 h-4 w-4 text-muted-foreground ' }),
				h('span', {}, priority.label),
			])
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	}
]