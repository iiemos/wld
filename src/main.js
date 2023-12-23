import './assets/main.css'
// import './assets/js/jquery-3.6.0.min.js'
import '@/assets/js/bootstrap.bundle.js'
// import './assets/js/jquery.waypoints.min.js'
// import './assets/js/viewport.jquery.js'
// import './assets/js/wow.min.js'
// import './assets/js/odometer.min.js'
// import './assets/js/jquery.nice-select.min.js'
// import './assets/js/main.js'

// wow 样式
import 'wow.js/css/libs/animate.css'

import './assets/js/web3.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import "tailwindcss/tailwind.css"
import App from './App.vue'
import router from './router'
import countTo from 'vue3-count-to'


const app = createApp(App)

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

app.use(ElementPlus)
app.use(countTo)
app
    .component('Footer', Footer)
    .component('Header', Header)
app.use(createPinia())
app.use(router)

app.mount('#app')

