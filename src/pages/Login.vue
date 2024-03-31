<template>
  <v-container>
    <h3 class="text-center pb-2">Login Page</h3>
    <p class="text-center" style="color:red">{{ errorMessages }}</p>
    <form @submit.prevent="submitLogin">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4">
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
          <v-btn class="mt-4" block color="primary" @click="submitLogin">
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
    async submitLogin() {
      await this.auth.getToken();
      axios
        .post("/login", {
          email: this.record.email,
          password: this.record.password,
        })
        .then((response) => {
          console.log("RESTEST: ", response);
          this.$router.push("/");

          // if(response.status === 204){
          //   this.$router.push("/");
          // }
          // else{
          //   this.errorMessages = response.data.message;
          // }
          // console.log('boomsdsd');
        })
        .catch((error) => {
          console.log("boom");
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
        email: "",
        password: "",
      },
      errorMessages: null, // Initialize errorMessages object
    };
  },
};
</script>
