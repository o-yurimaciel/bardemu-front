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
      <!-- <v-col lg="8" cols="12" class="pa-0 pt-5" v-if="orders && orders.length > 0">
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
      </v-col> -->
      <v-col lg="8" cols="12" class="pa-0 pt-5">
        <v-row no-gutters>
          <v-col cols="12" class="pa-0 mt-5 mb-5" v-for="order in orders" :key="order._id">
            <span class="d-flex align-start" style="font-weight: bold">
              <v-icon color="var(--primary-color)" class="pr-3">mdi-calendar-range</v-icon>
              <span>
                {{formatDate(order.createdAt)}}<br>
                <span style="fontSize: 0.9em">{{formatHour(order.createdAt)}}</span>
              </span>
            </span>
            <v-card
            class="elevation-1 pa-2 mt-3 pb-5"
            >
              <v-card-title class="text-h5">
                <v-icon class="mr-2" color="var(--primary-color)">{{getOrderIcon(order.orderStatus)}}</v-icon>
                <span style="fontSize: 1em">{{formatStatus(order.orderStatus)}}</span>
              </v-card-title>
              <hr class="mt-2 mb-5 mx-auto" style="width: 98%; opacity: .5">
              <v-col
              v-for="product in order.products" :key="product._id"
              class="pa-0 mx-auto" cols="11">
                <v-row no-gutters class="d-flex align-center">
                  <v-col lg="8" cols="12" class="pa-0 d-flex flex-column">
                    <v-col class="pa-0">
                      <span class="product-title" style="fontSize: 1em">
                        {{product.quantity + 'x'}} {{product.name}}
                      </span>
                    </v-col>
                    <v-col class="pa-0" v-if="product.note">
                      <span class="product-description" style="fontSize: 1em">
                        Observação: {{product.note}}
                      </span>
                    </v-col>
                  </v-col>
                  <v-col class="pa-0 d-flex justify-lg-end justify-start">
                    <span class="product-price" style="fontSize: 1em">
                      {{product.price * product.quantity | currency}}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
              <hr class="mt-5 mb-5 mx-auto" style="width: 98%; opacity: .5">
              <v-col class="pa-0 d-flex justify-center pt-2">
                <v-btn
                outlined
                color="var(--primary-color)"
                @click="goToOrder(order._id)"
                >
                <span class="d-flex align-center">
                  <v-icon class="mr-1">mdi-plus-thick</v-icon>
                  Detalhes
                </span>
                </v-btn>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
const orderHistoryStatusOptions = Object.freeze({
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
})

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
    goToOrder(orderId) {
      this.$router.push(`/pedido/${orderId}`)
    },
    formatHour(date) {
      const { format } = require('date-fns')
      return format(new Date(date), "HH:mm")
    },
    getOrders() {
      bardemu.get('/user/orders', {
        params: {
          userId: this.$store.state.userId,
          token: this.$store.state.auth
        }
      }).then((res) => {
        this.orders = res.data.sort((a, b) => {
          return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
        })
      }).catch((e) => {
        if(e.response && e.response.data) {
          this.$store.dispatch('openAlert', {
            message: e.response.data.message,
            type: 'error'
          })
        }
      })
    },
    formatStatus(status) {
      switch(status) {
        case orderHistoryStatusOptions.PENDING:
          return "Pedido aguardando confirmação"
        case orderHistoryStatusOptions.CONFIRMED:
          return "O pedido está sendo preparado e logo sairá para entrega"
        case orderHistoryStatusOptions.OUT_FOR_DELIVERY:
          return "O pedido saiu para entrega"
        case orderHistoryStatusOptions.DELIVERED:
          return "O pedido foi entregue. Obrigado!"
        case orderHistoryStatusOptions.CANCELLED:
          return "O pedido foi cancelado"
      }
    },
    getOrderIcon(status) {
      switch(status) {
        case orderHistoryStatusOptions.PENDING:
          return "mdi-cart-arrow-up"
        case orderHistoryStatusOptions.CONFIRMED:
          return "mdi-cart-check"
        case orderHistoryStatusOptions.OUT_FOR_DELIVERY:
          return "mdi-bike-fast"
        case orderHistoryStatusOptions.DELIVERED:
          return "mdi-check-circle"
        case orderHistoryStatusOptions.CANCELLED:
          return "mdi-cancel"
      }
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    formatDate(date) {
      const { format } = require("date-fns")
      const { ptBR } = require('date-fns/locale')

      if(date) {
        const getWeekDay = format(new Date(date), "EEEE/", {
          locale: ptBR
        }).replace("/", ", ");
      
        const getDay = format(new Date(date), "d/").replace("/", " de ");
      
        const getMonth = format(new Date(date), "MMMM", {
          locale: ptBR
        })
      
        return this.capitalize(getWeekDay) + getDay + this.capitalize(getMonth);
      } else {
        const getWeekDay = format(new Date(), "EEEE/", {
          locale: ptBR
        }).replace("/", ", ");
      
        const getDay = format(new Date(), "d/").replace("/", " de ");
      
        const getMonth = format(new Date(), "MMMM", {
          locale: ptBR
        })
      
        return this.capitalize(getWeekDay) + getDay + this.capitalize(getMonth);
      }
    }
  }
}
</script>

<style>

</style>