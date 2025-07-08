import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { authService } from './utils/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize authentication on app startup
authService.initializeAuth()

app.mount('#app')
