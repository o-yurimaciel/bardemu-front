<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="10" class="pa-0 pt-5">
      <v-row no-gutters class="d-flex justify-space-between">
        <v-col class="pa-0 d-flex flex-column">
          <h1>Produtos</h1>
          <v-breadcrumbs
            class="pa-0"
            :items="items"
            divider="/"
          ></v-breadcrumbs>
        </v-col>
        <v-btn 
        color="green"
        class="text-capitalize"
        >
          <span @click="addProduct" style="color: #fff">Adicionar Produto</span>
        </v-btn>
      </v-row>
      <v-col class="pa-0 pt-10">
        <v-row no-gutters>
          <v-col cols="3" class="pa-0 pa-2" v-for="product in products" :key="product._id">
            <v-card
              class="mx-auto"
            >
              <v-img
                height="200"
                src="https://fermello.com.br/wp-content/themes/consultix/images/no-image-found-360x260.png"
              ></v-img>

              <v-card-title>{{product.name}}</v-card-title>

              <v-card-text>
                <div>{{product.description ? product.description : ''}}</div>
                <div>R$ {{product.price}}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <v-row no-gutters class="d-flex justify-end">
                  <v-btn
                    color="green"
                    text
                  >
                    Editar
                  </v-btn>
                  <v-btn
                    color="red"
                    text
                  >
                    Remover
                  </v-btn>
                </v-row>
              </v-card-actions>
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
  data() {
    return {
      products: [],
      items: [
        { text: 'Home', href: '/' },
        { text: 'Painel', href: '/painel'}
      ]
    }
  },
  mounted() {
    this.getProductList()
  },
  methods: {
    addProduct() {
      console.log('a')
    },
    getProductList() {
      bardemu.get('/product').then((res) => {
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