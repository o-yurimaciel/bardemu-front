<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="10" class="pa-0 pt-5">
      <v-row no-gutters class="d-flex justify-space-between">
        <v-col class="pa-0 d-flex flex-column">
          <v-breadcrumbs
            class="pa-0"
            :items="items"
            divider="/"
          ></v-breadcrumbs>
          <h1>Produtos</h1>
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
              width="300"
            >
              <v-img
                height="200"
                :src="product.image ? product.image : 'https://fermello.com.br/wp-content/themes/consultix/images/no-image-found-360x260.png'"
              ></v-img>

              <v-card-title>{{product.name}}</v-card-title>

              <v-card-text v-if="product.description">
                <div>{{product.description}}</div>
              </v-card-text>

              <v-card-text v-if="product.price">
                <div>{{product.price | currency}}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <v-row no-gutters class="d-flex justify-end">
                  <v-btn
                    color="green"
                    text
                    @click="editProduct(product)"
                  >
                    Editar
                  </v-btn>
                  <v-btn
                    color="red"
                    text
                    @click="deleteProduct(product)"
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
    editProduct(product) {
      this.$router.push(`/produto/${product._id}`)
    },
    addProduct() {
      this.$router.push({
        name: 'product-item'
      })
    },
    deleteProduct(product) {
      bardemu.delete('/product', {
        data: {
          _id: product._id
        }
      }).then((res) => {
        console.log(res)
        this.getProductList()
      }).catch((e) => {
        console.log(e)
      })
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