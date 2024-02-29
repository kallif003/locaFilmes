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
import { PropType } from "vue";

defineProps({
  headers: { type: Array as PropType<string[]>, required: true },

  action: { type: String, required: true },
});
</script>

<style scoped>
th,
td {
  width: 1%;
  background-color: #2e2e2e;
  color: #fff;
  height: 3rem;
  text-align: start;
  padding: 0 2em;
}
</style>
