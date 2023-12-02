<template>
  <v-app>
    <router-view />
    <SnackBar/>
  </v-app>
</template>

<script>
import update from './mixins/update';
import SnackBar from './components/Snackbar'
export default {
  name: "App",
  data() {
    return {
    };
  },
  components:{
    SnackBar
  },
  mixins:[update],
  created() {
    sessionStorage.clear();
  },
  methods: {
  },
};
</script>
