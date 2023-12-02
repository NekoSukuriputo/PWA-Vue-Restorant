<template>
  <div>
    <h1 class="font-weight-regular">
      Keranjang
      <span class="font-weight-bold">Saya</span>
    </h1>
    <div class="mt-5">
      <v-data-table
        :headers="headers"
        :items="getCart"
        hide-default-footer
        :loading="loading"
      >
        <template v-slot:item.index="{ item, index }">
          {{ getCart.indexOf(item) + 1 }}
        </template>
        <template v-slot:item.products.gambar="{ item }">
          <div class="ma-5">
            <v-img
              class="pa-2"
              :aspect-ratio="16 / 9"
              width="200"
              :src="'/img/foods/' + item.products.gambar"
            ></v-img>
          </div>
        </template>
        <template v-slot:item.keterangan="{ item }">
          {{ item.keterangan == "" ? "-" : item.keterangan }}
        </template>
        <template v-slot:item.products.harga="{ item }">
          {{ item.products.harga | rupiah }}
        </template>
        <template v-slot:item.total="{ item }">
          {{ (item.products.harga * parseInt(item.jumlah_pemesanan)) | rupiah }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn icon color="primary" @click="editItem(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="deleteItem(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <div class="d-flex flex-row-reverse mt-10">
      <v-flex lg5 md5 sm12 class="align-self-end">
        <span class="font-weight-bold align-self-end mr-15 mt-1 mb-10"
          >Total : {{ calTotal | rupiah }}
        </span>
        <v-text-field v-model="nama" outlined label="Nama"></v-text-field>
        <v-text-field
          v-model="noMeja"
          outlined
          label="Nomor Meja"
        ></v-text-field>
        <v-btn
          color="green darken-1"
          dark
          @click="addToOrders"
          :loading="loading2"
          :disabled="loading2"
        >
          <v-icon left dark>mdi-cart-outline</v-icon>
          Pesan
        </v-btn>
      </v-flex>
    </div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"
            >{{ foodEdit.products.nama }} -
            {{ foodEdit.products.harga | rupiah }}</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="foodEdit.jumlah_pemesanan"
                  label="Jumlah"
                  type="number"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                  v-model="foodEdit.keterangan"
                  label="Keterangan"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateCart">
            Perbaharui
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "#", value: "index" },
        { text: "Foto", value: "products.gambar" },
        { text: "Makanan", value: "products.nama" },
        { text: "Keterangan", value: "keterangan" },
        { text: "Jumlah", value: "jumlah_pemesanan" },
        { text: "Harga", value: "products.harga" },
        { text: "Tota Harga", value: "total" },
        { text: "", value: "action" },
      ],
      nama: "",
      noMeja: "",
      loading: false,
      loading2: false,
      dialog: false,
      foodEdit: {
        jumlah_pemesanan: "",
        keterangan: "",
        products: {
          nama: "",
          harga: 0,
        },
      },
    };
  },
  created() {
    this.fetchCart();
    this.nama= this.getUser.nama
  },
  computed: {
    ...mapGetters(["getCart","getUser"]),
    calTotal() {
      let total = 0;
      if (this.getCart.length == 0) {
        return 0;
      } else {
        this.getCart.forEach((item) => {
          total = total + item.jumlah_pemesanan * item.products.harga;
        });
        return total;
      }
    },
  },
  methods: {
    fetchCart() {
      this.loading = true;
      this.$store
        .dispatch("fetchCart")
        .then((res) => {
          this.loading = false;
        })
        .catch((ex) => {
          console.log("ex", ex);
          this.loading = false;
        });
    },
    deleteItem(item) {
      this.$swal({
        title: "Apakah anda yakin?",
        html: `Anda akan menghapus pesanan <b>${item.products.nama}</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal("Terhapus!", "Pesanan Anda Telah dihapus.", "success");
          this.$store.dispatch("removeToCart", item);
        }
      });
    },
    editItem(item) {
      this.foodEdit = item;
      this.dialog = true;
    },
    updateCart() {
      // console.log('this.foodEdit', this.foodEdit)
      this.$store
        .dispatch("updateToCart", this.foodEdit)
        .then((res) => {
          this.$swal("Berhasi!", "Pesanan Anda Telah diperbaharui.", "success");
        })
        .catch((ex) => {
          this.$swal("Gagal!", "Pesanan Anda Gagal diperbaharui.", "error");
        })
        .finally(() => {
          this.dialog = false;
          this.fetchCart();
        });
    },
    async addToOrders() {
      try {
        this.loading2 = true;
        let order = {
          nama: this.nama,
          noMeja: this.noMeja,
          keranjangs: this.getCart,
        };
        await this.$store.dispatch("addToOrder", order);
        // this.getCart.forEach(item => {
        //   this.$store.dispatch("removeToCart",item)
        // })
        this.loading2 = false;
        this.$swal("Berhasi!", "Pesanan Anda Telah dibuat.", "success");
        this.$router.push("/ordersuccess");
      } catch (error) {
        this.loading2 = false;
        this.$swal("Berhasi!", "Pesanan Anda Gagal dibuat.", "error");
      }
    },
  },
};
</script>

<style>
</style>