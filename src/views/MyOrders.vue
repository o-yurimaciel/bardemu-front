<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="10" class="pa-0 d-flex justify-center flex-column mx-auto pt-10">
      <v-row no-gutters>
        <v-col cols="12" class="pa-0 d-flex flex-column">
          <v-breadcrumbs
            class="pa-0"
            :items="items"
            divider="/"
          ></v-breadcrumbs>
          <h1>Meus pedidos</h1>
        </v-col>
      </v-row>
      <v-col lg="8" cols="12" class="pa-0 pt-5" v-if="orders && orders.length > 0">
        <v-row no-gutters>
          <v-col cols="12" class="pa-0 mt-5" v-for="order in orders" :key="order._id">
            <v-card
            class="elevation-1"
            >
              <v-card-title class="text-h5">
                Pedido {{formatDate(order.createdAt)}}
              </v-card-title>
              <v-card-subtitle>{{order.description}}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { bardemu } from '../services'
export default {
  data: () => ({
    items: [
      { text: 'Início', href: '/' }
    ],
    orders: []
  }),
  mounted() {
    this.getOrders()
  },
  methods: {
    formatDate(date) {
      const { format } = require('date-fns')
      return new Date(date).toLocaleDateString().concat(" ").concat(format(new Date(date), "HH:mm:ss"))
    },
    getOrders() {
      bardemu.get('/user/orders', {
        params: {
          userId: this.$store.state.userId,
          token: this.$store.state.auth
        }
      }).then((res) => {
        console.log(res)
        this.orders = res.data
      }).catch((e) => {
        console.log(e.response)
        this.$store.dispatch('openAlert', {
          message: e.response.data.message,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style>

</style>