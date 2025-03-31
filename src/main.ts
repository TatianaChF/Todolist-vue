import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import "./assets/style.css"

createApp(App).use(createPinia()).mount('#app')
