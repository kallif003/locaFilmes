<template>
  <div :class="container_class">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { IContainerVariant } from "@/utils/interfaces";
import { cva } from "class-variance-authority";
import { computed } from "vue";

const props = defineProps<{
  type: keyof IContainerVariant;
}>();

const container_class = computed(() => {
  return cva("", {
    variants: {
      intent: { login: "" },
    },
  })({
    intent: props.type,
  });
});
</script>
