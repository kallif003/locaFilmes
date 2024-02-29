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

        painelContainer: `
					grid
					grid-cols-[5%,1fr]
					min-h-screen
max-h-full
					bg-v_ligth_gray
					
					`,

        menuContainer: `
					w-[5.6rem]
					bg-v_medium_gray
					z-10
					flex
					flex-col
					items-center
					justify-between
					text-v_medium_gray
					shadow-[0_0.3rem_0.62rem_rgba(0,0,0,0.8)]`,

        page: "w-full ml-8 mt-2",

        paginationContainer: `
					flex
					justify-around
					items-center
					text-[#c9c9c9]
					w-[33%]
					
				`,

        itemsPerPageContainer: `
					flex
					justify-evenly
					w-[20%]
					items-center
				`,

        backgroundContainer: `
					w-full
					h-full 
					flex
					justify-center
					items-center 
					z-10
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
