<template>
  <v-container class="pa-0 ma-0">
    <v-col offset="1" class="pa-0 pt-5 d-flex flex-column">
      <h1>
        {{edit ? `Editar Produto "${oldName}"` : 'Criar Produto' }}
      </h1>
      <v-row no-gutters class="pt-15">
        <v-col cols="4" class="pa-0">
          <v-form v-model="isFormValid" @submit.prevent>
            <v-col class="pa-0">
              <label for="name">Nome</label>
              <v-text-field
              outlined
              rounded
              v-model="product.name"
              id="name"
              >
              </v-text-field>
            </v-col>
            <v-col class="pa-0">
              <label for="name">Descrição</label>
              <v-text-field
              outlined
              rounded
              v-model="product.description"
              id="description"
              >
              </v-text-field>
            </v-col>
            <v-col class="pa-0">
              <label for="name">Preço</label>
              <v-text-field
              v-model="product.price"
              outlined
              rounded
              id="description"
              >
              </v-text-field>
            </v-col>
            <v-col class="pa-0">
              <label for="name">Foto</label>
              <v-file-input
                truncate-length="15"
                @change="changeFile"
              ></v-file-input>
            </v-col>
            <v-col class="pa-0 d-flex justify-center pt-5">
              <v-btn
              color="green"
              :outlined="false"
              @click="edit? updateProduct() : createProduct()"
              >
                <span style="color: #fff">{{edit ? 'Atualizar' : 'Criar'}}</span>
              </v-btn>
            </v-col>
          </v-form>
        </v-col>
        <v-col cols="8" class="pa-0 d-flex flex-grow-0 justify-center">
            <v-card
              class="mx-auto"
              max-height="400"
            >
              <v-img
                height="200"
                :src="product.image ? product.image : 'https://fermello.com.br/wp-content/themes/consultix/images/no-image-found-360x260.png'"
              ></v-img>
              <v-card-title>{{product.name}}</v-card-title>
              <v-card-text v-if="product.description">
                <div>{{product.description}}</div>
              </v-card-text>
              <v-card-text v-if="product.price">
                <div>R$ {{product.price}}</div>
              </v-card-text>
            </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { bardemu } from '../services'
export default {
  data() {
    return {
      id: "",
      edit: false,
      isFormValid: false,
      product: {
        name: "",
        description: "",
        price: 0,
        image: null
      },
      oldName: ""
    }
  },
  mounted() {
    if(this.$router.history.current.params.id) {
      this.id = this.$router.history.current.params.id
      this.edit = true
      this.getProduct()
    }
  },
  methods: {
    createProduct() {
      console.log(this.product)
      bardemu.post('/product', this.product).then((res) => {
        console.log(res)
        this.$router.push('/produtos')
      }).catch((e =>  {
        console.log(e.response)
      }))
    },
    updateProduct() {
      bardemu.put('/product', this.product, {
        params: {
          _id: this.id
        }
      }).then((res) => {
        console.log(res)
        this.$router.push('/produtos')
      }).catch((e) => {
        console.log(e.response)
      })
    },
    getProduct() {
      bardemu.get('/product', {
        params: {
          _id: this.id
        }
      }).then((res) => {
        this.oldName = res.data.products.name
        this.product = res.data.products
        console.log(res)
      }).catch((e) => {
        console.log(e.response)
      })
    },
    changeFile(e) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(e)
        reader.onload = function () {
          console.log(reader)
          resolve(reader.result.toString())
        }
        reader.onerror = function () {
          reject()
          console.log('error')
        }
      }).then(async (base64) => {
        this.product.image = await base64
        await this.$forceUpdate()
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style>

</style>