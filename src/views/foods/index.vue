<template>
  <div>
    <h1 class="font-weight-regular">
      Daftar
      <span class="font-weight-bold">Makanan</span>
    </h1>
    <div class="mt-10">
      <v-text-field
        outlined
        label="Cari Makanan Kesukaan Anda"
        append-icon="mdi-magnify"
        @keyup="searchFood"
        v-model="search"
      ></v-text-field>
    </div>
    <v-row justify="start">
      <v-col lg="4" md="6" sm="12" v-for="food in foods" :key="food.id">
        <template v-if="loading == false">
          <CardFood :data="food" />
        </template>
        <template v-if="loading == true">
          <v-skeleton-loader
            v-for="i in 3"
            :key="i"
            class="mx-auto my-12"
            width="374"
            type="card"
          ></v-skeleton-loader>
        </template>
      </v-col>
    </v-row>
    <!-- <div class="d-flex flex-wrap justify-space-between">
      <template v-if="loading == false">
        <CardFood v-for="food in foods" :key="food.id" :data="food" />
      </template>
      <template v-if="loading == true">
        <v-skeleton-loader
          v-for="i in 3"
          :key="i"
          class="mx-auto my-12"
          width="374"
          type="card"
        ></v-skeleton-loader>
      </template>
    </div> -->
  </div>
</template>

<script>
import CardFood from "../../components/CardFood";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      loading: true,
      foods: [],
    };
  },
  components: { CardFood },
  created() {
    this.$store
      .dispatch("fetchFoods")
      .then((res) => {
        this.foods = this.getFoods;
        this.loading = false;
      })
      .catch((ex) => {
        this.loading = false;
      });
  },
  computed: {
    ...mapGetters(["getFoods", "getFoodSearch"]),
  },
  methods: {
    searchFood() {
      this.loading = true;
      if (this.search == "") {
        this.loading = false;
        this.foods = this.getFoods;
      } else {
        this.$store
          .dispatch("fetchFoodSearch", this.search)
          .then((r) => {
            this.foods = this.getFoodSearch;
            this.loading = false;
          })
          .catch((ex) => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
