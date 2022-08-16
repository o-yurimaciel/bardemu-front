<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="11" class="pa-0 pt-5 d-flex flex-column">
      <v-breadcrumbs
        class="pa-0"
        :items="items"
        divider="/"
      ></v-breadcrumbs>
      <h1>
        Acesse sua conta
      </h1>
      <v-col cols="10" class="pa-0 pt-15 d-flex justify-center">
        <v-col cols="12" lg="6" class="pa-0">
          <v-card
          height="100%"
          width="100%"
          class="mx-auto pt-10 pb-15"
          >
            <v-col cols="10" lg="8" class="pa-0 mx-auto" style="line-height: 1">
              <v-text-field
              id="login"
              v-model="login"
              placeholder="E-mail"
              :autofocus="!login"
              color="var(--primary-color)"
              outlined  
              >
              </v-text-field>
            </v-col>
            <v-col cols="10" lg="8" class="pa-0 mx-auto">
              <v-text-field
              id="password"
              placeholder="Senha"
              color="var(--primary-color)"
              outlined
              :autofocus="login ? true : false"
              v-model="password"
              type="password"
              @keyup.enter.native="getLogin"
              >
              </v-text-field>
            </v-col>
            <v-col cols="10" lg="8" class="pa-0 d-flex justify-center mx-auto">
              <v-btn
              dense
              width="100%"
              color="var(--primary-color)"
              @click="getLogin"
              >
                <span style="color: #fff" v-if="!handlingh">Entrar</span>
                <v-progress-circular
                v-else
                indeterminate
                size="25"
                color="#fff"
              ></v-progress-circular>
              </v-btn>
            </v-col>
            <v-col class="pa-0 d-flex justify-center pt-10 pb-3">
              <span style="color: var(--primary-color); font-weight: bold">Não tem uma conta?</span>
              <v-icon size="25" color="var(--primary-color)">mdi-hand-pointing-down</v-icon>
            </v-col>
            <v-col cols="10" lg="8" class="pa-0 d-flex justify-center mx-auto">
              <v-btn
              dense
              width="100%"
              color="#fff"
              @click="getRegister"
              >
                <span style="color: var(--primary-color); font-weight: bold">Cadastre-se</span>
              </v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { bardemu } from '../services'
import constants from '../constants'

export default {
  data() {
    return {
      items: [
        { text: 'Início', href: '/' }
      ],
      login: "",
      password: "",
      handlingh: false
    }
  },
  mounted() {
    this.$store.commit('setAuth', null)
    this.$store.commit('setLogin', null)
    this.$store.commit('setUserId', null)
    const login = localStorage.getItem(constants.bardemuLogin)
    this.login = login
  },
  methods: {
    getLogin() {
      this.handlingh = true
      const cart = JSON.parse(localStorage.getItem(constants.bardemuCart))

      bardemu.post('/login', {
        email: this.login,
        password: this.password
      }).then((res) => {
        this.handlingh = false
        this.$store.commit('setAuth', res.data.token)
        this.$store.commit('setUserId', res.data._id)
        this.$store.commit('setLogin', res.data.email)

        if(cart && cart.length > 0) {
          this.$router.push('/carrinho')
        } else {
          this.$router.push('/menu')
        }
      }).catch((e) => {
        this.handlingh = false
        if(e.response && e.response.data) {
          this.$store.dispatch('openAlert', {
            message: e.response.data.message,
            type: 'error'
          })
        }
      })
    },
    getRegister() {
      this.$router.push('/cadastro')
    }
  }
}
</script>

<style>

</style>