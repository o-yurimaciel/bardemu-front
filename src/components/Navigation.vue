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
        <hr style="color:#e41c38 ">
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
  export default {
    data: () => ({
      items: [
        { icon: 'mdi-home', title: 'Inicio', to: '/' },
        { icon: 'mdi-food', title: 'Cardápio', to: '/menu' },
        { icon: 'mdi-cart', title: 'Carrinho (0)', to: '/' },
        { icon: 'mdi-whatsapp', title: 'WhatsApp', to: '/' },
        { icon: 'mdi-instagram', title: 'Instagram', to: '/' },
      ],
    }),
    computed: {
      ...mapGetters({
        cart: 'getCart'
      })
    },
    watch: {
      cart() {
        if(this.cart && this.cart.length && this.cart.length > 0) {
          this.items[2].title = `Carrinho (${this.cart.length})`
        }
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