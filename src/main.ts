import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import store from "./store";
import router from "./router";
import { MotionPlugin } from "@vueuse/motion";

// Vuetify
import "vuetify/styles/main.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(store)
  .use(router)
  .use(MotionPlugin)
  .mount("#app");
