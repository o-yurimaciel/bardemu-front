<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="11" class="pa-0 pt-10 d-flex flex-column">
      <v-breadcrumbs
        class="pa-0"
        :items="items"
        divider="/"
      ></v-breadcrumbs>
      <h1>Carrinho</h1>
      <v-col cols="11" class="pa-0 pt-2 pt-lg-15 pb-15 d-flex justify-center" v-if="cart && cart.length > 0">
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
                  Total: {{getOrderValue() | currency}}
                </span>
              </v-row>
            </v-card-title>
            <hr style="width: 95%;margin:auto; opacity: 0.2;">
            <v-col class="pa-0 pt-3 pl-0 pr-0 pl-lg-5 pr-lg-5" style="position: relative" v-for="(product, index) in cart" :key="`productCart${index}`">
              <v-icon 
              color="red" 
              style="position: absolute; top: 15px; right: 20px;" 
              @click="removeItem(product)">
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
                    <span class="product-description" style="white-space: pre-line">
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
                    @click="decreaseProduct(product)"
                    >
                      mdi-minus
                    </v-icon>
                    <span>{{product.quantity}}</span>
                    <v-icon @click="increaseProduct(product)" color="green">mdi-plus</v-icon>
                  </v-row>
                </v-col>
              </v-row>
              <hr class="mt-5" style="margin:auto; opacity: 0.2">
            </v-col>
            <v-col class="pa-0 pa-5 d-flex flex-column mx-auto pt-10">
              <v-btn 
              color="red"
              :outlined="false"
              @click="goToDetail"
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
                    <span style="fontSize: 1.2em">Nome: <p style="font-weight: bold;color: var(--primary-color)">{{name}}</p></span>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <span style="fontSize: 1.2em">Celular: <p style="font-weight: bold;color: var(--primary-color)">{{phone}}</p></span>
                  </v-col>
                  <v-col lg="12" cols="12" class="pa-0 pt-2">
                    <v-select
                    rounded 
                    id="address"
                    no-data-text="Você não tem nenhum endereço cadastrado."
                    outlined
                    v-model="address"
                    label="Endereço"
                    class="address"
                    @change="getDeliveryPrice"
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
                  <v-col lg="6" cols="12" class="pa-0" v-if="address">
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
                  <v-col lg="6" cols="12" class="pa-0 pl-0 pl-lg-2" v-if="address && paymentType">
                    <v-text-field
                      outlined
                      label="Cupom de desconto"
                      rounded
                      v-model="coupon"
                      :persistent-hint="true"
                      :hint="couponHint"
                      color="var(--primary-color)"
                      dense
                      id="coupon"
                      >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="pa-0 pt-lg-0 pt-3">
                    <span style="fontSize: 1.2em">Pedido: <span style="font-weight: bold;color: var(--primary-color)">{{ getOrderValue() | currency}}</span></span>
                  </v-col>
                  <v-col cols="12" class="pa-0" v-if="address">
                    <span style="fontSize: 1.2em">Entrega: <span style="font-weight: bold;color: var(--primary-color)">{{ deliveryPrice ? deliveryPrice : '0' | currency}}</span></span>
                  </v-col>
                  <v-col cols="12" class="pa-0" v-if="discountCoupon">
                    <v-row no-gutters class="d-flex align-center">
                      <span class="mr-1" style="fontSize: 1.2em">Desconto:</span>
                      <span style="fontSize: 1.2em;font-weight: bold;color: var(--primary-color)">{{ discountValue ? discountValue : '0' | currency}}</span>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <span style="fontSize: 1.2em">Total a pagar: <span style="font-weight: bold;color: var(--primary-color)">{{ getTotalValue() | currency}}</span></span>
                  </v-col>
                </v-row>
              </v-form>
              <v-col class="pa-0 pt-5">
                <span style="word-break: normal">Observação: Após concluir, será solicitado o envio do Pedido via WhatsApp para confirmação.</span>
              </v-col>
              <v-col class="pa-0 d-flex flex-column mx-auto pt-10">
              <v-btn 
                color="red"
                :outlined="false"
                :disabled="!isFormValid || handlingh"
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
        <v-col class="pa-0 pt-5">
          <v-btn
          outlined
          to="/cardapio"
          color="var(--primary-color)"
          >
            Ir para o Cardápio
          </v-btn>
        </v-col>
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
import constants from '../constants'
import { bardemu } from '../services'
import showDialog from '../utils/dialog'

