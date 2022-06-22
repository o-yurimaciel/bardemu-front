<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col class="pa-0 pt-10 d-flex flex-column" offset="1">
      <v-breadcrumbs
        class="pa-0"
        :items="items"
        divider="/"
      ></v-breadcrumbs>
      <h1>Carrinho</h1>
      <v-col cols="10" class="pa-0 pt-15 d-flex justify-center" v-if="cart && cart.length > 0">
        <v-col class="pa-0" cols="12" lg="8" v-if="!userData">
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
            <v-col class="pa-0 pt-3 pl-0 pr-0 pl-lg-5 pr-lg-5" style="position: relative" v-for="product in cart" :key="product._id">
              <v-icon 
              color="red" 
              style="position: absolute; top: 15px; right: 20px;" 
              @click="removeAllItems(product)">
                mdi-delete
              </v-icon>
              <v-row no-gutters>
                <v-col cols="12" lg="2" class="pa-0 d-flex justify-center">
                  <img :src="product.image" width="100" height="100%" alt="">
                </v-col>
                <v-col cols="12" lg="8" class="pa-0 ml-0 ml-lg-5">
                  <v-col cols="12" class="pa-0 d-flex justify-center justify-lg-start">
                    <span class="product-title">
                      {{product.name}}
                    </span>
                  </v-col>
                  <v-col class="pa-0 d-flex justify-center justify-lg-start">
                    <span class="product-description">
                      {{product.description}}
                    </span>
                  </v-col>
                  <v-col class="pa-0 d-flex justify-center justify-lg-start">
                    <span class="product-price">
                      {{product.price * product.quantity | currency}}
                    </span>
                  </v-col>
                </v-col>
                <v-col cols="6" lg="2" class="pa-0 my-auto d-flex justify-end mx-auto">
                  <v-row no-gutters class="d-flex align-center justify-space-between">
                    <v-icon color="red" @click="removeItem(product)">mdi-minus</v-icon>
                    <span>{{product.quantity}}</span>
                    <v-icon color="green" @click="addItem(product)">mdi-plus</v-icon>
                  </v-row>
                </v-col>
              </v-row>
              <hr class="mt-5" style="margin:auto; opacity: 0.2">
            </v-col>
            <v-col class="pa-0 pa-5 d-flex flex-column mx-auto pt-10">
              <v-btn 
              color="red"
              :outlined="false"
              @click="userData = true"
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
        <v-col class="pa-0" cols="8" v-else>
          <v-card
          class="mx-auto elevation-1"
          height="100%"
          width="100%"
          >
            <v-card-title class="text-center mx-auto d-flex justify-center">Estamos quase lá.. :)<br>Antes precisamos confirmar alguns dados para concluir o pedido.</v-card-title>
            <hr style="width: 90%; margin:auto; opacity: 0.2;">
            <v-col class="pa-0 pa-10">
              <v-form v-model="isFormValid" @submit.prevent>
                <v-row no-gutters>
                  <v-col cols="6" class="pa-0 mr-2">
                    <label for="name">Nome</label>
                    <v-text-field
                    dense
                    outlined
                    :error="!name"
                    rounded
                    v-model="name"
                    id="name"
                    >

                    </v-text-field>
                  </v-col>
                  <v-col cols="4" class="pa-0">
                    <label for="phone">Telefone</label>
                    <v-text-field
                    dense
                    v-model="phone"
                    outlined
                    rounded
                    id="phone"
                    :error="!phone || phone.length < 19"
                    v-mask="'+55 (##) #####-####'"
                    >

                    </v-text-field>
                  </v-col>
                  <v-col cols="6" class="pa-0 mr-2">
                    <label for="name">Endereço</label>
                    <v-text-field
                    dense
                    v-model="address"
                    outlined
                    :error="!address"
                    rounded
                    id="address"
                    >

                    </v-text-field>
                  </v-col>
                  <v-col cols="2" class="pa-0 mr-2">
                    <label for="number">Número</label>
                    <v-text-field
                    dense
                    outlined
                    v-model="addressNumber"
                    :error="!addressNumber"
                    rounded
                    id="number"
                    >

                    </v-text-field>
                  </v-col>
                  <v-col cols="3" class="pa-0 mr-2">
                    <label for="comp">Complemento</label>
                    <v-text-field
                    dense
                    outlined
                    v-model="addressData"
                    :error="!addressData"
                    rounded
                    id="comp"
                    >

                    </v-text-field>
                  </v-col>
                  <v-col cols="5" class="pa-0">
                    <label for="paymentType">Forma de Pagamento</label>
                    <v-select
                      outlined
                      :items="paymentTypes"
                      rounded
                      v-model="paymentType"
                      :error="!paymentType"
                      dense
                      id="paymentType"
                      >
                      </v-select>
                  </v-col>
                  <v-col cols="3" class="pa-0 ml-2" v-if="paymentType === 'Dinheiro'">
                    <label for="cashChange">Troco</label>
                    <v-currency-field
                    dense
                    outlined
                    v-model="cashChange"
                    rounded
                    id="cashChange"
                    >
                    </v-currency-field>
                  </v-col>
                  <v-col cols="3" 
                  class="pa-0 ml-2" 
                  v-if="paymentType === 'Cartão de Débito' || paymentType === 'Cartão de Crédito'">
                    <label for="flag">Bandeira</label>
                    <v-select
                    dense
                    outlined
                    v-model="flag"
                    :items="flagTypes"
                    :error="!flag"
                    rounded
                    id="flag"
                    >

                    </v-select>
                  </v-col>
                </v-row>
              </v-form>
              <v-col class="pa-0">
                <span>Observação: Após concluir, será solicitado o envio do Pedido via WhatsApp para confirmação.</span>
              </v-col>
              <v-col class="pa-0" v-if="paymentType === 'PIX'">
                <span>Observação: O pagamento por PIX deve ser combinado com o Restaurante via WhatsApp.</span>
              </v-col>
              <v-col class="pa-0 d-flex flex-column mx-auto pt-10">
              <v-btn 
                color="red"
                :outlined="false"
                :disabled="!isFormValid"
                @click="send"
                >
                  <span style="color: #fff">Concluir pedido</span>
                </v-btn>
                <v-btn
                outlined
                color="#fff"
                @click="userData = false"
                >
                  <span style="color: red">Voltar</span>
                </v-btn>
              </v-col>
            </v-col>
          </v-card>
        </v-col>
      </v-col>
      <v-col cols="10" class="pa-0 d-flex justify-center pt-10" v-else>
        <span class="product-title">Não há nenhum produto no carrinho.</span>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isFormValid: false,
      userData: false,
      items: [
        { text: 'Início', href: '/' },
        { text: 'Cardápio', href: '/menu' }
      ],
      paymentTypes: [
        "Dinheiro",
        "Cartão de Crédito",
        "Cartão de Débito",
        "PIX",
        "Outro"
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
      addressNumber: "",
      addressData: "",
      paymentType: null,
      cashChange: 0,
      flag: null
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart'
    })
  },
  mounted() {
    this.getClientByStorage()
  },
  methods: {
    getClientByStorage() {
      const client = JSON.parse(localStorage.getItem('bardemuClient'))
      if(client.name) {
        this.name = client.name
      }

      if(client.phone) {
        this.phone = client.phone
      }

      if(client.address) {
        this.address = client.address
      }

      if(client.addressNumber) {
        this.addressNumber = client.addressNumber
      }

      if(client.addressData) {
        this.addressData = client.addressData
      }

      this.$forceUpdate()
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
    addItem(item) {
      item.quantity = item.quantity ? item.quantity + 1 : 1
      this.$store.dispatch('addToCart', item).then(() => {
        this.$forceUpdate()
      })
    },
    removeAllItems(item) {
      this.$store.dispatch('removeAllToCart', item).then(() => {
        this.$forceUpdate()
      })
    },
    removeItem(item) {
      item.quantity--
      this.$store.dispatch('removeToCart', item).then(() => {
        this.$forceUpdate()
      })
    },
    send() {
      const message = encodeURIComponent(`Olá, BarDeMu Lanches! Acabei de fazer um pedido.\n\nNome: ${this.name}\nEndereço: ${this.address}\nNúmero: ${this.addressNumber}\nComplemento: ${this.addressData}\n\nPedido: ${this.getCartText()}\n\nTotal a pagar: R$${this.getTotalValue().toFixed(2)}\nForma de Pagamento: ${this.paymentType}${this.getPaymentSubType()}`)
      const phone = "555180469344"
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, "_blank")
      localStorage.setItem('bardemuClient', JSON.stringify({
        name: this.name,
        phone: this.phone,
        address: this.address,
        addressNumber: this.addressNumber,
        addressData: this.addressData
      }))
      this.$store.dispatch('resetCart')
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

<style>

</style>