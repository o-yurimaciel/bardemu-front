<template>
  <v-container class="pa-0 ma-0">
    <v-col offset="1" class="pa-0 d-flex flex-column">
      <v-row no-gutters class="pt-10">
        <v-col cols="3" class="pa-0" v-for="item in items" :key="item.description">
          <v-card class="mx-auto mr-2" :to="item.to">
            <v-img
            :src="item.src"
            height="200px"
            >
            </v-img>
            <v-card-title>
              {{item.description}}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      productName: '',
      price: '',
      items: [
        { 
          description: 'Pedidos',
          src: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1621025103/assets/58/fed8fc-73e7-428e-a68c-802887085104/original/hero_manage_orders_3x2_2x.png',
          to: '/orders' 
        },
        { 
          description: 'Produtos', 
          src: 'https://img.olhardigital.com.br/wp-content/uploads/2021/04/Junk-Food.jpg',
          to: '/produtos'
        },
        { 
          description: 'Categorias', 
          src: 'https://pulpo.work/wp-content/uploads/2018/04/checklist-para-o-vendedor-aumentar-fechamento-994x480.png',
          to: '/categorias' 
        }
      ]
    }
  },
  methods: {
    sendProduct() {
      axios.post('https://bardemu-backend.herokuapp.com/produtos', {
        name: this.productName,
        price: this.price
      }).then((res) => {
        console.log(res)
        this.$router.push('/')
      }).catch((e) => {
        console.log(e.response)
      })
    }
  }
}
</script>

<style>

</style>