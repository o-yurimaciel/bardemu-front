import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Painel from '../views/Painel.vue'
import Product from '../views/Product.vue'
import ProductItem from '../views/ProductItem.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
