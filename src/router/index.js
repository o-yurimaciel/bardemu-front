import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import OrderItem from '../views/OrderItem.vue'
import TermsOfUse from '../views/TermsOfUse.vue'
import MyAccount from '../views/MyAccount.vue'
import MyOrders from '../views/MyOrders.vue'
import PersonalData from '../views/PersonalData.vue'
import Addresses from '../views/Addresses.vue'
import store from '../store'
import constants from '../constants'

Vue.use(VueRouter)

function auth(to, from, next) {
  const auth = localStorage.getItem(constants.bardemuAuth)

  if(auth) {
    next()
  } else {
    store.commit('setAuth', null)
    store.commit('setLogin', null)
    store.commit('setUserId', null)
    store.dispatch('openAlert', {
      message: 'Usuário não autenticado',
      type: 'error'
    })
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/minha-conta",
    name: "my-account",
    component: MyAccount,
    beforeEnter: auth
  },
  {
    path: "/minha-conta/dados-pessoais",
    name: "personal-data",
    component: PersonalData,
    beforeEnter: auth
  },
  {
    path: "/minha-conta/enderecos",
    name: "addresses",
    component: Addresses,
    beforeEnter: auth
  },
  {
    path: "/meus-pedidos",
    name: "my-orders",
    component: MyOrders,
    beforeEnter: auth
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/cadastro',
    name: 'register',
    component: Register
  },
  {
    path: '/cardapio',
    component: Menu
  },
  {
    path: '/carrinho',
    name: 'cart',
    component: Cart
  },
  {
    path: '/pedido/:id',
    name: 'order',
    component: OrderItem,
    beforeEnter: auth
  },
  {
    path: "/termos",
    name: "terms",
    component: TermsOfUse
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
