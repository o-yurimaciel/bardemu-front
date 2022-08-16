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
          <h1>Dados Pessoais</h1>
        </v-col>
      </v-row>
      <v-col class="pa-0 d-flex flex-column pt-10">
        <v-col lg="3" class="pa-0">
          <v-text-field
          outlined
          dense
          label="Nome"
          readonly
          color="var(--primary-color)"
          id="name"
          :value="user.name"
          >

          </v-text-field>
        </v-col>
        <v-col lg="3" class="pa-0">
          <v-text-field
          outlined
          label="E-mail"
          color="var(--primary-color)"
          dense
          readonly
          id="email"
          :value="user.email"
          >

          </v-text-field>
        </v-col>
        <v-col lg="3" class="pa-0">
          <v-text-field
          outlined
          label="Celular"
          color="var(--primary-color)"
          dense
          readonly
          id="phone"
          :value="user.phone"
          >

          </v-text-field>
        </v-col>
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
      { text: 'Início', href: '/' },
      { text: 'Minha conta', href: '/minha-conta' },
    ],
    user: null
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
        this.user.name = this.user.firstName.concat(" ").concat(this.user.lastName)
      }).catch((e) => {
        if(e.response && e.response.data) {
          this.$store.dispatch('openAlert', {
            message: e.response.data.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style>

</style>