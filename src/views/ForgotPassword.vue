<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="11" class="pa-0 pt-5 d-flex flex-column">
      <v-breadcrumbs
        class="pa-0"
        :items="items"
        divider="/"
      ></v-breadcrumbs>
      <h1>
        Recupere sua senha
      </h1>
      <v-col cols="10" class="pa-0 pt-15 d-flex justify-center" v-if="waitCode">
        <v-col cols="12" lg="6" class="pa-0">
          <v-card
          height="100%"
          width="100%"
          class="mx-auto pt-10 pb-15"
          >
            <v-col cols="10" lg="8" class="pa-0 mx-auto text-center pb-5">
              <h3 style="font-weight: bold">Digite o e-mail cadastrado. Após isso, você receberá e-mail com as instruções para recuperar a sua conta.</h3>
            </v-col>
            <v-col cols="10" lg="8" class="pa-0 mx-auto" style="line-height: 1">
              <v-text-field
              id="login"
              v-model="login"
              placeholder="E-mail"
              :autofocus="!login"
              auto-focus
              color="var(--primary-color)"
              outlined  
              >
              </v-text-field>
            </v-col>
             <v-col cols="10" lg="8" class="pa-0 d-flex justify-center mx-auto">
              <v-btn
              dense
              width="100%"
              color="var(--primary-color)"
              @click="getCode"
              >
                <span style="color: #fff" v-if="!handlingh">Enviar</span>
                <v-progress-circular
                v-else
                indeterminate
                size="25"
                color="#fff"
              ></v-progress-circular>
              </v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-col>
      <v-col cols="10" class="pa-0 pt-15 d-flex justify-center" v-else>
        <v-col cols="12" lg="6" class="pa-0">
          <v-card
          height="100%"
          width="100%"
          class="mx-auto pt-10 pb-15"
          >
            <v-col cols="10" lg="8" class="pa-0 mx-auto text-center pb-5">
              <h3 style="font-weight: bold">Digite o código recebido no e-mail e a nova senha</h3>
            </v-col>
            <v-form v-model="isFormValid" @submit.prevent>
              <v-col cols="10" lg="8" class="pa-0 mx-auto" style="line-height: 1">
                <v-text-field
                id="code"
                v-model="code"
                placeholder="Código"
                :autofocus="true"
                auto-focus
                :rules="[rules.required]"
                color="var(--primary-color)"
                outlined  
                >
                </v-text-field>
              </v-col>
              <v-col cols="10" lg="8" class="pa-0 mx-auto" style="line-height: 1">
                <v-text-field
                id="password"
                v-model="password"
                placeholder="Senha"
                :autofocus="true"
                auto-focus
                :rules="[rules.required]"
                color="var(--primary-color)"
                outlined  
                >
                </v-text-field>
              </v-col>
              <v-col cols="10" lg="8" class="pa-0 mx-auto" style="line-height: 1">
                <v-text-field
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="Confirme a senha"
                :autofocus="true"
                :rules="[rules.required, rules.samePassword]"
                auto-focus
                color="var(--primary-color)"
                outlined  
                >
                </v-text-field>
              </v-col>
              <v-col cols="10" lg="8" class="pa-0 d-flex justify-center mx-auto pt-5">
                <v-btn
                dense
                width="100%"
                color="var(--primary-color)"
                @click="validationCode"
                :disabled="!isFormValid"
                >
                  <span style="color: #fff" v-if="!handlingh">Enviar</span>
                  <v-progress-circular
                  v-else
                  indeterminate
                  size="25"
                  color="#fff"
                ></v-progress-circular>
                </v-btn>
              </v-col>
            </v-form>
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
      isFormValid: false,
      login: "",
      handlingh: false,
      waitCode: true,
      code: "",
      password: "",
      confirmPassword: "",
      rules: {
        required: field => !!field || "*Campo obrigatório.",
        samePassword: confirmPassword => confirmPassword !== this.password ? "*As senhas informadas não coincidem." : !!confirmPassword,
      }
    }
  },
  methods: {
    getCode() {
      bardemu.post('/user/password/code', {
        email: this.login
      }).then(() => {
        this.waitCode = false
        this.$store.dispatch('openAlert', {
          message: "Código de verificação enviado por e-mail!",
          type: 'success'
        })
      }).catch((e) => {
        if(e.response && e.response.data) {
          this.$store.dispatch('openAlert', {
            message: e.response.data.message,
            type: 'error'
          })
        }
      })
    },
    validationCode() {
      bardemu.put('/user/password/code', {
        email: this.login,
        code: this.code,
        password: this.password
      }).then(() => {
        this.$store.dispatch('openAlert', {
          message: "Senha alterada com sucesso!",
          type: 'success'
        })
        this.$router.push('/login')
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