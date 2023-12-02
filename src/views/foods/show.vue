<template>
  <div>
    <div class="mt-10">
      <v-layout wrap>
        <v-flex lg6 md6 sm12>
          <v-card class="">
            <v-img
              :aspect-ratio="16 / 9"
              width="600"
              :src="'../img/foods/' + food.gambar"
            ></v-img>
          </v-card>
        </v-flex>
        <v-flex lg5 md5 sm12 class="ml-10 mr-10">
          <h1 class="font-weight-bold pt-1">{{ food.nama }}</h1>
          <v-divider></v-divider>
          <div class="pt-5">
            <h2 class="font-weight-regular">
              Harga
              <span class="font-weight-bold">{{ food.harga | rupiah }}</span>
            </h2>
            <br />
            <v-text-field
              outlined
              label="Jumlah Pesanan"
              type="number"
              v-model="jumlah_pemesanan"
            ></v-text-field>
            <v-text-field
              v-model="keterangan"
              outlined
              label="Keterangan"
              hint="Seperti: pedas, nasi setengah.."
              persistent-hint
            ></v-text-field>
            <v-btn
              color="green darken-1"
              dark
              @click="addToCart"
              :loading="loading"
              :disabled="loading"
            >
              <v-icon left dark>mdi-cart-outline</v-icon>
              Pesan
            </v-btn>
            <span class="ml-5" v-if="calTotal != 0"
              >Total : {{ calTotal | rupiah }}</span
            >
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      food: {
        nama: "",
        harga: 0,
        gambar: "",
      },
      jumlah_pemesanan: "",
      keterangan: "",
      loading: false,
    };
  },
  computed: {
    calTotal() {
      if (this.jumlah_pemesanan == "") {
        return 0;
      } else {
        return parseInt(this.jumlah_pemesanan) * this.food.harga;
      }
    },
  },
  created() {
    this.$store
      .dispatch("fetchFoodByID", this.$route.params.id)
      .then((res) => {
        this.food = res;
      })
      .catch((ex) => {
        console.log("ex", ex);
      });
  },
  methods: {
    addToCart() {
      let cart = {
        products: this.food,
        jumlah_pemesanan: this.jumlah_pemesanan,
        keterangan: this.keterangan,
      };
      // console.log('cart', cart)
      this.loading = true;
      this.$store
        .dispatch("addToCart", cart)
        .then((res) => {
          this.$swal("Sukses", "Berhasil memasukkan ke keranjang", "success");
          this.loading = false;
          this.$router.push('/cart')
        })
        .catch((ex) => {
          this.$swal("Gagal", "Gagal memasukkan ke keranjang", "error");
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>