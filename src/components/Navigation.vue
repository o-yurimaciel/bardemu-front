<template>
  <v-card
    class="mx-auto"
    height="100%"
    width="100%"
  >
    <v-navigation-drawer
      absolute
      dark
      width="100%"
      color="#fff"
      permanent
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to ? item.to : null"
          @click="item.method ? navigationClick(item) : null"
          :title="item.title"
        >
          <v-list-item-icon style="position: relative">
            <v-icon color="#e41c38">{{ item.icon }}</v-icon>
            <span v-if="item.icon === 'mdi-cart'" class="cart-qtd" style="right: -20px; top: 10%; position: absolute; color: black">{{cartQuantity}}</span>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span class="navigation-menu">
                {{ item.title }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../EventBus'
  export default {
    data: () => ({
      cartQuantity: 0,
      items: [
        { icon: 'mdi-home', title: 'Inicio', to: '/' },
        { icon: 'mdi-food', title: 'Cardápio', to: '/menu' },
        { icon: 'mdi-cart', title: 'Carrinho', to: '/carrinho' }
      ],
    }),
    computed: {
      ...mapGetters({
        cart: 'getCart',
        auth: 'getAuth'
      })
    },
    mounted() {
      EventBus.$on('update-cart', (cart) => {
        this.syncCart(cart)
      })

      if(this.auth) {
        this.items = [
          { icon: 'mdi-home', title: 'Inicio', to: '/' },
          { icon: 'mdi-food', title: 'Cardápio', to: '/menu' },
          { icon: 'mdi-cart', title: 'Carrinho', to: '/carrinho' }
        ]
        
        this.items.push({ icon: 'mdi-clipboard-check-multiple', title: 'Meus pedidos', to: '/meus-pedidos' })
        this.items.push({ icon: 'mdi-account', title: 'Minha conta', to: '/minha-conta' })
      } else {
        this.items = [
          { icon: 'mdi-home', title: 'Inicio', to: '/' },
          { icon: 'mdi-food', title: 'Cardápio', to: '/menu' },
          { icon: 'mdi-cart', title: 'Carrinho', to: '/carrinho' }
        ]

        this.items.push({ icon: 'mdi-account', title: 'Entrar', to: '/login' })
      }
    },
    methods: {
      syncCart(cart) {
        if(cart) {
          this.cartQuantity = 0
          const currentCart = cart ? cart : []
          currentCart.filter((product) => {
            this.cartQuantity = this.cartQuantity + product.quantity
          })
        } else {
          this.cartQuantity = 0
        }
      },
      logout() {
        this.$store.commit('setAuth', false)
        this.$store.commit('setLogin', null)
        this.$router.push('/login')
      },
      navigationClick(item) {
        this[item.method]()
      }
    },
    watch: {
      auth(newState) {
        if(!newState) {
          this.items = [
            { icon: 'mdi-home', title: 'Inicio', to: '/' },
            { icon: 'mdi-food', title: 'Cardápio', to: '/menu' },
            { icon: 'mdi-cart', title: 'Carrinho', to: '/carrinho' },
            { icon: 'mdi-account', title: 'Entrar', to: '/login' }
          ]
        } else {
          this.items = [
            { icon: 'mdi-home', title: 'Inicio', to: '/' },
            { icon: 'mdi-food', title: 'Cardápio', to: '/menu' },
            { icon: 'mdi-cart', title: 'Carrinho', to: '/carrinho' }
          ]

          this.items.push({ icon: 'mdi-clipboard-check-multiple', title: 'Meus pedidos', to: '/meus-pedidos' })
          this.items.push({ icon: 'mdi-account', title: 'Minha conta', to: '/minha-conta' })
        }
      },
      cart(cart) {
        this.syncCart(cart)
      }
    }
  }
</script>

<style>
.navigation-menu {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.1em;
  color: #707070;
}

.cart-qtd {
  font-size: 0.8em;
  font-weight: bold;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  background-color: var(--primary-color);
  border-radius: 20px;
  color: white!important;
}
</style>