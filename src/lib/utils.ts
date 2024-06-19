import  {Updater} from '@tanstack/vue-table'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Ref } from 'vue'

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
	ref.value
		= typeof updaterOrValue === 'function'
		? updaterOrValue(ref.value)
		: updaterOrValue
}
