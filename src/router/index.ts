import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import {useUserStore } from "../store/user.ts";
import Home from "../views/home/Home.vue";
import Login from "../views/login/Login.vue";
import Register from "../views/register/Register.vue";


const routes: RouteRecordRaw[] = [
    {
        path : '/',
        name : 'Home',
        component : Home
    },
    {
        path : '/login',
        name : 'Login',
        component : Login,
    },
    {
        path : '/register',
        name : 'Register',
        component : Register,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,

    scrollBehavior(to, _, saved) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }
        return saved || { top: 0 }
    }
})

router.beforeEach((to, _, next) => {
    const { user } = useUserStore()
    if (to.meta.requiresAuth && !user) {
        return next({ name: 'Home' })
    }
    next()
})

export default router