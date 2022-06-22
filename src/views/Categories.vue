<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="10" class="pa-0 d-flex justify-center flex-column mx-auto pt-15">
      <v-row no-gutters>
        <v-col class="pa-0 d-flex flex-column">
          <v-breadcrumbs
            class="pa-0"
            :items="items"
            divider="/"
          ></v-breadcrumbs>
          <h1>Categorias</h1>
        </v-col>
        <v-btn 
        color="green"
        class="text-capitalize"
        >
          <span @click="addCategory" style="color: #fff">Adicionar Categoria</span>
        </v-btn>
      </v-row>
      <v-col cols="6" class="pa-0 mx-auto content">
        <table style="width: 100%">
          <tbody v-for="category in categories" :key="category._id">
            <tr style="height: 50px; margin: 20px">
              <th style="text-align: left;">Nome</th>
              <th style="text-align: left;">Ordem</th>
              <th style="text-align: right">Ações</th>
            </tr>
            <tr>
              <td style="text-align:left">{{category.name}}</td>
              <td style="text-align:left">{{category.order}}</td>
              <td style="text-align: right">
                <v-btn 
                class="mr-2"
                color="green"
                @click="editCategory(category._id)"
                >
                  <v-icon color="#FFF">mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                color="red"
                @click="deleteCategory(category._id)"
                >
                  <v-icon color="#fff">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { bardemu } from '../services'
  export default {
    data: () => ({
      categories:[],
      items: [
        { text: 'Início', href: '/' },
        { text: 'Painel', href: '/painel' }
      ]
    }),
    mounted() {
      this.getCategories()
    },
    methods: {
      getCategories() {
        bardemu.get('/category')
        .then((res) => {
          this.categories = res.data
          console.log(res)
        }).catch((e) => {
          console.log(e.response)
        })
      },
      addCategory() {
        this.$router.push({
          name: 'category-item'
        })
      },
      deleteCategory(id) {
        bardemu.delete('/category', {
          data: {
            _id: id
          }
        }).then((res) => {
          console.log(res)
          this.getCategories()
        }).catch((e) => {
          console.log(e.response)
        })
      },
      editCategory(id) {
        this.$router.push(`/categoria/${id}`)
      }
    }
  }
</script>

<style scoped>
table {
  border-collapse: collapse;
}

table tbody {
  margin: 10px;
}
</style>