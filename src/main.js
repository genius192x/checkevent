import { createApp } from 'vue'
// import './style.css'
import './assets/index.css'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'


async function prepareApp() {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    const { worker } = await import('./mocks/browser.ts')
    return worker.start()
  }

  return Promise.resolve()
}
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)


app.mount("#app")
