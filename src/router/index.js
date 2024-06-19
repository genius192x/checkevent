import { createRouter, createWebHashHistory } from 'vue-router'
import { useGlobalStore } from '@/store/GlobalStore'
import { storeToRefs } from 'pinia'
import DashBoardView from '@/pages/DashBoard.vue'
import TasksView from '@/pages/Tasks.vue'
import SettingAccount from "@/pages/settings/SettingAccount.vue"
import SettingAppearance from "@/pages/settings/SettingAppearance.vue"
import SettingDisplay from "@/pages/settings/SettingDisplay.vue"
import SettingNotifications from "@/pages/settings/SettingNotifications.vue"

const routes = [
	{
		path: "/",
		component: DashBoardView,
	},
	{
		path: '/tasks',
		component: TasksView,
	},
	{
		path: '/settings',
		component: SettingAccount,
	},{
		path: '/settings/appearance',
		component: SettingAppearance,
	},{
		path: '/settings/display',
		component: SettingDisplay,
	},{
		path: '/settings/notifications',
		component: SettingNotifications,
	},

];
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
router.beforeEach((to) => {
	const globalStore = useGlobalStore()
	let { isSettingsOpen } = storeToRefs(globalStore)
	if( to.fullPath.includes('/settings')){
		globalStore.isSettingsOpen = true
	} else {
		globalStore.isSettingsOpen = false
	}
})

export default router;