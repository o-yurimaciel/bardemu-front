<template>
  <v-container class="pa-0 ma-0">
    <v-col offset="1" class="pa-0 pt-10 d-flex flex-column">
      <v-breadcrumbs
        class="pa-0"
        :items="items"
        divider="/"
      ></v-breadcrumbs>
      <h1>
        {{edit ? `Editar Categoria "${oldName}"` : 'Criar Categoria' }}
      </h1>
      <v-row no-gutters class="pt-15">
        <v-col cols="10" lg="4" class="pa-0">
          <v-form v-model="isFormValid" @submit.prevent>
            <v-col class="pa-0">
              <label for="name">Nome</label>
              <v-text-field
              outlined
              rounded
              v-model="category.name"
              id="name"
              >
              </v-text-field>
            </v-col>
            <v-col class="pa-0">
              <label for="order">Ordem</label>
              <v-text-field
              outlined
              rounded
              v-model="category.order"
              id="order"
              >
              </v-text-field>
            </v-col>
            <v-col class="pa-0 d-flex justify-center pt-5">
              <v-btn
              color="green"
              :outlined="false"
              @click="edit? updateCategory() : createCategory()"
              >
                <span style="color: #fff">{{edit ? 'Atualizar' : 'Criar'}}</span>
              </v-btn>
            </v-col>
          </v-form>
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
      category: {
        name: "",
        order: 1
      },
      oldName: "",
      items: [
        { text: 'Início', href: '/' },
        { text: 'Painel', href: '/painel' },
        { text: 'Categorias', href: '/categorias' }
      ]
    }
  },
  mounted() {
    if(this.$router.history.current.params.id) {
      this.id = this.$router.history.current.params.id
      this.edit = true
      this.getCategory()
    }
  },
  methods: {
    createCategory() {
      console.log(this.category)
      bardemu.post('/category', this.category).then((res) => {
        console.log(res)
        this.$router.push('/categorias')
      }).catch((e =>  {
        console.log(e.response)
      }))
    },
    updateCategory() {
      bardemu.put('/category', this.category, {
        params: {
          _id: this.id
        }
      }).then((res) => {
        console.log(res)
        this.$router.push('/categorias')
      }).catch((e) => {
        console.log(e.response)
      })
    },
    getCategory() {
      bardemu.get('/category', {
        params: {
          _id: this.id
        }
      }).then((res) => {
        this.oldName = res.data.name
        this.category = res.data
        console.log(res)
      }).catch((e) => {
        console.log(e.response)
      })
    },
  }
}
</script>

<style>

</style>