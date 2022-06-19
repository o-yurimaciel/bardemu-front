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
          v-for="([icon, text], i) in items"
          :key="i"
          link
        >
          <v-list-item-icon>
            <v-icon color="#e41c38">{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <span class="navigation-menu">
                {{ text }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        ['mdi-home', 'Inicio'],
        ['mdi-food', 'Cardápio'],
        ['mdi-cart', 'Carrinho'],
        ['mdi-whatsapp', 'WhatsApp'],
        ['mdi-instagram', 'Instagram'],
      ],
    }),
  }
</script>

<style>
.navigation-menu {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.1em;
  color: #707070;
}
</style>