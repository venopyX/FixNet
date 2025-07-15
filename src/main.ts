import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { authService } from './utils/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

/**
 * Initialize authentication before mounting the app
 */
const initializeApp = async () => {
  try {
    await authService.initializeAuth()
  } catch (error) {
    console.error('Failed to initialize authentication:', error)
  } finally {
    app.mount('#app')
  }
}

initializeApp()
