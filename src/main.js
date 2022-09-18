import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'



import './assets/main.css';


const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.mount('#app')