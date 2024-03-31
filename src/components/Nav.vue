
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Task1</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
                    </li>
                    <li class="nav-item" v-if="!auth.user">
                        <router-link class="nav-link" :class="{ 'active': $route.name === 'Login' }" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="!auth.user">
                        <router-link class="nav-link" :class="{ 'active': $route.name === 'Register' }" to="/register" tabindex="-1" aria-disabled="true">Register</router-link>
                    </li>
                    <li class="nav-item" v-if="auth.user">
                        <router-link class="nav-link" :class="{ 'active': $route.name === 'Profile' }" to="/profile" tabindex="-1" aria-disabled="true">Profile</router-link>
                    </li>
                    <li class="nav-item" v-if="auth.user">
                        <router-link class="nav-link" :class="{ 'active': $route.name === 'MusicPlaylist' }" to="/music-playlist" tabindex="-1" aria-disabled="true">Music Playlist</router-link>
                    </li>
                    <li class="nav-item" v-if="auth.user">
                        <router-link class="nav-link" :class="{ 'active': $route.name === 'Subscription' }" to="/subscription" tabindex="-1" aria-disabled="true">Subscription</router-link>
                    </li>
                    <li class="nav-item" v-if="auth.user">
                        <router-link class="nav-link" to="/login" tabindex="-1" aria-disabled="true">
                            <span @click="auth.logout">Logout</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<script>
import axios from 'axios';
import { authStore} from '../stores/authstore';

export default {
    created() {
        this.auth = authStore();
    },

    data() {
        return {
            record: {
                user: {},
            },
            auth: null,
            errorMessages: {}
        };
    },
};
</script>

