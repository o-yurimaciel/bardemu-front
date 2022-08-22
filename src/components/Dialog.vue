<template>
  <v-dialog
    v-if="showDialog"
    persistent
    v-model="showDialog"
  >
    <v-card
      :outlined="true"
      height="auto"
      style="overflow: hidden!important"
    >
      <v-col class="pa-5 pa-lg-10 d-flex justify-center flex-column">
        <v-col cols="6" class="pa-0 pb-5 d-flex justify-center mx-auto" v-if="icon">
          <v-icon size="50" color="var(--primary-color)">{{icon}}</v-icon>
        </v-col>
        <v-col class="pa-0 pb-5 mx-auto text-center">
          <span class="span-value mx-auto" style="fontSize: 22px; line-height: 1">{{title}}</span>
        </v-col>
        <v-col lg="4" cols="12" class="pa-0 mx-auto" v-for="(option) in options" :key="option">
          <v-btn
            :outlined="true"
            rounded
            block
            color="var(--primary-color)"
            dense
            max-width="80px"
            class="mb-3 center-block text-capitalize"
            @click="setOption(option)">
              {{option}}
          </v-btn>
        </v-col>
      </v-col>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "bardemuDialog",
  data() {
    return {
      retVal: "",
      showDialog: true
    }
  },
  props: ["title", "options", "icon"],
  created() {
    this.showDialog = true;
  },
  methods: {
    setOption(option) {
      this.retVal = option
      this.showDialog = false
    }
  },
};
</script>
<style scoped>

</style>
