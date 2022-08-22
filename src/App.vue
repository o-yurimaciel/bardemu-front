<template>
  <v-app>
    <v-main>
      <v-row no-gutters>
        <v-col cols="2" class="pa-0">
          <Navigation />
        </v-col>
        <v-col class="pa-0">
          <Header />
          <v-col class="pa-0 content" style="min-height: 100vh">
            <v-alert 
            v-if="alert" 
            style="position: fixed; z-index: 100;"
            :type="alert.type"
            class="alert">
              <span style="word-break: break-word">{{alert.message}}</span>
            </v-alert>
            <router-view></router-view>
          </v-col>
        </v-col>
      </v-row>
      <v-btn 
      rounded
      color="var(--primary-color)"
      dense
      v-if="showUpButton"
      width="5em"
      title="Subir página"
      height="3em"
      @click="scrollTop"
      style="z-index: 99;position: fixed; bottom: 57px; right: 10px;">
        <v-icon size="2em" color="#fff">mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn 
      rounded
      color="green"
      width="5em"
      height="3em"
      title="Fale conosco"
      @click="openWhatsapp"
      style="z-index: 99;position: fixed; bottom: 10px; right: 10px;">
        <v-icon size="2em" color="#fff">mdi-whatsapp</v-icon>
      </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
import constants from './constants'
const EventBus = require('../src/EventBus').EventBus
import showDialog from './utils/dialog'

export default {
  components: {
    Header,
    Navigation
  },
  data() {
    return {
      alert: false,
      showUpButton: false,
      isMobile: false
    }
  },
  mounted() {
    window.addEventListener('resize', this.checkMobile)
    window.addEventListener('scroll', this.checkScroll)

    const auth = localStorage.getItem(constants.bardemuAuth)
    const cart = localStorage.getItem(constants.bardemuCart)
    const userId = localStorage.getItem(constants.bardemuUserId)

    if(auth) {
      this.$store.commit('setAuth', auth)
    }

    if(userId) {
      this.$store.commit('setUserId', userId)
    }

    this.$store.commit('setCart', JSON.parse(cart))
    this.checkMobile()
    
    EventBus.$on('alert', (alert) => {
      this.alert = false
      this.alert = alert
      setTimeout(() => {
        this.alert = false
      }, 5000);
    })
  },
  methods: {
    openWhatsapp() {
      const phone = "555195058185"
      showDialog({
        title: "Você será redirecionado(a) para o nosso WhatsApp. Deseja continuar?",
        options: ["Sim", "Não"]
      }).then((res) => {
        console.log(res)
        if(res === "Sim") {
          window.open(`https://api.whatsapp.com/send?phone=${phone}`, "_blank")
        }
      })
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    checkScroll() {
      if (window.scrollY > 0) {
        this.showUpButton = true
      } else {
        this.showUpButton = false
      }
    },
    checkMobile() {
      if(screen.width <= 1024) {
        this.isMobile = true;
      }
      else {
        this.isMobile = false;
      }
    }
  }
}
</script>

<style>
:root {
  --primary-color: #e41c38;
}

@import url('../src/assets/fonts.css');

.content {
  position: relative;
}

.alert {
  top: 10px;
  right: 10px;
}

.slide-leave-active {
  transition: 0.2s;
}

.slide-enter-active {
  transition: 0.2s;
}

.slide-enter {
  transform: translate(100%, 0);
}

.slide-leave-to {
  transform: translate(300%, 0);
}
</style>