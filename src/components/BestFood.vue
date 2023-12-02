<template>
  <div>
    <div class="d-flex justify-space-between">
      <h3 class="title align-self-center">Best Foods</h3>
      <v-btn color="green align-self-center" dark to="/foods"
        ><v-icon left dark> mdi-eye </v-icon>Lihat Semua</v-btn
      >
    </div>
    <v-row justify="start">
      <v-col lg="4" md="6" sm="12" v-for="item in getBestFood" :key="item.id">
        <template v-if="loading == false">
          <CardFood :data="item" />
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
    <!-- <div class="d-flex justify-space-between">
      <template v-if="loading == false">
        <CardFood v-for="item in getBestFood" :key="item.id" :data="item" />
      </template>
      <template  v-if="loading == true">
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
import CardFood from "../components/CardFood";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: true,
    };
  },
  components: { CardFood },
  computed: {
    ...mapGetters(["getBestFood"]),
  },
  created() {
    this.$store
      .dispatch("fetchBestFoods")
      .then((res) => {
        this.loading = false;
      })
      .catch((ex) => {
        this.loading = false;
      });
  },
};
</script>

<style>
</style>