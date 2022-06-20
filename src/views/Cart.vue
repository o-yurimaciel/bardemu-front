<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col class="pa-0 pt-5 d-flex flex-column" offset="1">
      <v-breadcrumbs
        class="pa-0"
        :items="items"
        divider="/"
      ></v-breadcrumbs>
      <h1>Carrinho</h1>
      <v-col cols="10" class="pa-0 pt-15 d-flex justify-center">
        <v-col class="pa-0" cols="6">
          <v-card
          class="mx-auto elevation-1"
          height="100%"
          width="100%"
          >
            <v-card-title>
              <v-row no-gutters class="d-flex justify-space-between">
                <span>
                  1 produto no carrinho
                </span>
                <span>
                  Total: {{totalValue | currency}}
                </span>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-col class="pa-0 pa-5" v-for="product in cart" :key="product._id">
              <v-row no-gutters class="d-flex align-center">
                <v-col cols="2" class="pa-0">
                  <img :src="product.image" width="100%" height="100%" alt="">
                </v-col>
                <v-col cols="8" class="pa-0">
                  <v-col class="pa-0 d-flex flex-column">
                    <span>{{product.name}}</span>
                    <span>{{product.description}}</span>
                    <span>{{product.price * product.quantity | currency}}</span>
                  </v-col>
                </v-col>
                <v-col class="pa-0">
                  <v-row no-gutters class="d-flex align-center justify-space-between">
                    <v-icon>mdi-delete</v-icon>
                    <v-icon>mdi-minus</v-icon>
                    <span>1</span>
                    <v-icon>mdi-plus</v-icon>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </v-col>
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
      ],
      totalValue: 0
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart'
    })
  }
}
</script>

<style>

</style>