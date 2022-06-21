<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col class="pa-0 pt-5 d-flex flex-column" offset="1">
      <v-breadcrumbs
        class="pa-0"
        :items="items"
        divider="/"
      ></v-breadcrumbs>
      <h1>Carrinho</h1>
      <v-col cols="10" class="pa-0 pt-15 d-flex justify-center" v-if="cart && cart.length > 0">
        <v-col class="pa-0" cols="8">
          <v-card
          class="mx-auto elevation-1"
          height="100%"
          width="100%"
          >
            <v-card-title>
              <v-row no-gutters class="d-flex justify-space-between">
                <span>
                  {{getTotalQuantity()}} 
                </span>
                <span v-if="cart.length > 0">
                  Total: {{getTotalValue() | currency}}
                </span>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-col class="pa-0 pt-3 pl-5 pr-5" style="position: relative" v-for="product in cart" :key="product._id">
              <v-icon color="red" style="position: absolute; top: 15px; right: 20px;" @click="removeAllItems(product)">mdi-delete</v-icon>
              <v-row no-gutters class="d-flex align-center">
                <v-col cols="2" class="pa-0">
                  <img :src="product.image" width="100%" height="100%" alt="">
                </v-col>
                <v-col cols="8" class="pa-0 ml-5">
                  <v-col class="pa-0 d-flex flex-column">
                    <span class="product-title">
                      {{product.name}}
                    </span>
                    <span class="product-description">
                      {{product.description}}
                    </span>
                    <span class="product-price">
                      {{product.price * product.quantity | currency}}
                    </span>
                  </v-col>
                </v-col>
                <v-col class="pa-0">
                  <v-row no-gutters class="d-flex align-center justify-space-between">
                    <v-icon color="red" @click="removeItem(product)">mdi-minus</v-icon>
                    <span>{{product.quantity}}</span>
                    <v-icon color="green" @click="addItem(product)">mdi-plus</v-icon>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="pa-0 pa-5 d-flex flex-column mx-auto pt-10">
              <v-btn 
              color="red"
              :outlined="false"
              >
                <span style="color: #fff">Finalizar pedido</span>
              </v-btn>
              <v-btn
              outlined
              color="#fff"
              @click="goToMenu"
              >
                <span style="color: red">Continuar comprando</span>
              </v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-col>
      <v-col cols="10" class="pa-0 d-flex justify-center pt-10" v-else>
        <span class="product-title">Não há nenhum produto no carrinho.</span>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      items: [
        { text: 'Home', href: '/' },
        { text: 'Cardápio', href: '/menu' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart'
    })
  },
  methods: {
    goToMenu() {
      this.$router.push('/menu')
    },
    getTotalQuantity() {
      let quantity = 0
      this.cart.filter((product) => {
        quantity = quantity + product.quantity
      })
      return quantity > 1 ? `${quantity} produtos no carrinho` : '1 produto no carrinho'
    },
    getTotalValue() {
      let value = 0
      this.cart.filter((product) => {
        value = value + parseFloat(product.price * product.quantity)
      })
      return value
    },
    addItem(item) {
      item.quantity = item.quantity ? item.quantity + 1 : 1
      this.$store.dispatch('addToCart', item).then(() => {
        this.$forceUpdate()
      })
    },
    removeAllItems(item) {
      this.$store.dispatch('removeAllToCart', item).then(() => {
        this.$forceUpdate()
      })
    },
    removeItem(item) {
      item.quantity--
      this.$store.dispatch('removeToCart', item).then(() => {
        this.$forceUpdate()
      })
    }
  }
}
</script>

<style>

</style>