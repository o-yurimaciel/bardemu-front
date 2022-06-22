<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" class="pa-0 pt-5 d-flex flex-column">
      <v-breadcrumbs
        class="pa-0"
        :items="items"
        divider="/"
      ></v-breadcrumbs>
      <h1>
        Login
      </h1>
      <v-col cols="10" class="pa-0 pt-15 d-flex justify-center">
        <v-col cols="12" lg="8" class="pa-0">
          <v-card
          height="100%"
          width="100%"
          class="mx-auto pt-10 pb-15"
          >
            <v-col cols="10" lg="6" class="pa-0 mx-auto" style="line-height: 1">
              <label for="login">Usuário</label>
              <v-text-field
              rounded
              id="login"
              v-model="login"
              :autofocus="!login"
              outlined  
              dense
              >
              </v-text-field>
            </v-col>
            <v-col cols="10" lg="6" class="pa-0 mx-auto">
              <label for="password">Senha</label>
              <v-text-field
              rounded
              id="password"
              outlined
              :autofocus="login ? true : false"
              v-model="password"
              type="password"
              dense
              >

              </v-text-field>
            </v-col>
            <v-col class="pa-0 d-flex justify-center">
              <v-btn
              dense
              rounded
              color="green"
              @click="sendLogin"
              >
                <span style="color: #fff">Entrar</span>
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
export default {
  data() {
    return {
      items: [
        { text: 'Início', href: '/' }
      ],
      login: "",
      password: ""
    }
  },
  mounted() {
    const login = localStorage.getItem('bardemuLogin')
    this.login = login
  },
  methods: {
    sendLogin() {
      bardemu.post('/login', {
        login: this.login,
        password: this.password
      }).then((res) => {
        this.$store.commit('setAuth', true)
        this.$store.commit('setLogin', res.data.login)
        this.$router.push('/painel')
        this.$store.dispatch('openAlert', {
          message: `Bem-vindo!`,
          type: 'success'
        })
      }).catch(() => {
        this.$store.dispatch('openAlert', {
          message: `Credenciais inválidas.`,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style>

</style>