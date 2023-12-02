<template>
  <div>
    <v-app-bar app color="white" flat>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center">Resto Linov</div>

      <!-- <div class="d-flex align-center ml-5">
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/foods">Foods</v-btn>
      </div> -->
      <v-toolbar-items class="ml-10 hidden-sm-and-down">
        <v-btn text to="/">Home</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/foods">Foods</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/cart" class="mr-5">
          <v-icon left> mdi-cart-outline </v-icon>
          <span class="mr-2 hidden-sm-and-down">Keranjang</span>
          <v-chip class="ma-2">{{ calTotalCart }}</v-chip>
        </v-btn>
      </v-toolbar-items>
      <v-btn to="/auth/login" v-if="!getLocal" color="primary" dark depressed>
        Login
      </v-btn>
      <template v-if="getLocal">
        <span class="ma-5"
          >Welcome,
          <span class="font-weight-bold">{{ getUser.nama }}</span></span
        >
      </template>
      <!-- v-if="getLocal" -->
      <v-btn @click="logout" v-if="getLocal" color="error" dark depressed>
        Logout
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary app class="rounded-br-xl">
      <v-list nav dense>
        <v-list-item-group active-class="deep-green--text text--accent-4">
          <v-list-item to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/foods">
            <v-list-item-title>Foods</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer class="mt-10">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Abdul Rahmat</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: false,
    };
  },
  created() {
    this.$store
      .dispatch("fetchCart")
      .then((res) => {
        //
      })
      .catch((ex) => {
        console.log("ex", ex);
        //
      });
  },
  computed: {
    getLocal() {
      return sessionStorage.getItem("user");
    },
    ...mapGetters(["getCart", "getUser"]),
    calTotalCart() {
      let total = 0;
      if (this.getCart.length == 0) {
        return 0;
      } else {
        this.getCart.forEach((item) => {
          total = total + parseInt(item.jumlah_pemesanan);
        });
        return total;
      }
    },
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/auth/login");
    },
  },
};
</script>

<style>
</style>