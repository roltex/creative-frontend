import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import i18n from './plugins/i18n'
import App from './App.vue'
import './style.css'

// Create app instance
const app = createApp(App)

// Install plugins
app.use(createPinia())
app.use(router)
app.use(i18n)

// Mount app
app.mount('#app')
