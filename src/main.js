import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import VueAxios from 'vue-axios'
import axios from 'axios'
import store from './store'
import vuetify from './vuetify'
import './assets/main.css'
import i18n from './i18n'

  const app= createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.use(VueAxios,axios)
app.use(i18n)
app.config.globalProperties.$axios = axios;
app.mount('#app')
