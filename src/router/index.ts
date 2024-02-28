import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/containers/LoginContainer.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
