import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createHead } from "@unhead/vue";
import { setupClient } from "./clients/AxiosClient";

setupClient({
  movieApiUrl: process.env.VUE_APP_API_MOVIE,
  cepApiUrl: process.env.VUE_APP_API_CEP,
  backUrl: process.env.VUE_APP_BACK,
});

const vuetify = createVuetify({
  components,
  directives,
});

const head = createHead();

createApp(App).use(router).use(vuetify).use(head).mount("#app");
