<template>
  <div>
    <v-card class="mx-auto my-12" max-width="374">
      <v-img
        height="250"
        :src="'img/foods/'+data.gambar"
      ></v-img>

      <v-card-title>{{data.nama}}</v-card-title>

      <v-card-text>
        <div>
          <h4>{{data.nama}}</h4>
          <h4>Harga : {{data.harga | rupiah}}</h4>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green darken-1" dark :to="`/foods/${data.id}`">
          <v-icon left dark>mdi-cart-outline</v-icon>
          Pesan
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
    props:['data']
};
</script>

<style>
</style>