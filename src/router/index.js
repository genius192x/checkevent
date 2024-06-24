import { createRouter, createWebHashHistory } from 'vue-router'
import { useGlobalStore } from '@/store/GlobalStore'
import { storeToRefs } from 'pinia'
import TasksView from '@/pages/Tasks.vue'
import HomeView from '@/pages/Home.vue'
import SettingAccount from "@/pages/settings/SettingAccount.vue"
import SettingAppearance from "@/pages/settings/SettingAppearance.vue"
import SettingNotifications from "@/pages/settings/SettingNotifications.vue"
import AuthorizationVue from '@/pages/Authorization.vue'
import RegistrationVue from '@/pages/Registration.vue'

const routes = [
	{
		path: "/",
		component: HomeView,
	},
	{
		path: "/list",
		component: TasksView,
	},
	{
		path: '/settings',
		component: SettingAccount,
	},
	{
		path: '/settings/appearance',
		component: SettingAppearance,
	},
	{
		path: '/settings/notifications',
		component: SettingNotifications,
	},
	{
		path: '/authorization',
		component: AuthorizationVue,
	},
	{
		path: '/registration',
		component: RegistrationVue,
	},
	{
		path: '/list/:id',
		name: 'listId',
		component: TasksView,
		props: true
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