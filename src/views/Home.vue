<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col class="pa-0 pt-5" v-for="product in products" :key="product._id">
      <h1>{{product.name}}</h1>
      <span style="font-style: 30px">{{product.price}}</span>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.getProductList()
  },
  methods: {
    getProductList() {
      axios.get('https://bardemu-backend.herokuapp.com/product').then((res) => {
        this.products = res.data.products
        console.log(res)
      }).catch((e) => {
        console.log(e.response)
      })
    }
  }
}
</script>

<style>

</style>