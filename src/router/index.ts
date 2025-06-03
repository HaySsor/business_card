import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import {useUserStore } from "../store/user.ts";

const routes: RouteRecordRaw[] = [
    {
        path : '/',
        name : 'Home',
        component : import('../views/home/Home.vue'),
    },
    {
        path : '/login',
        name : 'Login',
        component : import('../views/login/Login.vue'),
    },
    {
        path : '/register',
        name : 'Register',
        component : import('../views/register/Register.vue'),
    },
    {
        path : `/card/:id`,
        name: 'Card',
        component : import('../views/card/Card.vue'),
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