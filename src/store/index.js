import Vue from 'vue'
import Vuex from 'vuex'
import constants from '../constants'
const EventBus = require('../EventBus').EventBus

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: null,
    auth: false,
    login: '',
    userId: ""
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
    },
    setLogin(state, login) {
      if(login) {
        localStorage.setItem(constants.bardemuLogin, login)
      } else {
        localStorage.removeItem(constants.bardemuLogin)
      }
      state.login = login
    },
    setAuth(state, auth) {
      if(auth) {
        localStorage.setItem(constants.bardemuAuth, auth)
      } else {
        localStorage.removeItem(constants.bardemuAuth)
      }
      state.auth = auth
    },
    setUserId(state, userId) {
      state.userId = userId

      if(userId) {
        localStorage.setItem(constants.bardemuUserId, userId)
      } else {
        localStorage.removeItem(constants.bardemuUserId)
      }
    }
  },
  getters: {
    getCart(state) {
      return state.cart
    },
    getAuth(state) {
      return state.auth
    },
    getLogin(state) {
      return state.login
    }
  },
  actions: {
    resetCart(context) {
      context.commit('setCart', null)
      localStorage.removeItem(constants.bardemuCart)
    },
    addToCart(context, item) {
      let cart = this.state.cart ? this.state.cart : []

      cart.push(item)

      context.dispatch('openAlert', {
        message: `"${item.name} (${item.quantity})" foi adicionado ao carrinho`,
        type: 'success'
      })

      context.commit('setCart', cart)

      localStorage.setItem(constants.bardemuCart, JSON.stringify(cart))
    },
    removeInCart(context, item) {
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

      localStorage.setItem(constants.bardemuCart, JSON.stringify(cart))
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
      localStorage.setItem(constants.bardemuCart, JSON.stringify(cart))
    },
    openAlert(context, alert) {
      EventBus.$emit('alert', alert)
    }
  },
  modules: {
  }
})
