<template>
  <thead>
    <tr>
      <th
        v-for="(items, index) in headers"
        :key="index"
        :class="index == 0 ? 'rounded-tl-md' : ''"
      >
        {{ items }}
      </th>

      <th type="H3" class="rounded-tr-md">{{ action }}</th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { PropType, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
defineProps({
  headers: { type: Array as PropType<string[]>, required: true },

  action: { type: String, required: true },
});

const tableHeaderAlignment = computed(() => {
  if (route.path === "/Painel/Coletas") {
    return "center";
  } else {
    return "start";
  }
});
</script>

<style scoped>
th {
  background-color: #2e2e2e;
  color: #fff;
  height: 3rem;
  text-align: v-bind(tableHeaderAlignment);
  padding: 0 2em;
}
</style>