export default {
  data() {
    return {
      isFormValid: false,
      userData: false,
      addresses: [],
      items: [
        { text: 'Início', href: '/' },
        { text: 'Cardápio', href: '/cardapio' }
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
      deliveryPrice: null,
      flag: null,
      dialog: false,
      coupon: "",
      discountCoupon: null,
      couponHint: "",
      handlingh: false,
      discountValue: 0
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart',
      auth: 'getAuth'
    })
  },
  watch: {
    coupon(newState) {
      this.changeCoupon(newState)
    }
  },
  methods: {
    changeCoupon(e) {
      if(e) {
        this.handlingh = true
        bardemu.get(`/coupon`, {
          params: {
            name: e
          },
          headers: {
            "x-access-token": localStorage.getItem(constants.bardemuAuth)
          }
        }).then((res) => {
          if(res.data.active) {
            this.discountCoupon = res.data
            this.discountValue = this.getDiscountValue(res.data)
            this.couponHint = this.getDiscountText(res.data)
            this.handlingh = false
          } else {
            this.couponHint = "Cupom de desconto inativo"
            this.handlingh = false
          }
        }).catch(() => {
          this.discountCoupon = null
          this.discountValue = 0
          this.couponHint = "Cupom de desconto inválido"
          this.handlingh = false
        })
      }
    },
    getDiscountValue(discount) {
      switch(discount.field) {
        case "totalValue":
          this.discountValue = this.getTotalValue() * discount.percent / 100
          break
        case "deliveryPrice":
          this.discountValue = this.deliveryPrice * discount.percent / 100
          break
        case "orderValue":
          this.discountValue = this.getOrderValue() * discount.percent / 100
          break
        default:
          this.discountValue = 0
      }

      return this.discountValue
    },
    getDiscountText(discount) {
      switch(discount.field) {
        case "totalValue":
          return `Adicionado ${discount.percent}% de desconto no total a pagar`
        case "deliveryPrice":
          return `Adicionado ${discount.percent}% de desconto no valor da entrega`
        case "orderValue":
          return `Adicionado ${discount.percent}% de desconto no valor do pedido`
        default:
          return ""
      }
    },
    getDeliveryPrice() {
      this.handlingh = true
      bardemu.get('/district/name', {
        params: {
          value: this.address.district
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
        },
        headers: {
          "x-access-token": localStorage.getItem(constants.bardemuAuth)
        }
      }).then((res) => {
        this.handlingh = false
        if(res.data.price) {
          this.deliveryPrice = res.data.price
        }

        if(this.coupon) {
          this.getDiscountValue(this.discountCoupon)
        }
      }).catch(() => {
        this.handlingh = false
        this.deliveryPrice = 10
      })
    },
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
      this.coupon = null
      this.discountCoupon = null
      this.discountValue = 0
    },
    goToDetail() {
      this.isOpen().then(() => {
        bardemu.get('/user', {
          params: {
            _id: localStorage.getItem(constants.bardemuUserId),
            token: localStorage.getItem(constants.bardemuAuth)
          }
        }).then((res) => {
          if(res.data.address && res.data.address.length > 0) {
            this.name = res.data.firstName.concat(" ").concat(res.data.lastName)
            this.phone = res.data.phone
            this.addresses = res.data.address
            if(res.data.address.length === 1) {
              this.address = res.data.address[0]
              this.getDeliveryPrice()
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
      }).catch((e) => {
        if(e.start && e.end) {
          showDialog({
            title: `Estamos fechados. Horário de atendimento (${e.start}h - ${e.end}h). Por favor, volte mais tarde.`,
            icon: "mdi-store-clock",
            options: ["Voltar"]
          })
        }
      })
    },
    isOpen() {
      const now = new Date()

      return new Promise((resolve, reject) => {
        if(process.env.NODE_ENV === 'development') {
          resolve()
        } else {
          bardemu.get('/configs').then((res) => {
            const start = res.data.opening.start.split(":")
            const end = res.data.opening.end.split(":")
            const startHour = parseInt(start[0])
            const startMinute = parseInt(start[1])
            const endHour = parseInt(end[0])
            const endMinute = parseInt(end[1])
            const nowHour = now.getHours()
            const nowMinutes = now.getMinutes()
      
            if(nowHour >= startHour) {
              if(nowMinutes >= startMinute) {
                resolve()
              } else {
                reject(res.data.opening)
              }
            } else {
              if(nowHour === endHour && nowMinutes <= endMinute) {
                resolve()
                return
              }
              reject(res.data.opening)
            }
          }).catch((e) => {
            reject(e)
          })
        }
      })
    },
    goToMenu() {
      this.$router.push('/cardapio')
    },
    getTotalQuantity() {
      let quantity = 0
      this.cart.filter((product) => {
        quantity = quantity + product.quantity
      })
      return quantity > 1 ? `${quantity} produtos no carrinho` : '1 produto no carrinho'
    },
    getOrderValue() {
      let value = 0
      this.cart.filter((product) => {
        value = value + parseFloat(product.price * product.quantity)
      })
      return value
    },
    getTotalValue() {
      return this.getOrderValue() + this.deliveryPrice - this.discountValue
    },
    removeItem(item) {
      showDialog({
        title: `Tem certeza que deseja remover "${item.name}" do carrinho?`,
        icon: "mdi-delete-alert",
        options: ["Sim", "Não"]
      }).then((res) => {
        if(res === "Sim") {
          this.$store.dispatch('removeInCart', item).then(() => {
            this.$forceUpdate()
          })
        }
      })
    },
    createOrder() {
      const phone = "555195058185"
      const orderValue = this.getOrderValue()

      this.cart.filter((item) => {
        item.image = null
      })

      bardemu.post('/order', {
        orderValue,
        deliveryPrice: this.deliveryPrice,
        discountValue: this.discountValue,
        clientName: this.name,
        clientPhone: this.phone,
        clientAddress: this.address.name,
        clientAddressNumber: this.address.number,
        clientAddressData: this.address.comp,
        paymentType: this.paymentType,
        cashChange: this.cashChange,
        cardFlag: this.flag,
        products: this.cart,
        coupon: this.discountCoupon && this.discountCoupon.name ? this.discountCoupon.name : null,
        userId: localStorage.getItem(constants.bardemuUserId)
      }, {
        headers: {
          "x-access-token": localStorage.getItem(constants.bardemuAuth)
        }
      }).then((res) => {
        const message = encodeURIComponent(`Olá, BarDeMu Lanches! Acabei de fazer um pedido.\nwww.bardemu.com.br/pedido/${res.data._id}`)
        window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, "_blank")
        this.$store.dispatch('resetCart')
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
    },
    increaseProduct(product) {
      product.quantity = product.quantity + 1
    },
    decreaseProduct(product) {
      product.quantity = product.quantity - 1
    }
  }
}
</script>

<style scoped>
.theme--light >>> .v-select .v-select__selections input {
  display: none!important;
}
</style>