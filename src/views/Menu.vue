<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col class="pa-0 pt-10 d-flex flex-column">
      <v-col offset="1" class="pa-0">
        <v-breadcrumbs
          class="pa-0"
          :items="items"
          divider="/"
        ></v-breadcrumbs>
        <h1>Cardápio</h1>
      </v-col>
      <v-col cols="10" lg="5" class="pa-0 pt-10 d-flex justify-center mx-auto">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="category in categories"
            :key="category._id"
            @click="getList(category.name)"
          >
            <v-expansion-panel-header>
              {{category.name}}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-col class="pa-0 pb-5" 
              v-for="(product) in list" 
              :key="product.id" 
              style="cursor: pointer"
              title="Ver produto"
              @click="openProduct(product)">
                <v-row no-gutters>
                  <v-col lg="2" cols="12" class="pa-0 d-flex justify-center align-center">
                    <img class="product-img elevation-2" :src="product.image">
                  </v-col>
                  <v-col offset-lg="1" class="pa-0 d-flex flex-column align-center">
                    <v-col class="pa-0 pt-4 pt-lg-0 d-flex justify-center justify-lg-start text-center text-lg-left">
                      <span class="product-title">{{product.name}}</span>
                    </v-col>
                    <v-col class="pa-0 pt-4 pt-lg-0 d-flex justify-center justify-lg-start text-center text-lg-left">
                      <span class="product-description">{{product.description}}</span>
                    </v-col>
                    <v-col class="pa-0 d-flex align-center pt-4 pt-lg-0">
                      <v-row no-gutters class="d-flex align-center justify-space-between">
                        <v-col cols="12" lg="9" class="pa-0 d-flex justify-center justify-lg-start">
                          <span class="product-price">{{product.price | currency}}</span>
                        </v-col>
                      </v-row>
                    </v-col>
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      items: [
        { text: 'Início', href: '/' },
        { text: 'Carrinho', href: '/carrinho' }
      ],
      categories: [],
      products: [],
      list: []
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart'
    })
  },
  async mounted() {
    console.log(this.cart)
    await this.getCategories()
    await this.getProductList()
  },
  watch: {
    cart() {
      this.concatCart()
    }
  },
  methods: {
    concatCart() {
      const currentCart = this.cart ? this.cart : []
      currentCart.map((item) => {
        this.products.map((product, index) => {
          if(product._id === item._id) {
            this.products[index].quantity = item.quantity ? item.quantity : 0
            this.$forceUpdate()
          }
        })
      })
    },
    getCartQuantity(id) {
      const currentCart = this.cart ? this.cart : []
      const result = currentCart.filter((product) => product._id === id)
      if(result && result.quantity) {
        return result.quantity
      } else {
        return 0
      }
    },
    getCategories() {
      bardemu.get('/category')
      .then((res) => {
        this.categories = res.data.sort((a, b) => a.order - b.order)
        console.log(res)
      }).catch((e) => {
        console.log(e.response)
      })
    },
    getProductList() {
      bardemu.get('/product').then((res) => {
        this.products = res.data
        this.concatCart()
        console.log(res)
      }).catch((e) => {
        console.log(e.response)
      })
    },
    getList(categoryName) {
      this.list = this.products.filter((product) => product.category === categoryName)
    },
    openProduct(product) {
      console.log('product', product)
    }
  }
}
</script>

<style>
.product-img {
  border-radius: 5px;
  height: 100%;
  max-height: 100px;
  width: 100px;
  max-width: 200px;
  max-height: 100px;
  min-height: 100px;
}

.product-title {
  font-family: 'Roboto', sans-serif;
  font-size: 1.4em;
  letter-spacing: 1.5px;
  color: black;
}

.product-description {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 1em;
  color: black;
}

.product-price {
  font-family: 'Roboto', sans-serif;
  font-size: 1.5em;
  font-weight: 700;
  color: #e41c38;
}
</style>