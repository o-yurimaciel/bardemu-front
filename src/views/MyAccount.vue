<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="10" class="pa-0 d-flex justify-center flex-column mx-auto pt-10">
      <v-row no-gutters>
        <v-col cols="11" class="pa-0 d-flex flex-column">
          <v-breadcrumbs
            class="pa-0"
            :items="items"
            divider="/"
          ></v-breadcrumbs>
          <h1>Minha conta</h1>
          <h3 class="pt-5">Olá, {{user.fullName}}!</h3>
        </v-col>
      </v-row>
      <v-col lg="8" cols="12" class="pa-0 pt-5">
        <v-row no-gutters>
          <v-col cols="12" class="pa-0 mt-5" v-for="element in elements" :key="element.title">
            <v-card
            class="elevation-1"
            :to="element.to"
            >
              <v-card-title class="text-h5">
                <v-icon class="mr-2">{{element.icon}}</v-icon> {{element.title}}
              </v-card-title>

              <v-card-subtitle>{{element.description}}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import constants from '../constants'
import { bardemu } from '../services'
export default {
  data: () => ({
    items: [
      { text: 'Início', href: '/' }
    ],
    elements: [
      { icon: "mdi-account", title: "Dados pessoais", description: "Minhas informações da conta", to: '/minha-conta/dados-pessoais' },
      { icon: "mdi-map-marker", title: "Endereços", description: "Meus endereços de entrega", to: '/minha-conta/enderecos' },
      { icon: "mdi-exit-to-app", title: "Sair", description: "Sair da conta", to: '/login' }
    ],
    user: ""
  }),
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      bardemu.get('/user', {
        params: {
          _id: localStorage.getItem(constants.bardemuUserId),
          token: localStorage.getItem(constants.bardemuAuth)
        }
      }).then((res) => {
        this.user = res.data
      }).catch((e) => {
        if(e.response && e.response.data) {
          this.$store.dispatch('openAlert', {
            message: e.response.data.message,
            type: 'error'
          })
        }
      })
    },
  }
}
</script>

<style>

</style>