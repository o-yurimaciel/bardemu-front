<template>
  <v-container fluid class="footer-container pa-0 ma-0 pt-15 pb-15">
    <v-col class="pa-0 d-flex flex-column justify-center mx-auto">
      <v-col cols="10" class="pa-0 d-flex flex-column justify-center mx-auto mt-15 mb-15 text-center">
        <p>SUA MELHOR OPÇÃO 🍔</p>
        <p>ENTREGA PARA TODO CENTRO/SUL DE PORTO ALEGRE 🛵</p>
        <p>Aberto de terça á domingo (19:00h - 00:30h)</p>
        <v-row no-gutters class="d-flex align-center justify-center">
          <v-icon class="mr-2" color="#fff">mdi-whatsapp</v-icon>
          <span>(51) 99505-8185</span>
        </v-row>
      </v-col>
      <v-col class="pa-0 d-flex justify-center mx-auto">
        <v-row no-gutters class="d-flex justify-center">
          <v-icon @click="goToIG" color="#fff" class="mr-2" size="50">mdi-instagram</v-icon>
          <v-icon @click="goToFB" color="#fff" size="50">mdi-facebook</v-icon>
        </v-row>
      </v-col>
      <v-col cols="10" class="pa-0 d-flex justify-center text-center text-lg-start mx-auto mt-15 mb-15">
        <p>Copyright © 2022 BarDeMu Lanches</p>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { bardemu } from '../services'
export default {
  data() {
    return {
      feedbacks: [],
      carousel: 0
    }
  },
  mounted() {
    this.getFeedbacks()
  },
  methods: {
    goToFB() {
      window.open("https://www.facebook.com/BarDeMuLanches", "_blank")
    },
    goToIG() {
      window.open("https://instagram.com/bardemulanches", "_blank")
    },
    getFeedbacks() {
      bardemu.get('/feedbacks/favorites').then((res) => {
        console.log(res)
        this.feedbacks = res.data.reverse()
      }).catch((e) => {
        console.log(e.response)
      })
    }
  }
}
</script>

<style scoped>
.footer-container {
  background: rgb(87,87,87);
  background: linear-gradient(90deg, rgba(87,87,87,1) 0%, rgba(85,85,85,1) 100%, rgba(96,96,96,1) 100%);
}

.desc2 {
  font-family: 'Archivo Black';
  font-size: 1.5em;
  color: #fff;
  text-shadow: 1px 3px 3px black;
}

p, span {
  font-family: 'Archivo Black';
  color: #fff;
  text-shadow: 1px 3px 3px black;
}
</style>