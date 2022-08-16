<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="11" class="pa-0 d-flex justify-center flex-column pt-10">
      <v-row no-gutters>
        <v-col cols="11" class="pa-0 d-flex flex-column">
          <v-breadcrumbs
            class="pa-0"
            :items="items"
            divider="/"
          ></v-breadcrumbs>
          <h1>Endereços</h1>
          <v-col class="pa-0 d-flex justify-end pt-5">
            <v-btn
            dense
            color="green"
            @click="dialog = true"
            >
              <span style="color: #fff; font-weight: bold">Adicionar endereço</span>
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
      <v-col cols="11" class="pa-0 d-flex flex-column pt-lg-10 pt-3" v-if="addresses && addresses.length > 0">
        <v-col lg="8" cols="12" class="pa-0">
          <v-row no-gutters>
            <v-col cols="12" class="pa-0 mt-5" v-for="address in addresses" :key="address._id">
              <v-card
              class="elevation-1"
              >
                <v-card-title class="text-h5">
                  <v-icon color="var(--primary-color)" class="mr-2">mdi-map-marker</v-icon>{{address.district}}
                </v-card-title>
                <v-card-subtitle>
                  {{address.name.concat(", ").concat(address.number)}}
                  <span v-if="address.comp">
                    <br>Comp: {{address.comp}}
                  </span>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
      <v-col cols="11" class="pa-0 text-center pt-10" v-else>
        <v-col class="pa-0 pb-2">
          <v-icon color="var(--primary-color)" size="100">mdi-emoticon-sad</v-icon>
        </v-col>
        <span class="product-title">Não há nenhum endereço cadastrado.</span>
      </v-col>
    </v-col>
    <v-dialog v-model="dialog">
      <v-card
      width="100%"
      height="100%"
      >
        <v-col class="pa-0 d-flex flex-column pa-5">
          <v-col class="pa-0 pb-10">
            <span style="fontSize: 1.5em; font-weight: bold">Adicione um endereço</span>
          </v-col>
          <v-form v-model="isFormValid" @submit.prevent>
            <v-col class="pa-0">
              <v-text-field
              dense
              outlined
              label="CEP"
              v-model="cep"
              autofocus
              v-mask="['#####-###']"
              >

              </v-text-field>
            </v-col>
            <v-col class="pa-0">
              <v-text-field
              dense
              label="Endereço"
              outlined
              v-model="address"
              >

              </v-text-field>
            </v-col>
            <v-col class="pa-0">
              <v-text-field
              dense
              label="Bairro"
              outlined
              v-model="district"
              >

              </v-text-field>
            </v-col>
            <v-col class="pa-0">
              <v-text-field
              v-model="number"
              label="Número"
              dense
              outlined
              >

              </v-text-field>
            </v-col>
            <v-col class="pa-0">
              <v-text-field
              dense
              label="Complemento"
              v-model="comp"
              outlined
              >

              </v-text-field>
            </v-col>
          </v-form>
          <v-col class="pa-0 d-flex justify-center pt-5">
            <v-btn
            dense
            color="green"
            @click="addAddress"
            >
              <span style="color: #fff; font-weight: bold">Adicionar</span>
            </v-btn>
          </v-col>
        </v-col>
      </v-card>
    </v-dialog>
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
    addresses: null,
    dialog: false,
    isFormValid: false,
    cep: "",
    address: "",
    district: "",
    number: "",
    comp: ""
  }),
  mounted() {
    this.getUser()
  },
  updated() {
    if(this.dialog && this.cep && this.cep.length >= 9) {
      this.zipCodeChange()
    }
  },
  methods: {
    resetFields() {
      this.dialog =  false
      this.isFormValid =  false
      this.cep =  ""
      this.address =  ""
      this.district =  ""
      this.number =  ""
      this.comp =  ""
    },
    addAddress() {
      bardemu.post('/user/address', {
        _id: localStorage.getItem(constants.bardemuUserId),
        token: localStorage.getItem(constants.bardemuAuth),
        address: {
          cep: this.cep,
          name: this.address,
          district: this.district,
          number: this.number,
          comp: this.comp
        }
      }).then((res) => {
        console.log(res)
        this.dialog = false
        this.getUser()
        this.resetFields()
      }).catch((e) => {
        this.resetFields()
        if(e.response && e.response.data) {
          this.$store.dispatch('openAlert', {
            message: e.response.data.message,
            type: 'error'
          })
        }
      })
    },
    getUser() {
      bardemu.get('/user', {
        params: {
          _id: localStorage.getItem(constants.bardemuUserId),
          token: localStorage.getItem(constants.bardemuAuth)
        }
      }).then((res) => {
        this.addresses = res.data.address
      }).catch((e) => {
        if(e.response && e.response.data) {
          this.$store.dispatch('openAlert', {
            message: e.response.data.message,
            type: 'error'
          })
        }
      })
    },
    zipCodeChange() {
      const axios = require('axios')

      const cep = this.cep.split('-').join("")

      axios.default.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
        const data = res.data

        if(data.bairro) {
          this.district = data.bairro
        }
        if(data.logradouro) {
          this.address = data.logradouro
        }
      }).catch(() => {
        this.$store.dispatch('openAlert', {
          message: `Ocorreu um problema ao consultar o CEP. Tente novamente mais tarde.`,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style>

</style>