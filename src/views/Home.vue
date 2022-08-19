<template>
  <v-container fluid class="pa-0 pa-10 ma-0">
    <div class="overlay" style="z-index: 0">
      <v-col class="pa-0 d-flex justify-center pt-15 text-center">
        <span class="desc" style="color: #fff; letter-spacing: 5px">Seja bem-vindo ao BarDeMu Lanches!</span>
      </v-col>
      <v-col class="pa-0 d-flex justify-center text-center pt-10 pt-lg-0">
        <span class="desc2" style="color: #fff">ACESSE O NOSSO CARDÁPIO!</span>
      </v-col>
      <v-col class="pa-0 d-flex justify-center pt-5">
        <v-btn
        class="btn-cardapio"
        style="height: 80px; width: 180px"
        to="/cardapio"
        >
          <span class="cardapio">Cardápio</span>
        </v-btn>
      </v-col>
    </div>
  </v-container>
</template>

<script>

export default {
  
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('../assets/images/bg.jpg');
  background-size: cover;
  background-position: 100% 55%;
}

.overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, .5);
}

.desc {
  font-family: 'Kaushan Script';
  font-size: 2em;
  font-weight: 100;
  color: #fff;
  margin-left: 10px;
  text-shadow: 1px 3px 3px black;
}

.desc2 {
  font-family: 'Archivo Black';
  font-size: 2.5em;
  text-shadow: 1px 3px 3px black;
}

.cardapio {
  font-family: 'Roboto';
  font-size: 1.5em;
  color: #fff;
}

.btn-cardapio {
  background: linear-gradient(90deg, #a41629 0, #e41c38)!important;
}
</style>