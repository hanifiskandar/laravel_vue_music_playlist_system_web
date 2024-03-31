<template>
    <v-snackbar
      v-model="snackbar.show"
      :color="style"
      :timeout="3000"
      flat
    >
      {{ snackbar.message }}
      <!-- <v-btn
        flat
        @click="snackbar.show = false"
      >close</v-btn> -->
    </v-snackbar>
  </template>
  
  <script>
  export default {
    props: ["snackbar"],
    computed: {
      style() {
        let style = "";
  
        if (this.snackbar.type == "success") {
          style = "info";
        } else if (this.snackbar.type == "error") {
          style = "red darken-2";
        } else if (this.snackbar.type == "warning") {
          style = "warning";
        }
  
        return style;
      }
    }
  };
  </script>