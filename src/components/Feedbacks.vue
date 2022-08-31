<template>
  <v-container fluid class="feedbacks-container pa-0 ma-0 pt-15 pb-15">
    <v-col class="pa-0 d-flex flex-column justify-center mx-auto">
      <v-col cols="10" lg="12" class="pa-0 d-flex justify-center mx-auto text-center">
        <transition name="left-center">
          <h1 class="desc2">Confira as últimas avaliações dos nossos clientes</h1>
        </transition>
      </v-col>
      <v-col class="pa-0 d-flex justify-center pt-10">
        <img width="100" src="../assets/images/love.png" alt="">
      </v-col>
      <v-col lg="6" cols="12" class="pa-0 mx-auto">
        <v-carousel 
        v-model="carousel"
        height="auto"
        hide-delimiters
        hide-delimiter-background
        continuous
        interval="10000"
        cycle
        >
          <v-carousel-item 
          v-for="(feedback, index) in feedbacks"
          :key="'feedback' + index">
            <v-col lg="8" cols="6" style="height: 300px" class="pa-0 ma-15 d-flex justify-center flex-column mx-auto">
              <v-col class="pa-0 d-flex justify-center">
                <v-row no-gutters class="d-flex align-center justify-center">
                  <span class="shake" style="font-weight: bold">{{feedback.rating}}</span>
                  <v-rating
                    title="Avaliação"
                    v-model="feedback.rating"
                    icon-label="custom icon label text {0} of {1}"
                    color="yellow"
                    readonly
                    class="shake"
                    background-color="var(--primary-color)"
                  ></v-rating>
                </v-row>
              </v-col>
              <v-col class="pa-0 d-flex justify-center text-center">
                <p class="shake">"{{feedback.message}}"</p>
              </v-col>
              <v-col class="pa-0 d-flex justify-center">
                <span class="shake" style="fontStyle: italic">- {{feedback.name}}</span>
              </v-col>
            </v-col>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="10" lg="12" class="pa-0 d-flex justify-center mx-auto text-center">
        <h1 class="desc2">Não vai ficar de fora nessa né? Pede um BarDeMu!</h1>
      </v-col>
      <v-col class="pa-0 d-flex justify-center pt-5">
        <v-btn
        outlined
        to="/cardapio"
        color="#fff"
        >
          Cardápio
        </v-btn>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { bardemu } from '../services'
export default {
  data() {
    return {
      feedbacks: [],
      carousel: 0
    }
  },
  mounted() {
    this.getFeedbacks()
  },
  methods: {
    getFeedbacks() {
      bardemu.get('/feedbacks/favorites').then((res) => {
        console.log(res)
        this.feedbacks = res.data.reverse()
      }).catch((e) => {
        console.log(e.response)
      })
    }
  }
}
</script>

<style scoped>
.feedbacks-container {
  background-color: #3f0d12;
  background-image: linear-gradient(90deg, #a41629 0, #e41c38);
}

.desc2 {
  font-family: 'Archivo Black';
  font-size: 1.5em;
  color: #fff;
  text-shadow: 1px 3px 3px black;
}

p, span {
  font-family: 'Archivo Black';
  color: #fff;
  text-shadow: 1px 3px 3px black;
}
</style>