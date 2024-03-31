<template>
  <v-container>
    <h3>Subscription Page</h3>
    <form @submit.prevent="submitSubscription">
      <v-row>
        <v-col>
          <v-select
            v-model="record.type"
            label="Subscription Type"
            placeholder=" "
            outline
            :items="subscriptionList"
            attach
            clearable
            dense
            :error-messages="errorMessages?.type"
          ></v-select>

          <v-select
            v-model="record.from_month"
            label="From Month"
            placeholder=" "
            outline
            :items="monthList"
            attach
            clearable
            dense
            :error-messages="errorMessages?.from_month"
          ></v-select>

          <v-select
            v-model="record.to_month"
            label="To Month"
            placeholder=" "
            outline
            :items="monthList"
            attach
            clearable
            dense
            :error-messages="errorMessages?.to_month"
          ></v-select>

          <v-btn class="btn btn-primary" block @click="submitSubscription"
            >Submit</v-btn
          >
        </v-col>
      </v-row>
    </form>

    <snackbar :snackbar="snackbar" location="top right"></snackbar>


    <div class="table-container mt-3">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Plan</th>
            <th>From Month</th>
            <th>To Month</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subscription, index) in record.subscription" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ subscription.type }}</td>
            <td>{{ subscription.from_month }}</td>
            <td>{{ subscription.to_month }}</td>
            <td><v-icon color="red" @click="deleteSubscription(subscription.id)">mdi-delete</v-icon></td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { authStore } from "../stores/authstore";
import Snackbar from "./Snackbar.vue";


export default {
  created() {
    this.router = useRouter();
    this.auth = authStore();
  },
  async mounted() {
    await this.auth.getUserData(); // Wait for user data to be fetched
    this.getData();
  },
  components:{
    Snackbar
  },
  methods: {
    getData() {
      axios
        .get("/api/profile/" + this.auth.user.id, {})
        .then((response) => {
          this.record = response.data.data;
          if (this.record.subscription) {
            this.record.type = this.record.subscription.type;
            this.record.from_month = this.record.subscription.from_month;
            this.record.to_month = this.record.subscription.to_month;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessages = error.response.data.message;
        });
    },

    submitSubscription() {
      axios
        .post("/api/update-subscription/" + this.auth.user.id, this.record)
        .then((response) => {
          this.snackbar.message = response?.data.message;
          this.snackbar.type = "success";
          this.snackbar.show = true;
          this.getData();
        })
        .catch((error) => {
          console.error("Error:", error);
          this.snackbar.message = error?.response.data.message;
          this.snackbar.type = "error";
          this.snackbar.show = true;
          this.errorMessages = error.response.data.errors;
        });
    },

    deleteSubscription($id) {
      axios
        .delete("/api/delete-subscription/" + $id)
        .then((response) => {
          this.snackbar.message = response?.data.message;
          this.snackbar.type = "success";
          this.snackbar.show = true;
          this.getData();
        })
        .catch((error) => {
          console.error("Error:", error);
          this.snackbar.message = error?.response.data.message;
          this.snackbar.type = "error";
          this.snackbar.show = true;
          this.errorMessages = error.response.data.errors;
        });
    },

  },
  data() {
    return {
      router: null, // Initialize router as null
      auth: null,
      record: {
        subscription: {},
      },
      subscriptionList: ["Basic", "Premium", "Hi-Fi"],
      monthList: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      errorMessages: null, // Initialize errorMessages object

      //Snackbar
      snackbar: {
        show: false,
        type: null,
        message: null
      },

    };
  },
};
</script>

<style scoped>
/* Table styles */
.table-container {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tbody tr:hover {
  background-color: #f0f0f0;
}
</style>