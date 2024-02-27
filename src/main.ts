import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createHead } from "@unhead/vue";

const vuetify = createVuetify({
  components,
  directives,
});

const head = createHead();

createApp(App).use(router).use(vuetify).use(head).mount("#app");
