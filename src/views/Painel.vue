<template>
  <Container type="painelContainer">
    <MenuSideBarContainer />
    <div class="bg-v_light_gray flex flex-col items-center px-8 py-5">
      <router-view :key="$router.currentRoute.value.path"></router-view>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from "@/components/atoms/Container.vue";
import MenuSideBarContainer from "@/containers/MenuSideBarContainer.vue";
import router from "@/router";
import { AuthorizationUser } from "@/utils/enum";
import { hasPermission } from "@/utils/permissions";
import { onMounted } from "vue";

onMounted(() => {
  if (hasPermission([AuthorizationUser.ADMIN])) {
    router.push({
      name: "Usuarios",
    });
  } else {
    router.push({
      name: "Clientes",
    });
  }
});
</script>
