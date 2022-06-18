<template>
  <div>Hello! {{products}}</div>
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
      axios.get('https://bardemu-backend.herokuapp.com/products').then((res) => {
        this.products = res.data
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