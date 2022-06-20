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
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon color="#e41c38">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <span class="navigation-menu">
                {{ item.title }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <hr style="opacity: 0.2;">
        <v-list-item
          link
          to="/painel"
        >
          <v-list-item-icon>
            <v-icon color="#e41c38">mdi-cog</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <span class="navigation-menu">
                Painel
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
      cartTotalValue: 0,
      items: [
        { icon: 'mdi-home', title: 'Inicio', to: '/' },
        { icon: 'mdi-food', title: 'Cardápio', to: '/menu' },
        { icon: 'mdi-cart', title: 'Carrinho (0)', to: '/carrinho' },
      ],
    }),
    computed: {
      ...mapGetters({
        cart: 'getCart'
      })
    },
    mounted() {
      EventBus.$on('update-cart', (cart) => {
        this.syncCart(cart)
      })
    },
    methods: {
      currency(value) {
        return this.$options.filters.currency(value) ? this.$options.filters.currency(value) : "R$ 0,00"
      },
      syncCart(cart) {
        if(cart) {
          this.cartQuantity = 0
          this.cartTotalValue = 0

          const currentCart = cart ? cart : []
          currentCart.filter((product) => {
            this.cartQuantity = this.cartQuantity + product.quantity
            this.cartTotalValue = this.cartTotalValue + product.price * product.quantity
          })
        } else {
          this.cartQuantity = 0
          this.cartTotalValue = 0
        }

        this.items[2].title = `Carrinho (${this.cartQuantity}) - ${this.currency(this.cartTotalValue)}`
      } 
    },
    watch: {
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
</style>