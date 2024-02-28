import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/containers/LoginContainer.vue";
import Painel from "@/views/Painel.vue";
import { AuthorizationUser } from "@/utils/enum";
import UserContainer from "@/containers/UserContainer.vue";
import { hasPermission, isAuthenticated } from "@/utils/permissions";
import { backClient, setBearerAuthorization } from "@/clients/AxiosClient";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Painel",
    name: "Painel",
    component: Painel,
    meta: {
      protected: true,
      permissions: [AuthorizationUser.ADMIN, AuthorizationUser.COLLABORATOR],
    },
    children: [
      {
        path: "Usuarios",
        name: "Usuarios",
        component: UserContainer,
        meta: {
          protected: true,
          permissions: [AuthorizationUser.ADMIN],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = isAuthenticated();

  if (token.length > 0) {
    setBearerAuthorization(backClient(), token);
    if (to.path == "/") {
      router.push("/Painel");
    }
  }
  const permissions = to.meta.permissions as string[];

  if (to.meta.protected) {
    if (!hasPermission(permissions)) {
      return next({ name: "Login" });
    }
  }
  return next();
});

export default router;
