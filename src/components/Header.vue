<template>
  <header>
    <v-col cols="11" class="pa-0">
      <v-row no-gutters class="d-flex align-center justify-space-between ml-5">
        <v-col cols="10" class="pa-0">
          <span class="desc" style="cursor: pointer" title="Voltar ao Início" @click="goToHome">BarDeMu Lanches</span>
        </v-col>
      </v-row>
    </v-col>
  </header>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      if(this.login) {
        this.$store.commit('setAuth', false)
        this.$store.commit('setLogin', '')
      }
      this.$router.push('/login')
    },
    goToHome() {
      this.$router.push('/')
    },
    goToPainel() {
      this.$router.push('/painel')
    }
  }
}
</script>

<style scoped>
.desc {
  font-family: 'Aladin';
  font-size: 2em;
  color: #fff;
  margin-left: 10px;
}

header {
  width: 100%;
  padding: 10px 0 10px 0;
  background-color: #fff;
  display: flex;
  align-content: center;
  box-shadow: 0px 3px 6px #00000029;
  background-color: #3f0d12;
  background-image: linear-gradient(90deg, #a41629 0, #e41c38);
}
</style>