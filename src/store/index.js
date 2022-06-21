import Vue from 'vue'
import Vuex from 'vuex'
const EventBus = require('../EventBus').EventBus

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    cartTotalValue: ''
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
    },
  },
  getters: {
    getCart(state) {
      return state.cart
    }
  },
  actions: {
    resetCart(context) {
      context.commit('setCart', [])
      localStorage.setItem('bardemuCart', JSON.stringify([]))
    },
    addToCart(context, item) {
      let cart = this.state.cart ? this.state.cart : []

      if(item.quantity === 1) {
        cart.push(item)
        context.dispatch('openAlert', {
          message: `"${item.name}" foi adicionado ao carrinho`,
          type: 'success'
        })
        context.commit('setCart', cart)
      } else {
        cart.filter((product, index) => {
          if(product._id === item._id) {
            cart[index].quantity = item.quantity
            context.commit('setCart', cart)
            context.dispatch('openAlert', {
              message: `"${cart[index].name}" foi adicionado ao carrinho`,
              type: 'success'
            })
            EventBus.$emit('update-cart', cart)
          }
        })
      }
      localStorage.setItem('bardemuCart', JSON.stringify(cart))
    },
    removeAllToCart(context, item) {
      let cart = this.state.cart ? this.state.cart : []

      context.dispatch('openAlert', {
        message: `"${item.name}" foi removido do carrinho`,
        type: 'success'
      })

      cart.filter((product, index) => {
        if(product._id === item._id) {
          cart.splice(index, 1)
        }
      })

      context.commit('setCart', cart)

      localStorage.setItem('bardemuCart', JSON.stringify(cart))
    },
    removeToCart(context, item) {
      let cart = this.state.cart ? this.state.cart : []

      context.dispatch('openAlert', {
        message: `"${item.name}" foi removido do carrinho`,
        type: 'success'
      })

      cart.filter((product, index) => {
        if(product._id === item._id) {
          if(item.quantity <= 0) {
            cart.splice(index, 1)
            context.commit('setCart', cart)
          } else {
            context.commit('setCart', cart)
            EventBus.$emit('update-cart', cart)
          }
        }
      })
      localStorage.setItem('bardemuCart', JSON.stringify(cart))
    },
    openAlert(context, alert) {
      EventBus.$emit('alert', alert)
    }
  },
  modules: {
  }
})
