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
import ManagementVue from '@/pages/Management.vue'

const routes = [
	{
		path: "/",
		name: 'Home',
		component: HomeView,
	},
	{
		path: "/list",
		component: TasksView,
	},
	{
		path: "/management",
		component: ManagementVue,
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
		name: 'Login',
		component: AuthorizationVue,
	},
	{
		path: '/registration',
		name: 'Registration',
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

router.beforeEach(async (to, from) => {
	const globalStore = useGlobalStore()
	if (
		// make sure the user is authenticated
		!globalStore.isAuth &&
		// ❗️ Avoid an infinite redirect
		to.name !== 'Login' &&
		to.name !== 'Registration'
	) {
		// redirect the user to the login page
		return {
			name: 'Login'
		}
	}
})
export default router;