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
      <v-col class="pa-0 d-flex flex-column pt-10" v-if="user">
        <v-col lg="3" class="pa-0">
          <v-text-field
          outlined
          dense
          label="Nome"
          readonly
          color="var(--primary-color)"
          id="name"
          v-model="user.fullName"
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
          v-model="user.email"
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
          v-model="user.phone"
          >

          </v-text-field>
        </v-col>
      </v-col>
      <v-col lg="6" cols="12" class="pa-0 pt-15">
        <v-expansion-panels>
          <v-expansion-panel
          >
            <v-expansion-panel-header>
              Atualizar Celular
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-col class="pa-0 d-flex flex-column">
                <v-col lg="6" cols="12" class="pa-0 mx-auto">
                  <v-form v-model="newPhoneIsValid" @submit.prevent>
                    <v-text-field
                    outlined
                    autofocus
                    label="Novo celular"
                    color="var(--primary-color)"
                    v-model="newPhone"
                    :rules="[rules.required, rules.phone]"
                    v-mask="'+55 (##) #####-####'"
                    >
                    </v-text-field>
                  </v-form>
                </v-col>
                <v-col class="pa-0 d-flex justify-center">
                  <v-btn
                  outlined
                  color="green"
                  :disabled="!newPhoneIsValid"
                  @click="updatePhone"
                  >
                    Atualizar
                  </v-btn>
                </v-col>
              </v-col>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
    user: null,
    newPhone: "",
    newPhoneIsValid: false,
    rules: {
      required: field => !!field || "*Campo obrigatório.",
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
    updatePhone() {
      bardemu.put('/user/phone', {
        _id: localStorage.getItem(constants.bardemuUserId),
        token: localStorage.getItem(constants.bardemuAuth),
        phone: this.newPhone
      }).then(() => {
        this.getUser()
        this.newPhone = ""
        this.$store.dispatch('openAlert', {
          message: "O celular foi atualizado com sucesso!",
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
    }
  }
}
</script>

<style>

</style>