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
import { onMounted } from "vue";

onMounted(() => {
  router.push({
    name: "Usuarios",
  });
});
</script>
