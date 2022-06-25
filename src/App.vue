<template>
  <v-app>
    <v-main>
      <v-row no-gutters>
        <v-col cols="2" class="pa-0">
          <Navigation />
        </v-col>
        <v-col class="pa-0">
          <Header />
          <v-col class="pa-0 content" style="min-height: 100vh">
            <v-alert 
            v-if="alert" 
            style="position: absolute"
            max-width="400px"
            :type="alert.type"
            class="alert">
              {{alert.message}}
            </v-alert>
            <router-view></router-view>
          </v-col>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
const EventBus = require('../src/EventBus').EventBus

export default {
  components: {
    Header,
    Navigation
  },
  data() {
    return {
      alert: false
    }
  },
  mounted() {
    const auth = localStorage.getItem('bardemuAuth')
    const cart = localStorage.getItem('bardemuCart')

    this.$store.commit('setAuth', auth === 'false' ? false : true)
    this.$store.commit('setCart', JSON.parse(cart))
    
    EventBus.$on('alert', (alert) => {
      this.alert = false
      this.alert = alert
      setTimeout(() => {
        this.alert = false
      }, 5000);
    })
  }
}
</script>

<style>
:root {
  --primary-color: #e41c38;
}

@import url('../src/assets/fonts.css');

.content {
  position: relative;
}

.alert {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>