import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Painel from '../views/Painel.vue'
import Product from '../views/Product.vue'
import ProductItem from '../views/ProductItem.vue'
import Categories from '../views/Categories.vue'
import CategoryItem from '../views/CategoryItem.vue'
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

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/minha-conta",
    name: "my-account",
    component: MyAccount
  },
  {
    path: "/minha-conta/dados-pessoais",
    name: "personal-data",
    component: PersonalData
  },
  {
    path: "/minha-conta/enderecos",
    name: "addresses",
    component: Addresses
  },
  {
    path: "/meus-pedidos",
    name: "my-orders",
    component: MyOrders
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
    path: '/menu',
    component: Menu
  },
  {
    path: '/painel',
    component: Painel
  },
  {
    path: '/produtos',
    component: Product
  },
  {
    path: '/produto/:id',
    name: 'product-item',
    component: ProductItem
  }, {
    path: '/categorias',
    name: 'categories',
    component: Categories
  },
  {
    path: '/categoria/:id',
    name: 'category-item',
    component: CategoryItem
  },
  {
    path: '/carrinho',
    name: 'cart',
    component: Cart
  },
  {
    path: '/pedido/:id',
    name: 'order',
    component: OrderItem
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
