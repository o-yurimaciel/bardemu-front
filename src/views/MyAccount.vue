<template>
  <v-container fluid class="pa-0 ma-0">
    <v-col offset="1" cols="10" class="pa-0 d-flex justify-center flex-column mx-auto pt-10">
      <v-row no-gutters>
        <v-col cols="11" class="pa-0 d-flex flex-column">
          <v-breadcrumbs
            class="pa-0"
            :items="items"
            divider="/"
          ></v-breadcrumbs>
          <h1>Minha conta</h1>
        </v-col>
      </v-row>
      <v-col lg="8" cols="12" class="pa-0 pt-5">
        <v-row no-gutters>
          <v-col cols="12" class="pa-0 mt-5" v-for="element in elements" :key="element.title">
            <v-card
            class="elevation-1"
            :to="element.to"
            >
              <v-card-title class="text-h5">
                <v-icon class="mr-2">{{element.icon}}</v-icon> {{element.title}}
              </v-card-title>

              <v-card-subtitle>{{element.description}}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: 'Início', href: '/' }
    ],
    elements: [
      { icon: "mdi-account", title: "Dados pessoais", description: "Minhas informações da conta", to: '/minha-conta/dados-pessoais' },
      { icon: "mdi-map-marker", title: "Endereços", description: "Meus endereços de entrega", to: '/minha-conta/enderecos' }
    ]
  }),
}
</script>

<style>

</style>