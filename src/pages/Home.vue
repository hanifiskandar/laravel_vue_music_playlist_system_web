<template>
  <div class="container">
    <h1 class="text-center mb-4">Welcome to Music Playlist System</h1>

    <div v-if="auth.user" class="user-info-card">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">User Information</h5>
          <ul class="list-group list-group-flush">
            <!-- <li class="list-group-item"><strong>ID:</strong> {{ auth.user?.id }}</li> -->
            <li class="list-group-item"><strong>Name:</strong> {{ auth.user?.name }}</li>
            <li class="list-group-item"><strong>Email:</strong> {{ auth.user?.email }}</li>
          </ul>
        </div>
      </div>

      <div class="recent-activity mt-4">
        <h3 class="mb-3">Recent Activity</h3>
        <div class="activity-item" v-for="index in 3" :key="index">
          <p>{{ lorem }}</p>
        </div>
      </div>
    </div>

    <div v-else class="no-user">
      <h3 class="text-center">No user logged in</h3>
      <p class="text-center">Please login to access your account.</p>
    </div>
  </div>
</template>

<script>
import { authStore } from '../stores/authstore';

export default {
  data() {
    return {
      auth: null,
      lorem: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum, magna ut dignissim vestibulum, mi ligula condimentum orci, id dictum lectus nisi eget turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;`,
    };
  },
  created() {
    this.auth = authStore();
  },
  mounted() {
    this.auth.getUserData();
  },
};
</script>

<style scoped>
.container {
  /* margin: 0px 20px;
  padding: 20px; */
}

.user-info-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #333;
}

.list-group-item {
  border: none;
}

.recent-activity {
  margin-top: 30px;
}

.activity-item {
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.no-user {
  margin-top: 50px;
  text-align: center;
  color: #777;
}
</style>
