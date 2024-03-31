<template>
  <v-container>
    <h3>Music Playlist Page</h3>
    <v-row>
      <v-col>
        <v-text-field
          class="mb-2"
          label="Search"
          placeholder=" "
          style="background-color: white"
          hide-details
          append-icon="mdi-magnify"
          @change="search"
        ></v-text-field>
      </v-col>
      <v-col> </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="record"
      item-key="id"
      class="custom-table"
    >
      <template v-slot:headers="props">
        <tr>
          <th v-for="header in headers" :key="header.text">
            {{ header.text }}
          </th>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { authStore } from "../stores/authstore";

export default {
  created() {
    this.router = useRouter();
    this.auth = authStore();
  },
  async mounted() {
    await this.auth.getUserData(); // Wait for user data to be fetched
    // this.getData();
    this.fetching = true;
  },
  watch: {
    fetching(val) {
      if (val == true) {
        this.getData();
      }
    },
  },
  methods: {
    getData() {
      if (this.fetching == true) {
        console.log("filterrr = " + this.filter.search);
        axios
          .get("/api/playlist/" + this.auth.user.id, {
            params: {
              filter: this.filter,
            },
          })
          .then((response) => {
            this.record = response.data.data.map((item, index) => ({
              ...item,
              no: index + 1,
            }));
          })
          .catch((error) => {
            console.error("Error:", error);
            this.errorMessages = error.response.data.message;
          })
          .then(() => {
            this.fetching = false;
          });
      }
    },
    search(event) {
      this.filter.search = event.target.value;
      console.log(this.filter.search);
      this.fetching = true;
    },
  },
  data() {
    return {
      router: null,
      auth: null,
      record: [],
      filter: {},
      filterSearch: "",
      fetching: false,
      errorMessages: null,
      headers: [
        { text: "No", value: "no" },
        { text: "Name", value: "music.name" },
        { text: "Singer", value: "music.singer" },
        { text: "Genre", value: "music.genre" },
      ],
    };
  },
};
</script>

<style scoped>
/* Custom table styles */
.custom-table {
  width: 100%;
}

/* Header styles */
.custom-table thead th {
  background-color: #f5f5f5;
  font-weight: bold;
  text-align: left;
}

/* Row styles */
.custom-table tbody td {
  padding: 12px;
}

/* Highlight alternate rows */
.custom-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Hover effect */
.custom-table tbody tr:hover {
  background-color: #e0e0e0;
}
</style>
