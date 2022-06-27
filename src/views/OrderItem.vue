<template>
  <v-container class="ma-0 pa-0">
    <v-col class="pa-0 d-flex flex-column pt-10 pb-10">
      <v-col offset="1" class="pa-0">
        <v-breadcrumbs
          class="pa-0"
          :items="items"
          divider="/"
        ></v-breadcrumbs>
      </v-col>
      <v-col class="pa-0 d-flex justify-center pt-10">
        <span class="orderStatus text-center">
          {{ formatStatus(order.orderStatus) }}
        </span>
      </v-col>
      <v-col cols="8" class="pa-0 d-flex justify-center pt-3 align-center mx-auto" v-if="order.orderStatus !== 'DELIVERED'">
        <v-icon color="var(--primary-color)">mdi-map-marker</v-icon>
        <span class="ml-2">
          Entregar em: {{ formatDeliveryAt(order) }}
        </span>
      </v-col>
      <v-col lg="6" cols="12" class="pa-0 mx-auto pt-10">
        <v-timeline
          reverse
        >
          <v-timeline-item
            color="var(--primary-color)"
            v-for="(item, i) in order.orderStatusHistory"
            :key="i"
            class="pa-5 ma-5"
            fill-dot
            :icon="getTimelineIcon(item.status)"
          >
            <span style="font-weight: 700">{{ formatDate(item.date) }}</span><br>
            {{ formatStatusHistory(item.status) }} <br>
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-col lg="6" cols="11" class="pa-0 mx-auto pt-10">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Detalhamento
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-col
              v-for="userDetail in userDetails" :key="userDetail.description"
              class="pa-0" 
              cols="12">
                <v-row no-gutters class="d-flex align-center" v-if="userDetail.value">
                  <v-col lg="8" cols="12" class="pa-0 d-flex flex-column">
                    <v-col class="pa-0">
                      <span class="product-title">
                        {{ userDetail.description }}
                      </span>
                    </v-col>
                  </v-col>
                  <v-col class="pa-0 d-flex justify-lg-end justify-start">
                    <span class="product-price">
                      {{ userDetail.value }}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
              <hr class="mt-5 mb-5">
              <v-col
              v-for="product in order.products" :key="product._id"
              class="pa-0" 
              cols="12">
                <v-row no-gutters class="d-flex align-center">
                  <v-col lg="8" cols="12" class="pa-0 d-flex flex-column">
                    <v-col class="pa-0">
                      <span class="product-title">
                        {{product.quantity + 'x'}} {{product.name}}
                      </span>
                    </v-col>
                    <v-col class="pa-0" v-if="product.note">
                      <span class="product-description">
                        Observação: {{product.note}}
                      </span>
                    </v-col>
                  </v-col>
                  <v-col class="pa-0 d-flex justify-lg-end justify-start">
                    <span class="product-price">
                      {{product.price * product.quantity | currency}}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
              <hr class="mt-5 mb-5">
              <v-col
              v-for="detail in details" :key="detail.description"
              class="pa-0" 
              cols="12">
                <v-row no-gutters class="d-flex align-center" v-if="detail.value">
                  <v-col lg="8" cols="12" class="pa-0 d-flex flex-column">
                    <v-col class="pa-0">
                      <span class="product-title">
                        {{ detail.description }}
                      </span>
                    </v-col>
                  </v-col>
                  <v-col class="pa-0 d-flex justify-lg-end justify-start">
                    <span class="product-price">
                      {{ detail.value | currency }}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { bardemu } from '../services'

const orderHistoryStatusOptions = Object.freeze({
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED'
})

export default {
  data() {
    return {
      items: [
        { text: 'Início', href: '/' },
      ],
      id: this.$router.history.current.params.id,
      order: {},
      detail: [],
      userDetails: [],
      rating: null
    }
  },
  mounted() {
    this.getOrderItem()
  },
  methods: {
    getTimelineIcon(status) {
      switch(status) {
        case orderHistoryStatusOptions.PENDING:
          return "mdi-cart-arrow-up"
        case orderHistoryStatusOptions.CONFIRMED:
          return "mdi-cart-check"
        case orderHistoryStatusOptions.OUT_FOR_DELIVERY:
          return "mdi-bike-fast"
        case orderHistoryStatusOptions.DELIVERED:
          return "mdi-check-circle"
      }
    },
    getOrderItem() {
      bardemu.get('/order', {
        params: {
          _id: this.id
        }
      }).then((res) => {
        this.order = res.data

        const userDetail = [
          { description: 'Nome', value: this.order.clientName },
          { description: 'Telefone', value: this.order.clientPhone },
          { description: 'Tipo de Pagamento', value: this.order.paymentType },
          { description: 'Bandeira', value: this.order.flag }
        ]

        const detail = [
          { description: 'Entrega', value: '0' },
          { description: 'Total a pagar', value: this.order.totalValue },
          { description: 'Troco', value: this.order.cashChange },
        ]

        this.userDetails = userDetail

        this.details = detail

        setTimeout(() => {
          if(res.data.orderStatus !== 'FINISHED') {
            this.getOrderItem()
          }
        }, 3000);
      }).catch((e) => {
        console.log(e.response)
      })
    },
    formatDate(date) {
      const { format } = require('date-fns')
      return new Date(date).toLocaleDateString().concat(" ").concat(format(new Date(date), "HH:mm:ss"))
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
      }
    },
    formatStatusHistory(status) {
      switch(status) {
        case orderHistoryStatusOptions.PENDING:
          return "Pedido realizado"
        case orderHistoryStatusOptions.CONFIRMED:
          return "Pedido confirmado"
        case orderHistoryStatusOptions.OUT_FOR_DELIVERY:
          return "Pedido saiu para entrega"
        case orderHistoryStatusOptions.DELIVERED:
          return "Pedido foi entregue"
      }
    },
    formatDeliveryAt(order) {
      let string = ""

      if(order.clientAddress) {
        string = string.concat(order.clientAddress)
      }

      if(order.clientAddressNumber) {
        string = string.concat(", " + order.clientAddressNumber)
      }

      if(order.clientAddressData) {
        string = string.concat(" Complemento: " + order.clientAddressData)
      }

      return string
    }
  }
}
</script>

<style>
.orderStatus {
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  font-weight: bold;
}
</style>