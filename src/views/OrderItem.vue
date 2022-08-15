<template>
  <v-container class="ma-0 pa-0">
    <v-col class="pa-0 d-flex flex-column pt-10 pb-10">
      <v-col cols="11" offset="1" class="pa-0">
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
      <v-col cols="10" class="pa-0 d-flex justify-center pt-3 align-center mx-auto" v-if="order.estimatedTime">
        <v-icon color="var(--primary-color)">mdi-clock-fast</v-icon>
        <span class="ml-2">
          Tempo estimado para entrega: {{order.estimatedTime}}min
        </span>
      </v-col>
      <v-col cols="8" class="pa-0 d-flex justify-center pt-3 align-center mx-auto" v-if="order.orderStatus !== 'DELIVERED'">
        <v-icon color="var(--primary-color)">mdi-map-marker</v-icon>
        <span class="ml-2">
          Entregar em: {{ formatDeliveryAt(order) }}
        </span>
      </v-col>
      <v-col class="pa-0 d-flex justify-center align-center flex-column pt-5" 
      v-if="!rated && order.orderStatus === 'DELIVERED'">
        <span>Avalie a sua experiência</span>
        <span>Escolha de 1 a 5 estrelas para classificar</span>
        <v-rating
          v-model="rating"
          icon-label="custom icon label text {0} of {1}"
          color="yellow"
          background-color="var(--primary-color)"
        ></v-rating>
        <v-textarea
        outlined
        autofocus
        v-if="rating > 0"
        flat
        v-model="ratingMessage"
        class="pt-2"
        placeholder="Descreva a sua experiência aqui"
        style="width: 20vw"
        >
        </v-textarea>
        <v-col class="pa-0 pt-5 d-flex justify-center">
          <v-btn
          outlined
          rounded
          v-if="rating > 0"
          @click="sendFeedback"
          color="var(--primary-color)"
          >
            Enviar
          </v-btn>
        </v-col>
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
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
})

export default {
  data() {
    return {
      items: [
        { text: 'Início', href: '/' },
      ],
      id: this.$router.history.current.params.id,
      order: {},
      details: [],
      userDetails: [],
      rating: 0,
      ratingMessage: null,
      rated: false
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
        case orderHistoryStatusOptions.CANCELLED:
          return "mdi-cancel"
      }
    },
    getOrderItem() {
      bardemu.get('/order', {
        params: {
          _id: this.id,
          token: this.$store.state.auth
        }
      }).then((res) => {
        this.order = res.data
        this.userDetails = [
          { description: 'Nome', value: this.order.clientName },
          { description: 'Telefone', value: this.order.clientPhone },
          { description: 'Tipo de Pagamento', value: this.order.paymentType },
          { description: 'Bandeira', value: this.order.flag }
        ]
        this.details = [
          { description: 'Entrega', value: '0' },
          { description: 'Total a pagar', value: this.order.totalValue },
          { description: 'Troco', value: this.order.cashChange },
        ]

        if(!this.rated) {
          setTimeout(() => {
            if(res.data.orderStatus !== orderHistoryStatusOptions.DELIVERED &&
             res.data.orderStatus !== orderHistoryStatusOptions.CANCELLED) {
              this.getOrderItem()
            }
          }, 5000);

          if(res.data.feedback) {
            this.rated = true
          }
        } else {
          this.getOrderItem()
        }
      }).catch(() => {
        this.$store.dispatch('openAlert', {
          message: 'Não foi possível carregar o pedido. Tente novamente mais tarde.',
          type: 'error'
        })
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
        case orderHistoryStatusOptions.CANCELLED:
          return "O pedido foi cancelado"
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
        case orderHistoryStatusOptions.CANCELLED:
          return "Pedido cancelado"
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
        string = string.concat(" Comp: " + order.clientAddressData)
      }

      return string
    },
    sendFeedback() {
      bardemu.post('/feedback', {
        orderId: this.order._id,
        message: this.ratingMessage,
        rating: this.rating
      }, {
        headers: {
          "x-access-token": this.$store.state.auth
        }
      }).then(() => {
        this.$store.dispatch('openAlert', {
          message: 'Avaliação enviada. Obrigado!',
          type: 'success'
        })
        this.rated = true
        this.getOrderItem()
      }).catch(() => {
        this.$store.dispatch('openAlert', {
          message: 'Erro ao enviar avaliação. Tente novamente mais tarde.',
          type: 'error'
        })
      })
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