<template>
  <v-container>
    <h3>Profile Page</h3>
    <form @submit.prevent="submitProfile">
      <v-row>
        <v-col>
          <v-text-field
            v-model="record.name"
            placeholder=" "
            outline
            label="Name"
          >
          </v-text-field>

          <v-text-field
            v-model="record.email"
            placeholder=" "
            outline
            label="Email"
          >
          </v-text-field>

          <v-text-field
            v-model="record.address1"
            placeholder=" "
            outline
            label="Address1"
          >
          </v-text-field>

          <v-text-field
            v-model="record.address2"
            placeholder=" "
            outline
            label="Address2"
          >
          </v-text-field>

          <v-text-field
            v-model="record.address3"
            placeholder=" "
            outline
            label="Address3"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="record.phone"
            placeholder=" "
            outline
            label="Phone"
          >
          </v-text-field>

          <v-text-field
            v-model="record.postcode"
            placeholder=" "
            outline
            label="postcode"
          >
          </v-text-field>

          <v-text-field
            v-model="record.city"
            placeholder=" "
            outline
            label="city"
          >
          </v-text-field>

          <v-text-field
            v-model="record.state"
            placeholder=" "
            outline
            label="state"
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
            outline
            :items="genreList"
            attach
            clearable
            dense
            multiple
            item-value="id"
            item-text="label"
          ></v-select>

          <v-select
            v-model="record.selectedInterests"
            label="Interest"
            placeholder=" "
            outline
            :items="interestList"
            attach
            clearable
            dense
            multiple
            item-value="id"
            item-text="label"
          ></v-select>

          <v-select
            v-model="record.selectedHistory"
            label="History"
            placeholder=" "
            outline
            :items="musicList"
            attach
            clearable
            dense
            multiple
            item-value="id"
            item-text="label"
          ></v-select>

          <v-btn
            class="btn btn-primary"
            block
            @click="submitProfile"
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
    this.getLookupData();
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
          this.getData();
          this.getLookupData();

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
      errorMessages: null, // Initialize errorMessages object
    };
  },
};
</script>
