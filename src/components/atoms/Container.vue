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
      intent: {
        login: `
          bg-gradient-to-r from-v_dark_gray via-v_gray to-v_medium_gray 
          h-screen
          flex
          flex-col
          justify-center
          items-center
        `,

        loadingContainer: `
					w-full
					h-full 
					flex
					justify-center
					items-center 
					z-30
					fixed 
					top-0 
					left-0`,
      },
    },
  })({
    intent: props.type,
  });
});
</script>
