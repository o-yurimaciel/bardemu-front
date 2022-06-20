import Vue from 'vue'
import Vuex from 'vuex'
const EventBus = require('../EventBus').EventBus

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
    }
  },
  getters: {
    getCart(state) {
      return state.cart
    }
  },
  actions: {
    addToCart(context, item) {
      let cart = this.state.cart ? this.state.cart : []

      let exist = cart ? cart.some((product) => product._id === item._id) : false

      if(exist) {
        cart.filter((product, index) => {
          if(product._id === item._id) {
            cart[index].quantity = cart[index].quantity + 1
            cart.push(cart[index])
          }
        })
        context.commit('setCart', cart)
      } else {
        item.quantity = 1
        cart.push(item)
        context.dispatch('openAlert', {
          message: `"${item.name}" foi adicionado ao carrinho`,
          type: 'success'
        })
        context.commit('setCart', cart)
      }
      
      localStorage.setItem('bardemuCart', JSON.stringify(cart))
    },
    openAlert(context, alert) {
      EventBus.$emit('alert', alert)
    }
  },
  modules: {
  }
})
