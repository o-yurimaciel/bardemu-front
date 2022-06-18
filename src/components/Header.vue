<template>
  <header>
    <v-row no-gutters>
      <v-col cols="8" class="pa-0">
        <h1>Bardemu</h1>
      </v-col>
      <h2>Produtos</h2>
      <h2 @click="goToPainel">Painel</h2>
    </v-row>
  </header>
</template>

<script>
export default {
  methods: {
    goToPainel() {
      this.$router.push('/painel')
    }
  }
}
</script>

<style>

</style>