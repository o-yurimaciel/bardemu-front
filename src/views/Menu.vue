<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col class="pa-0 pt-5 d-flex flex-column">
      <v-col offset="1" class="pa-0">
        <v-breadcrumbs
          class="pa-0"
          :items="items"
          divider="/"
        ></v-breadcrumbs>
        <h1>Cardápio</h1>
      </v-col>
      <v-col cols="5" class="pa-0 pt-10 d-flex justify-center mx-auto">
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
              <v-col class="pa-0 pb-3" v-for="product in list" :key="product.id">
                <v-row no-gutters>
                  <v-col cols="2" class="pa-0">
                    <img class="product-img" :src="product.image" width="100" height="100%" alt="">
                  </v-col>
                  <v-col offset="1" class="pa-0 d-flex flex-column">
                    <v-col class="pa-0">
                      <span class="product-title">{{product.name}}</span>
                    </v-col>
                    <v-col class="pa-0">
                      <span class="product-description">{{product.description}}</span>
                    </v-col>
                    <v-col class="pa-0 d-flex align-center">
                      <v-row no-gutters class="d-flex align-center justify-space-between">
                        <v-col cols="9" class="pa-0">
                          <span class="product-price">R$ {{product.price}}</span>
                        </v-col>
                        <v-col class="pa-0 d-flex justify-end">
                          <v-row no-gutters class="d-flex justify-space-between align-center">
                            <v-icon 
                            color="red"
                            title="Remover do carrinho"
                            size="30" 
                            @click="removeItem(product)">
                              mdi-minus
                            </v-icon>
                            <span>{{product.quantity ? product.quantity : 0}}</span>
                            <v-icon 
                            size="30"
                            title="Adicionar ao carrinho"
                            color="green" 
                            @click="addItem(product)">
                              mdi-plus
                            </v-icon>
                          </v-row>
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
        { text: 'Home', href: '/' }
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
      if(this.cart && this.cart.length > 0) {
        this.cart.map((item) => {
          this.products.map((product, index) => {
            if(product._id === item._id) {
              this.products[index].quantity = item.quantity ? item.quantity : 1
              this.$forceUpdate()
            }
          })
        })
      }
    },
    getCartQuantity(id) {
      if(this.cart && this.cart.length > 0) {
        const result = this.cart.filter((product) => product._id === id)
        if(result.quantity) {
          return result.quantity
        } else {
          return 0
        }
      }
      return 0
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
        this.products = res.data.products
        this.concatCart()
        console.log(res)
      }).catch((e) => {
        console.log(e.response)
      })
    },
    getList(categoryName) {
      this.list = this.products.filter((product) => product.category === categoryName)
    },
    addItem(item) {
      this.$store.dispatch('addToCart', item)
    },
    removeItem(item) {
      this.$store.dispatch('openAlert', {
        message: `"${item.name}" foi removido do carrinho`,
        type: 'success'
      })
    }
  }
}
</script>

<style>
.product-img {
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.product-title {
  font-family: 'Roboto', sans-serif;
  font-size: 1.4em;
  letter-spacing: 1.5px;
  color: black;
}

.product-description {
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  font-size: 0.9em;
  color: black;
}

.product-price {
  font-family: 'Roboto', sans-serif;
  font-size: 1.5em;
  font-weight: 700;
  color: #e41c38;
}
</style>