import { createRouter, createWebHistory } from "vue-router";

import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile.vue'
import MusicPlaylist from '../pages/MusicPlaylist.vue'
import Subscription from '../pages/Subscription.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/Login.vue')
    },
    {
        path: '/register',
        name: 'Register ',
        component: () => import('../pages/Register.vue')
    },
    {
        path: '/profile',
        name: 'Profile ',
        component: () => import('../pages/Profile.vue')
    },
    {
        path: '/music-playlist',
        name: 'MusicPlaylist ',
        component: () => import('../pages/MusicPlaylist.vue')
    },
    {
        path: '/subscription',
        name: 'Subscription ',
        component: () => import('../pages/Subscription.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass:'active'
})

export default router; 