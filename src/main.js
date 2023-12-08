import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'


const app = createApp(App)

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

app.use(ElementPlus)
app
    .component('Footer', Footer)
    .component('Header', Header)
app.use(createPinia())
app.use(router)

app.mount('#app')

