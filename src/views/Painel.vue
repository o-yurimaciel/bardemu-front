<template>
  <v-container class="pa-0 ma-0">
    <v-col class="pa-0 d-flex flex-column">
      <h1>Adicionar roduto</h1>
      <v-col cols="6" class="pa-0">
        <label for="name">Nome do produto</label>
        <v-text-field 
        outlined
        dense
        id="name"
        rounded
        v-model="productName">
        </v-text-field>
      </v-col>
      <v-col cols="6" class="pa-0">
        <label for="name">Preço do produto</label>
        <v-text-field 
        outlined
        dense
        id="price"
        rounded
        v-model="price">
        </v-text-field>
      </v-col>
    </v-col>
    <v-btn @click="sendProduct">Enviar</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      productName: '',
      price: ''
    }
  },
  methods: {
    sendProduct() {
      axios.post('https://bardemu-backend.herokuapp.com/product', {
        name: this.productName,
        price: this.price
      }).then((res) => {
        console.log(res)
        this.$router.push('/')
      }).catch((e) => {
        console.log(e.response)
      })
    }
  }
}
</script>

<style>

</style>