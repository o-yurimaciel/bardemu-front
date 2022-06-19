<template>
  <v-app>
    <v-main>
      <v-row no-gutters>
        <v-col cols="2" class="pa-0">
          <Navigation />
        </v-col>
        <v-col class="pa-0">
          <Header />
          <v-col class="pa-0" style="min-height: 100vh">
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

export default {
  components: {
    Header,
    Navigation
  }
}
</script>

<style>
@import url('../src/assets/fonts.css');
</style>