<template>
  <v-container>
    <h3>Subscription Page</h3>
    <form @submit.prevent="submitSubscription">
      <v-row>
        <v-col>
          <v-text-field
            v-model="record.name"
            placeholder=" "
            outline
            label="Name"
            readonly
          >
          </v-text-field>

          <v-text-field
            v-model="record.email"
            placeholder=" "
            outline
            label="Email"
            readonly
          >
          </v-text-field>

          <v-text-field
            v-model="record.address1"
            placeholder=" "
            outline
            label="Address1"
            readonly
          >
          </v-text-field>

          <v-text-field
            v-model="record.address2"
            placeholder=" "
            outline
            label="Address2"
            readonly
          >
          </v-text-field>

          <v-text-field
            v-model="record.address3"
            placeholder=" "
            outline
            label="Address3"
            readonly
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="record.phone"
            placeholder=" "
            outline
            label="Phone"
            readonly
          >
          </v-text-field>

          <v-text-field
            v-model="record.postcode"
            placeholder=" "
            outline
            label="postcode"
            readonly
          >
          </v-text-field>

          <v-text-field
            v-model="record.city"
            placeholder=" "
            outline
            label="city"
            readonly
          >
          </v-text-field>

          <v-text-field
            v-model="record.state"
            placeholder=" "
            outline
            label="state"
            readonly
          >
          </v-text-field>
        </v-col>
      </v-row>
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
          ></v-select>

          <v-btn
            class="btn btn-primary"
            block
            @click="submitSubscription"
            >Submit</v-btn
          >
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
  async mounted() {
    await this.auth.getUserData(); // Wait for user data to be fetched
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("/api/profile/" + this.auth.user.id, {})
        .then((response) => {
          this.record = response.data.data;
          if(this.record.subscription){
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
          this.getData();

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
      record: {
        subscription:{},
      },
      subscriptionList: ['Basic', 'Premium', 'Hi-Fi'],
      monthList: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      errorMessages: null, // Initialize errorMessages object
    };
  },
};
</script>
