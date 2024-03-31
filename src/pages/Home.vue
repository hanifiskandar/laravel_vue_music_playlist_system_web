<template>
    <div class="container">
      <h1 class="text-center mb-4">Welcome to Hanif Task 1 App</h1>
  
      <div v-if="auth.user">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">User Information</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>ID:</strong> {{ auth.user?.id }}</li>
              <li class="list-group-item"><strong>Name:</strong> {{ auth.user?.name }}</li>
              <li class="list-group-item"><strong>Email:</strong> {{ auth.user?.email }}</li>
            </ul>
          </div>
        </div>
  
        <div class="mt-4">
          <h3 class="mb-3">Recent Activity</h3>
          <p>{{ lorem }}</p>
          <p>{{ lorem }}</p>
          <p>{{ lorem }}</p>
        </div>
      </div>
  
      <div v-else>
        <h3 class="text-center">No user logged in</h3>
        <p class="text-center">Please login to access your account.</p>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { authStore} from '../stores/authstore';

export default {
    created() {
        this.auth = authStore();
    },
    mounted() {
        this.auth.getUserData();
    },

    data() {
        return {
            record: {
                user: {},
            },
            auth: null,
            errorMessages: {},
            lorem: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, magna ut dignissim vestibulum, mi ligula condimentum orci, id dictum lectus nisi eget turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;`,

        };
    },
};
</script>
