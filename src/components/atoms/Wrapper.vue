<template>
  <div :class="wrapper_class">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { IWrapperVariant } from "@/utils/interfaces";
import { cva } from "class-variance-authority";
import { computed } from "vue";

const props = defineProps<{ type: keyof IWrapperVariant }>();

const wrapper_class = computed(() => {
  return cva(``, {
    variants: {
      intent: { login: "" },
    },
  })({
    intent: props.type,
  });
});
</script>
