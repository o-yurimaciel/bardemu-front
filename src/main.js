import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import './filters'
import './plugins/currency-field'
import './plugins/vue-mask'
import { bardemu } from './services'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

bardemu.interceptors.response.use(
  res => res,
  err => {
    const statusCode = err.response.status
    if (statusCode === 401 || statusCode === 403) {
      store.commit('setAuth', null)
      store.dispatch('openAlert', {
        message: 'A autenticação falhou. Por favor, faça o login.',
        type: "error"
      })
      router.push('/login')
      return
    } else {
      if(!err.response || !err.response.data) {
        store.dispatch('openAlert', {
          message: 'Ocorreu um problema. Tente novamente mais tarde.',
          type: "error"
        })
      } else {
        throw err
      }
    }
    throw err
  }
)
