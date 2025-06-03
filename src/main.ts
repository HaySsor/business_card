// src/main.js
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import {onAuthStateChangedListener} from "./firebase/firebase.ts";
import {useUserStore} from "./store/user.ts";
import type {User} from 'firebase/auth'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

let hasMounted = false

onAuthStateChangedListener((user: User | null) => {
    const userStore = useUserStore()
    userStore.setUser(user)

    if (!hasMounted) {
        app.mount('#app')
        hasMounted = true
    }

    // po zalogowaniu/przeładowaniu – przekierowania
    if (!user) {
        router.push({name: 'Home'})
    } else {

    }
})
