import Dialog from "../components/Dialog.vue";
import _Vue from "vue";
import vuetify from '../plugins/vuetify'

export default function showDialog({ title, options, icon }) {
  return new Promise((resolve) => {
    var dialogInstance = _Vue.extend(Dialog);

    var component = new dialogInstance({
      vuetify,
      propsData: {
        title: title,
        options: options ? options : null,
        icon: icon,
        retval: 0,
      },
    }).$mount();

    component.$watch("retVal", function(newVal) {
      resolve(newVal);
      component.$destroy()
    });
  });
}
