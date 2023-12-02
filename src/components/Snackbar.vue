<template>
  <v-snackbar bottom right :value="updateExists" :timeout="-1" color="primary">
    {{getSnackbar.message}}
    <v-btn v-if="getSnackbar.isButton" text @click="refreshApp"> Update </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["isButton"],
  data() {
    return {
      updateExists: false,
    };
  },
  computed:{
      ...mapGetters(["getSnackbar"])
  },
  methods: {
    refreshApp() {
      this.updateExists = false;
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return;
      // Send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
    },
  },
};
</script>

<style>
</style>