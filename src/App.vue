<template>
  <v-main>
    <Header />
    <router-view></router-view>
  </v-main>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>

<style>

</style>