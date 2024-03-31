<template>
  <v-container>
    <h3 class="text-center">Registration Page</h3>
    <form @submit.prevent="submitRegister">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="record.name"
            placeholder="Enter your name"
            outlined
            label="Name"
            required
            prepend-inner-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            v-model="record.email"
            placeholder="Enter your email"
            outlined
            label="Email"
            required
            prepend-inner-icon="mdi-email"
          ></v-text-field>
          <v-text-field
            v-model="record.password"
            placeholder="Enter your password"
            outlined
            label="Password"
            required
            type="password"
            prepend-inner-icon="mdi-lock"
          ></v-text-field>
          <v-text-field
            v-model="record.password_confirmation"
            placeholder="Confirm your password"
            outlined
            label="Password Confirmation"
            required
            type="password"
            prepend-inner-icon="mdi-lock"
          ></v-text-field>
          <v-btn class="mt-4" block color="primary" @click="submitRegister">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </form>
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
  methods: {
    async submitRegister() {
      await this.auth.getToken();
      axios
        .post("/register", {
          name: this.record.name,
          email: this.record.email,
          password: this.record.password,
          password_confirmation: this.record.password_confirmation,
        })
        .then((response) => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          // if (error.response && error.response.status === 422) {
          this.errorMessages = error.response.data.message;
          // }
        });
    },
  },
  data() {
    return {
      router: null, // Initialize router as null
      auth: null,
      record: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errorMessages: null, // Initialize errorMessages object
    };
  },
};
</script>
