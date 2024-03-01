<template>
  <MenuSideBar
    :id-btn="idBtn"
    :logout="logout"
    :set-id-btn="setIdBtn"
    :menu-icons="menuIcons"
  />
</template>

<script setup lang="ts">
import MenuSideBar from "@/components/molecules/MenuSideBar.vue";
import { watchEffect, ref } from "vue";
import { removeItems } from "@/utils/permissions";
import { AuthorizationUser } from "@/utils/enum";
import router from "@/router";

const menuIcons = [
  {
    id: "users",
    icon: "mdi-clipboard-account",
    path: "/Painel/Usuarios",
    label: "Usuarios",
    permissions: [AuthorizationUser.ADMIN],
  },
  {
    id: "clients",
    icon: "mdi-account-group",
    path: "/Painel/Clientes",
    label: "Clientes",
    permissions: [AuthorizationUser.ADMIN, AuthorizationUser.COLLABORATOR],
  },
  {
    id: "locations",
    icon: "mdi-movie-open-edit-outline",
    path: "/Painel/Locacoes",
    label: "Filmes",
    permissions: [AuthorizationUser.ADMIN, AuthorizationUser.COLLABORATOR],
  },
];

let idBtn = ref("");

const setIdBtn = (id: string) => {
  idBtn.value = id;
};

const logout = () => {
  router.push({ path: "/" });

  removeItems();
};

watchEffect(() => {
  idBtn.value = router.currentRoute.value.path;
});
</script>
