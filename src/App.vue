<template>
  <router-view :key="$router.currentRoute.value.path.split('/')[0]">
  </router-view>
</template>

<script setup lang="ts">
import { isAuthenticated } from "./utils/permissions";
import { setBearerAuthorization, backClient } from "./clients/AxiosClient";

const token = isAuthenticated();

if (token.length > 0) {
  setBearerAuthorization(backClient(), token);
  setBearerAuthorization(backClient(), token);
}
</script>
