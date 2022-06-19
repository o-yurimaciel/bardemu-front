<template>
  <v-container class="pa-0 ma-0">
    {{action}} Produto - {{title}}
  </v-container>
</template>

<script>
export default {
  props: {
    action: String,
    id: String
  },
  data() {
    return {
      product: null
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      
    }
  }
}
</script>

<style>

</style>