<template>
  <v-container class="pa-0 ma-0">
    <v-col offset="1" class="pa-0 pt-5 d-flex flex-column">
      <v-breadcrumbs
        class="pa-0"
        :items="items"
        divider="/"
      ></v-breadcrumbs>
      <h1>
        Cadastro
      </h1>
    </v-col>
    <v-col lg="8" cols="11" class="pa-0 mx-auto pt-10">
      <v-stepper
        v-model="step"
        vertical
        color="var(--primary-color)"
      >
        <v-stepper-step
          :complete="step > 1"
          color="var(--primary-color)"
          step="1"
        >
          Dados pessoais
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-col class="pa-0">
            <v-form v-model="personalDataIsValid" @submit.prevent>
              <v-row no-gutters>
                <v-col cols="6" class="pa-0 pr-4">
                  <v-text-field
                  outlined
                  placeholder="Nome"
                  autofocus
                  :rules="[rules.required]"
                  v-model="name"
                  color="var(--primary-color)"
                  >

                  </v-text-field>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <v-text-field
                  outlined
                  v-model="lastName"
                  :rules="[rules.required]"
                  color="var(--primary-color)"
                  placeholder="Sobrenome"
                  >

                  </v-text-field>
                </v-col>
                <v-col cols="6" class="pa-0 pr-4">
                  <v-text-field
                  outlined
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  color="var(--primary-color)"
                  placeholder="E-mail"
                  >

                  </v-text-field>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <v-text-field
                  outlined
                  v-model="phone"
                  :rules="[rules.required, rules.phone]"
                  color="var(--primary-color)"
                  placeholder="Celular"
                  v-mask="'+55 (##) #####-####'"
                  >

                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col class="pa-0 pt-5">
            <v-btn
              color="var(--primary-color)"
              @click="step++"
              :disabled="!personalDataIsValid"
            >
              <span style="color: #fff; font-weight: bold">Continuar</span>
            </v-btn>
            <v-btn 
            text
            class="ml-2"
            color="var(--primary-color)"
            style="font-weight: bold"
            outlined

            >
              Voltar
            </v-btn>
          </v-col>
        </v-stepper-content>
        <v-stepper-step
          :complete="step > 2"
          color="var(--primary-color)"
          step="2"
        >
          Senha
        </v-stepper-step>
        <v-stepper-content step="2">
          <v-col class="pa-0">
            <v-form v-model="passwordDataIsValid" @submit.prevent>
              <v-row no-gutters>
                <v-col cols="6" class="pa-0 pr-4">
                  <v-text-field
                  outlined
                  placeholder="Senha"
                  type="password"
                  v-model="password"
                  :rules="[rules.required]"
                  :error="!password"
                  color="var(--primary-color)"
                  >

                  </v-text-field>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <v-text-field
                  outlined
                  type="password"
                  v-model="confirmPassword"
                  :rules="[rules.required, rules.samePassword]"
                  color="var(--primary-color)"
                  placeholder="Confirmar senha"
                  >

                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col class="pa-0 pt-5">
            <v-btn 
            text
            color="var(--primary-color)"
            style="font-weight: bold"
            outlined
            @click="step--"
            >
              Voltar
            </v-btn>
          </v-col>
        </v-stepper-content>
        <v-col class="pa-0">
          <v-row no-gutters class="d-flex justify-center align-center pt-5">
            <v-checkbox
            color="var(--primary-color)"
            v-model="terms"
            >
            </v-checkbox>
            <span>Eu aceito os <a href="/termos" target="__blank">Termos de uso</a></span>
          </v-row>
        </v-col>
        <v-col cols="11" class="pa-0 d-flex justify-center mx-auto pt-2">
          <v-btn
          width="100%"
          :disabled="!personalDataIsValid || !passwordDataIsValid || !terms"
          color="var(--primary-color)"
          @click="register"
          >
            <span style="color: #fff; font-weight: bold">Concluir</span>
          </v-btn>
        </v-col>
      </v-stepper>
    </v-col>
  </v-container>
</template>

<script>
import { bardemu } from '../services';

export default {
  data () {
    return {
      items: [
        { text: 'Início', href: '/' }
      ],
      step: 1,
      personalDataIsValid: false,
      passwordDataIsValid: false,
      name: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
      rules: {
        required: field => !!field || "*Campo obrigatório.",
        samePassword: confirmPassword => confirmPassword !== this.password ? "*As senhas informadas não coincidem." : !!confirmPassword,
        email: email => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(email) || "*Necessita ser um email válido.";
        },
        phone: value => {
          if(value) {
            if(value.length < 19) {
              return "*Celular inválido"
            } else {
              return true
            }
          } else {
            return "*Celular inválido"
          }
        },
      }
    }
  },
  methods: {
    register() {
      bardemu.post('/register', {
        firstName: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone
      }).then((res) => {
        console.log(res)
        this.$store.dispatch('openAlert', {
          message: `Seja bem-vindo ao BarDeMuLanches, ${this.name}!`,
          type: 'success'
        })
        this.$store.commit('setAuth', true)
        this.$store.commit('setUserId', res.data._id)
        this.$store.commit('setLogin', res.data.email)
        this.$router.push('/menu')
      }).catch((e) => {
        this.$store.dispatch('openAlert', {
          message: e.response.data.message,
          type: 'error'
        })
        console.log(e.response)
      })
    }
  }
}
</script>

<style>

</style>