<template>
  <v-container>
    <h3>Music Playlist Page</h3>
    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Singer
        </th>
        <th class="text-left">
          Genre
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in record"
        :key="item.id"
      >
        <td>{{ index+1}}</td>
        <td>{{ item.music.name }}</td>
        <td>{{ item.music.singer }}</td>
        <td>{{ item.music.genre }}</td>
        
      </tr>
    </tbody>
  </v-table>
  </v-container>
</template>


<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { authStore} from '../stores/authstore';

export default {
  created() {
    this.router = useRouter();
    this.auth = authStore();
  },
  async mounted() {
    await this.auth.getUserData(); // Wait for user data to be fetched
    this.getData();

  },
  methods: {
    getData() {
      axios
        .get("/api/playlist/" + this.auth.user.id, {})
        .then((response) => {
          this.record = response.data.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessages = error.response.data.message;
        });
    },
  },
  data() {
    return {
      router: null, // Initialize router as null
      auth: null,
      record: null,
      errorMessages: null, // Initialize errorMessages object
    };
  },
};
</script>
