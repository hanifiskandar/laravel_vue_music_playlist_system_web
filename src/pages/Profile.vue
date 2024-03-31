<template>
  <v-container>
    <h3>Profile Page</h3>
 
    <div class="d-flex justify-end mb-2">
      <!-- Snackbar Component -->

      <template v-if="mode == 'view'">
        <v-btn
          color="info"
          depressed
          @click="mode = 'edit'"
        >
          Edit
        </v-btn>
      </template>

      <template v-else>
        <v-btn style="margin-right: 5px;"
          color="light"
          depressed
          @click="onCancel"
        >
          Cancel
        </v-btn>

        <v-btn 
          color="primary"
          depressed
          @click="submitProfile"
        >
          Save
        </v-btn>
      </template>
    </div>

    <form @submit.prevent="submitProfile">
      <v-row>
        <v-col>
          <v-text-field
            v-model="record.name"
            placeholder=" "
            :variant="canEdit('name') ? 'outlined' : 'solo'"
            label="Name"
            :readonly="!canEdit('name')"
            :error-messages="errorMessages?.name"
          >
          </v-text-field>

          <v-text-field
            v-model="record.email"
            placeholder=" "
            label="Email"
            :variant="canEdit('email') ? 'solo' : 'solo'"
            readonly
            :error-messages="errorMessages?.email"
          >
          </v-text-field>

          <v-text-field
            v-model="record.address1"
            placeholder=" "
            :variant="canEdit('address1') ? 'outlined' : 'solo'"
            label="Address1"
            :readonly="!canEdit('address1')"
            :error-messages="errorMessages?.address1"
          >
          </v-text-field>

          <v-text-field
            v-model="record.address2"
            placeholder=" "
            outline
            label="Address2"
            :variant="canEdit('address2') ? 'outlined' : 'solo'"
            :readonly="!canEdit('address2')"
            :error-messages="errorMessages?.address2"
          >
          </v-text-field>

          <v-text-field
            v-model="record.address3"
            placeholder=" "
            outline
            label="Address3"
            :variant="canEdit('address3') ? 'outlined' : 'solo'"
            :readonly="!canEdit('address3')"
            :error-messages="errorMessages?.address3"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="record.phone"
            placeholder=" "
            outline
            label="Phone"
            :variant="canEdit('phone') ? 'outlined' : 'solo'"
            :readonly="!canEdit('phone')"
            :error-messages="errorMessages?.phone"
          >
          </v-text-field>

          <v-text-field
            v-model="record.postcode"
            placeholder=" "
            label="postcode"
            :variant="canEdit('postcode') ? 'outlined' : 'solo'"
            :readonly="!canEdit('postcode')"
            :error-messages="errorMessages?.postcode"
          >
          </v-text-field>

          <v-text-field
            v-model="record.city"
            placeholder=" "
            label="city"
            :variant="canEdit('city') ? 'outlined' : 'solo'"
            :readonly="!canEdit('city')"
            :error-messages="errorMessages?.city"
          >
          </v-text-field>

          <v-text-field
            v-model="record.state"
            placeholder=" "
            :variant="canEdit('state') ? 'outlined' : 'solo'"
            label="state"
            :readonly="!canEdit('state')"
            :error-messages="errorMessages?.state"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            v-model="record.selectedGenres"
            label="Genre"
            placeholder=" "
            :variant="canEdit('selectedGenres') ? 'outlined' : 'solo'"
            :readonly="!canEdit('selectedGenres')"
            :items="genreList"
            attach
            clearable
            dense
            multiple
            item-value="id"
            item-text="label"
            :error-messages="errorMessages?.selectedGenres"
          ></v-select>

          <v-select
            v-model="record.selectedInterests"
            label="Interest"
            placeholder=" "
            :variant="canEdit('selectedInterests') ? 'outlined' : 'solo'"
            :readonly="!canEdit('selectedInterests')"
            :items="interestList"
            attach
            clearable
            dense
            multiple
            item-value="id"
            item-text="label"
            :error-messages="errorMessages?.selectedInterests"
          ></v-select>

          <v-select
            v-model="record.selectedHistory"
            label="History"
            placeholder=" "
            :variant="canEdit('selectedHistory') ? 'outlined' : 'solo'"
            :readonly="!canEdit('selectedHistory')"
            :items="musicList"
            attach
            clearable
            dense
            multiple
            item-value="id"
            item-text="label"
            :error-messages="errorMessages?.selectedHistory"
          ></v-select>

          <!-- <v-btn
            class="btn btn-primary"
            block
            @click="submitProfile"
            >Submit</v-btn
          > -->
        </v-col>
      </v-row>
    </form>
    <snackbar :snackbar="snackbar" location="top right"></snackbar>

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
    this.getLookupData();
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
          this.record.selectedGenres = this.record.genres.map(
            (genre) => genre.genre
          );
          this.record.selectedInterests = this.record.interest.map(
            (interest) => interest.artist
          );
          this.record.selectedHistory = this.record.history.map((item) => {
            const musicObject = this.record.history.find(
              (historyItem) => historyItem.music_id === item.music.id
            );
            return musicObject.music.name;
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessages = error.response.data.message;
        });
    },

    getLookupData() {
      axios
        .get("/api/lookup/", {})
        .then((response) => {
          this.lookupData = response.data.data;
          this.interestList = [
            ...new Set(this.lookupData.map((item) => item.singer)),
          ];
          this.genreList = [
            ...new Set(this.lookupData.map((item) => item.genre)),
          ];
          this.musicList = [
            ...new Set(this.lookupData.map((item) => item.name)),
          ];
        })
        .catch((error) => {
          console.log(error);
          this.errorMessages = error.response.data.message;
        });
    },

    submitProfile() {
      axios
        .post("/api/update-profile/" + this.auth.user.id, this.record)
        .then((response) => {
          this.snackbar.message = response?.data.message;
          this.snackbar.type = "success";
          this.snackbar.show = true;
          this.getData();
          this.getLookupData();
        })
        .catch((error) => {
          console.error("Error:", error);
          this.snackbar.message = error?.response.data.message;
          this.snackbar.type = "error";
          this.snackbar.show = true;
          // this.errorMessages = error.response.data.message;
          this.errorMessages = error?.response.data.errors;
        });
    },

    canEdit(field) {
      let can = false;

      can = this.mode == "edit" || this.mode == "new";

      switch (field) {
        default:
          break;
      }

      return can;
    },

    onCancel() {
      this.errorMessages = null;

      this.getData();
      this.mode = "view";
    },
  },
  data() {
    return {
      router: null, // Initialize router as null
      auth: null,
      record: {
        boom: "",
        id: 1,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        selectedGenres: [],
        selectedInterests: [],
        selectedHistory: [],
      },
      // genre: [],
      // genreList: ['Pop', 'Rock', 'Classical'], // Predefined genres
      lookupData: [],
      interestList: [],
      genreList: [],
      musicList: [],
      genre: [],
      mode: "view",
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

<style>
.test{
  position: relative;
  width: 400px;
  height: 200px;
  border: 3px solid red;
}

</style>