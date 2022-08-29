<template>
  <v-container fluid class="pa-0 ma-0">
    <Welcome />
    <Feedbacks />
    <footer>
      <Footer />
    </footer>
  </v-container>
</template>

<script>
import Welcome from '../components/Welcome'
import Feedbacks from '../components/Feedbacks'
import Footer from '../components/Footer'

export default {
  components: {
    Welcome,
    Feedbacks,
    Footer
  }
}
</script>

<style scoped>
</style>