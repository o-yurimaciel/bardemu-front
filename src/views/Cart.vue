<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="11" class="pa-0 pt-10 d-flex flex-column">
      <v-breadcrumbs
        class="pa-0"
        :items="items"
        divider="/"
      ></v-breadcrumbs>
      <h1>Carrinho</h1>
      <v-col cols="11" class="pa-0 pt-15 pb-15 d-flex justify-center" v-if="cart && cart.length > 0">
        <v-col class="pa-0" cols="12" xl="8" v-if="!userData">
          <v-card
          class="mx-auto elevation-1"
          height="100%"
          width="100%"
          >
            <v-card-title>
              <v-row no-gutters class="d-flex justify-space-between">
                <span>
                  {{getTotalQuantity()}} 
                </span>
                <span v-if="cart.length > 0">
                  Total: {{getTotalValue() | currency}}
                </span>
              </v-row>
            </v-card-title>
            <hr style="width: 95%;margin:auto; opacity: 0.2;">
            <v-col class="pa-0 pt-3 pl-0 pr-0 pl-lg-5 pr-lg-5" style="position: relative" v-for="(product, index) in cart" :key="`productCart${index}`">
              <v-icon 
              color="red" 
              style="position: absolute; top: 15px; right: 20px;" 
              @click="removeAllItems(product)">
                mdi-delete
              </v-icon>
              <v-row no-gutters>
                <v-col cols="12" lg="2" class="pa-0 d-flex justify-center align-start">
                  <img :src="product.image" width="150px" height="150px" alt="">
                </v-col>
                <v-col cols="12" lg="7" class="pa-0 ml-0 ml-lg-5 text-lg-left text-center">
                  <v-col cols="12" class="pa-0 d-flex justify-center justify-lg-start pt-lg-0 pt-5">
                    <span class="product-title">
                      {{product.name}}
                    </span>
                  </v-col>
                  <v-col class="pa-0 d-flex justify-center justify-lg-start pt-3 text-lg-left text-center">
                    <span class="product-description">
                      {{product.description}}
                    </span>
                  </v-col>
                  <v-col class="pa-0 d-flex justify-center pt-3 justify-lg-start" v-if="product.note">
                    <span class="product-description">
                      Observação: {{product.note}}
                    </span>
                  </v-col>
                  <v-col class="pa-0 d-flex justify-center justify-lg-start pt-3">
                    <span class="product-price">
                      {{product.price * product.quantity | currency}}
                    </span>
                  </v-col>
                </v-col>
                <v-col cols="6" lg="2" class="pa-0 my-auto d-flex justify-end mx-auto pt-lg-0 pt-5">
                  <v-row no-gutters class="d-flex align-center justify-space-between">
                    <v-icon color="red" 
                    :disabled="product.quantity <= 1"
                    @click="product.quantity--"
                    >
                      mdi-minus
                    </v-icon>
                    <span>{{product.quantity}}</span>
                    <v-icon color="green" @click="product.quantity++">mdi-plus</v-icon>
                  </v-row>
                </v-col>
              </v-row>
              <hr class="mt-5" style="margin:auto; opacity: 0.2">
            </v-col>
            <v-col class="pa-0 pa-5 d-flex flex-column mx-auto pt-10">
              <v-btn 
              color="red"
              :outlined="false"
              @click="goToLogin"
              >
                <span style="color: #fff">Continuar</span>
              </v-btn>
              <v-btn
              outlined
              color="#fff"
              @click="goToMenu"
              >
                <span style="color: red">Voltar ao Cardápio</span>
              </v-btn>
            </v-col>
          </v-card>
        </v-col>
        <v-col class="pa-0 mb-10" lg="8" cols="12" v-if="userData">
          <v-card
          class="mx-auto elevation-1"
          height="100%"
          width="100%"
          >
            <v-card-title class="text-center mx-auto d-flex justify-center text-left text-lg-center">
              <v-col class="pa-0 d-flex flex-column align-center">
                <span class="d-flex align-center">
                  Estamos quase lá... <v-icon color="#000">mdi-emoticon-cool-outline</v-icon><br>
                </span>
                <span style="word-break: normal">Antes precisamos confirmar alguns dados para concluir o pedido.</span>
              </v-col>
            </v-card-title>
            <hr style="width: 90%; margin:auto; opacity: 0.2;">
            <v-col class="pa-0 pa-lg-10 pa-4">
              <v-form v-model="isFormValid" @submit.prevent>
                <v-row no-gutters>
                  <v-col cols="12" class="pa-0">
                    <span style="fontSize: 1.2em">Nome: <span style="font-weight: bold;color: var(--primary-color)">{{name}}</span></span>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <span style="fontSize: 1.2em">Celular: <span style="font-weight: bold;color: var(--primary-color)">{{phone}}</span></span>
                    <a @click="goToPersonalData" class="pl-2">Alterar?</a>
                  </v-col>
                  <v-col lg="12" cols="12" class="pa-0 pt-10">
                    <v-select
                    rounded 
                    id="address"
                    no-data-text="Você não tem nenhum endereço cadastrado."
                    outlined
                    v-model="address"
                    label="Endereço"
                    placeholder="Escolha um endereço"
                    :error="!address"
                    dense
                    color="var(--primary-color)"
                    :items="addresses">
                      <template slot="selection" slot-scope="data">
                        <span class="select-selection">
                          {{data.item.name.concat(", ").concat(data.item.number).concat(` - ${data.item.district}`)}}
                        </span>
                      </template>
                      <template slot="item" slot-scope="data">
                        <span class="select-item">
                          {{data.item.name.concat(", ").concat(data.item.number).concat(` - ${data.item.district}`)}}
                        </span>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col lg="6" cols="12" class="pa-0">
                    <v-select
                      outlined
                      :items="paymentTypes"
                      label="Forma de pagamento"
                      placeholder="Escolha um forma de pagamento"
                      rounded
                      required
                      v-model="paymentType"
                      color="var(--primary-color)"
                      :error="!paymentType"
                      dense
                      id="paymentType"
                      >
                      </v-select>
                  </v-col>
                  <v-col lg="6" cols="12" class="pa-0 pl-0 pl-lg-2" v-if="paymentType === 'Dinheiro'">
                    <label for="cashChange">Troco (Total: {{getTotalValue() | currency}})</label>
                    <v-currency-field
                    dense
                    outlined
                    v-model="cashChange"
                    color="var(--primary-color)"
                    rounded
                    :error="cashChange <= 0 || cashChange < getTotalValue()"
                    required
                    :value="getTotalValue"
                    id="cashChange"
                    >
                    </v-currency-field>
                  </v-col>
                  <v-col 
                  lg="6" 
                  cols="12"
                  class="pa-0 pl-0 pl-lg-2" 
                  v-if="paymentType === 'Cartão de Débito' || paymentType === 'Cartão de Crédito'">
                    <v-select
                    dense
                    outlined
                    v-model="flag"
                    label="Bandeira"
                    placeholder="Escolha uma bandeira"
                    :items="flagTypes"
                    color="var(--primary-color)"
                    :error="!flag"
                    rounded
                    id="flag"
                    >

                    </v-select>
                  </v-col>
                </v-row>
              </v-form>
              <v-col class="pa-0">
                <span style="word-break: normal">Observação: Após concluir, será solicitado o envio do Pedido via WhatsApp para confirmação.</span>
              </v-col>
              <v-col class="pa-0 d-flex flex-column mx-auto pt-10">
              <v-btn 
                color="red"
                :outlined="false"
                :disabled="!isFormValid"
                @click="createOrder"
                >
                  <span style="color: #fff">Concluir pedido</span>
                </v-btn>
                <v-btn
                outlined
                color="#fff"
                @click="back"
                >
                  <span style="color: red">Voltar</span>
                </v-btn>
              </v-col>
            </v-col>
          </v-card>
        </v-col>
      </v-col>
      <v-col cols="11" class="pa-0 text-center pt-10" v-else>
        <v-col class="pa-0 pb-2">
          <v-icon color="var(--primary-color)" size="100">mdi-emoticon-sad</v-icon>
        </v-col>
        <span class="product-title">Não há nenhum produto no carrinho.</span>
      </v-col>
    </v-col>
    <v-dialog v-model="dialog">
      <v-card
      width="100%"
      height="100%"
      >
        <v-col lg="6" class="pa-0 d-flex flex-column justify-center mx-auto text-center pa-10">
          <v-icon size="100" color="var(--primary-color)">
            mdi-emoticon-sad-outline
          </v-icon>
          <span class="pt-5" style="fontSize: 1.5em; font-weight: bold">Você não tem nenhum endereço cadastrado.</span>
          <span class="pt-3">Não se preocupe. Você pode cadastrar um novo endereço <a @click="goToAddresses">aqui</a></span>
        </v-col>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { bardemu } from '../services'

