<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col class="pa-0 pt-10 d-flex flex-column">
      <v-col cols="11" offset="1" class="pa-0">
        <v-breadcrumbs
          class="pa-0"
          :items="items"
          divider="/"
        ></v-breadcrumbs>
        <h1>Cardápio</h1>
      </v-col>
      <v-col class="pa-0 d-flex justify-center mt-15" v-if="loading">
        <v-progress-circular
          color="var(--primary-color)"
          rotate="90"
          size="200"
          indeterminate
        ></v-progress-circular>
      </v-col>
      <v-col cols="10" lg="6" md="8" class="pa-0 pt-10 d-flex justify-center mx-auto" v-else>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="category in categories"
            :key="category._id"
          >
            <v-expansion-panel-header v-if="category.products && category.products.length > 0">
              {{category.name}}
            </v-expansion-panel-header>
            <v-expansion-panel-content v-if="category.products && category.products.length > 0">
              <v-col class="pa-0 pb-5" 
              v-for="(product) in category.products" 
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
    <v-dialog 
      v-model="dialog"
      class="dialog ma-0"
      style="box-shadow: none!important"
    >
      <v-card
      width="100%!important"
      style="position: relative"
      class="product-card pa-5 elevation-0"
      min-height="50vh"
      >
        <v-col cols="12" lg="6" class="pa-0 d-flex flex-column mx-auto">
          <v-col cols="8" class="pa-0 mx-auto d-flex justify-center">
            <img width="200px" height="200px" class="elevation-2" :src="productSelected.image" alt="">
          </v-col>
          <v-col class="pa-0 pt-5">
            <v-row no-gutters class="d-flex align-center">
              <v-col class="pa-0" cols="12" lg="10">
                <v-col class="pa-0 d-flex justify-center justify-lg-start flex-grow-0">
                  <span class="product-title">{{productSelected.name}}</span>
                </v-col>
                <v-col class="pa-0 d-flex justify-center justify-lg-start flex-grow-0">
                  <span class="product-description">{{productSelected.description}}</span>
                </v-col>
                <v-col class="pa-0 d-flex justify-center flex-grow-0 justify-lg-start">
                  <span class="product-price">
                    {{quantity > 0 ? productSelected.price * quantity : '0' | currency}}
                  </span>
                </v-col>
              </v-col>
              <v-col class="pa-0 d-flex justify-space-around pt-5">
                <v-icon @click="quantity > 0 ? quantity-- : null" color="var(--primary-color)">mdi-minus</v-icon>
                <span>{{quantity}}</span>
                <v-icon @click="quantity++" color="green">mdi-plus</v-icon>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="pa-0 pt-3">
            <label for="obs">Adicione uma observação</label>
            <v-textarea
            outlined
            id="obs"
            v-model="note"
            >
            </v-textarea>
          </v-col>
          <v-col class="pa-0 d-flex align-center justify-center flex-row">
            <v-btn
            :disabled="quantity <= 0"
            @click="addToCart"
            color="green"
            > 
              <v-icon class="mr-2" color="#fff">mdi-cart</v-icon>
              <span style="color: #fff">
                Adicionar ao carrinho
              </span>
            </v-btn>
          </v-col>
        </v-col>
        <v-icon 
          style="position: absolute; top: 15px; right: 15px" 
          color="red"
          title="Fechar"
          size="30"
          @click="dialog = false"
        >
          mdi-close-box
        </v-icon>
      </v-card>
    </v-dialog>
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
      list: [],
      loading: true,
      dialog: false,
      productSelected: {},
      quantity: 1,
      note: ""
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart'
    })
  },
  async mounted() {
    await this.getCategories()
  },
  methods: {
    openProduct(product) {
      this.quantity = 1
      this.note = ""
      this.dialog = true
      this.productSelected = product
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
      bardemu.get('/categories')
      .then((res) => {
        this.categories = res.data.sort((a, b) => a.order - b.order)
        this.categories.filter((category) => {
          category.products = []
        })
        this.getProductList()
      }).catch(() => {
        this.$store.dispatch('openAlert', {
          message: 'Não foi possível carregar as categorias. Tente novamente mais tarde.',
          type: 'error'
        })
      })
    },
    getProductList() {
      bardemu.get('/products').then((res) => {
        this.loading = false
        this.categories.filter((category) => {
          res.data.filter((product) => {
            if(product.category === category.name) {
              category.products.push(product)
            }
          })
        })
      }).catch((e) => {
        console.log(e)
        this.$store.dispatch('openAlert', {
          message: 'Não foi possível carregar os produtos. Tente novamente mais tarde.',
          type: 'error'
        })
      })
    },
    addToCart() {
      this.productSelected.quantity = this.quantity
      this.productSelected.note = this.note
      this.$store.dispatch('addToCart', this.productSelected)
      this.dialog = false
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

.v-dialog {
  width: 50%!important;
}

@media (max-width: 1024px) {
  .v-dialog {
    width: 100%!important;
  }

  .product-card {
    width: 93%!important;
  }
}
</style>