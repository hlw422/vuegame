import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Father from './Father.vue'   
import router from './router'

const app = createApp(Father)

app.use(createPinia())
app.use(router)

app.mount('#app')