export default {
  data() {
    return {
      isFormValid: false,
      userData: false,
      addresses: [],
      items: [
        { text: 'Início', href: '/' },
        { text: 'Cardápio', href: '/menu' }
      ],
      paymentTypes: [
        "Cartão de Crédito",
        "PIX"
      ],
      flagTypes: [
        "Visa",
        "Mastercard",
        "Banrisul",
        "Outro"
      ],
      name: "",
      phone: "",
      address: "",
      paymentType: null,
      cashChange: 0,
      flag: null,
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart',
      auth: 'getAuth'
    })
  },
  methods: {
    goToPersonalData() {
      this.$router.push('/minha-conta/dados-pessoais')
    },
    goToAddresses() {
      this.$router.push('/minha-conta/enderecos')
    },
    back() {
      this.userData = false
      this.address = false
      this.paymentType = ""
      this.cashChange = 0
      this.flag = null
    },
    goToLogin() {
      bardemu.get('/user', {
        params: {
          _id: this.$store.state.userId,
          token: this.$store.state.auth
        }
      }).then((res) => {
        if(res.data.address && res.data.address.length > 0) {
          this.name = res.data.firstName.concat(" ").concat(res.data.lastName)
          this.phone = res.data.phone
          this.addresses = res.data.address
          if(res.data.address.length === 1) {
            this.address = res.data.address[0]
          }
          this.userData = true
        } else {
          this.dialog = true
        }
      }).catch((e) => {
        if(e.response && e.response.data) {
          this.$store.dispatch('openAlert', {
            message: e.response.data.message,
            type: 'error'
          })
        }
      })
    },
    goToMenu() {
      this.$router.push('/menu')
    },
    getTotalQuantity() {
      let quantity = 0
      this.cart.filter((product) => {
        quantity = quantity + product.quantity
      })
      return quantity > 1 ? `${quantity} produtos no carrinho` : '1 produto no carrinho'
    },
    getTotalValue() {
      let value = 0
      this.cart.filter((product) => {
        value = value + parseFloat(product.price * product.quantity)
      })
      return value
    },
    removeAllItems(item) {
      this.$store.dispatch('removeAllToCart', item).then(() => {
        this.$forceUpdate()
      })
    },
    createOrder() {
      const phone = "555195058185"
      const totalValue = this.getTotalValue()
      
      this.cart.filter((item) => {
        item.image = null
      })

      bardemu.post('/order', {
        totalValue,
        clientName: this.name,
        clientPhone: this.phone,
        clientAddress: this.address.name,
        clientAddressNumber: this.address.number,
        clientAddressData: this.address.comp,
        paymentType: this.paymentType,
        cashChange: this.cashChange,
        cardFlag: this.flag,
        products: this.cart,
        userId: this.$store.state.userId
      }, {
        headers: {
          "x-access-token": this.$store.state.auth
        }
      }).then((res) => {
        const message = encodeURIComponent(`Olá, BarDeMu Lanches! Acabei de fazer um pedido.\nwww.bardemu.com.br/pedido/${res.data._id}`)
        window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, "_blank")
        this.$store.dispatch('resetCart')
        this.$store.dispatch('openAlert', {
          message: `Pedido efetuado com sucesso!`,
          type: 'success'
        })
        this.$router.push(`/pedido/${res.data._id}`)
      }).catch((e) => {
        if(e.response && e.response.data) {
          this.$store.dispatch('openAlert', {
            message: e.response.data.message,
            type: 'error'
          })
        }
      })
    },
    getPaymentSubType() {
      switch(this.paymentType) {
        case "Dinheiro":
          return `\nTroco: ${this.cashChange}`
        case "Cartão de Crédito":
        case "Cartão de Débito":
          return `\nBandeira: ${this.flag}`
      }
    },
    getCartText() {
      let text = "";
      this.cart.forEach((product) => {
        if(product) {
          text = text + `\n${product.name} ${product.quantity}x`
        }
      })
      return text
    }
  }
}
</script>

<style scoped>
.theme--light >>> .v-input input {
  display: none!important;
}
</style>