import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { labels, priorities, statuses } from '@/lib/data'
import type { Task } from '@/lib/schema'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Task>[] = [
	{
		id: 'select',
		header: ({ table }) => h(Checkbox, {
		'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
		'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
		'ariaLabel': 'Select all',
		'class': 'translate-y-0.5',
		}),
		cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
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
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Название, тэг', className: '' }),

		cell: ({ row }) => {
		const label = labels.find(label => label.value === row.original.label)

		return h('div', { class: 'flex space-x-2 min-w-20 items-start' }, [
			label ? h(Badge, { variant: 'outline' }, () => label.label) : null,
			h('p', { class: 'line-clamp-1  font-medium' }, row.getValue('title'),),
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

		return h('div', { class: 'flex w-[110px] items-center hidden md:flex' }, [
			status.icon && h(status.icon, { class: 'mr-2 h-4 min-w-4 text-muted-foreground' }),
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
	},
	{
		id: 'actions',
		cell: ({ row }) => h(DataTableRowActions, { row }),
	},
]
