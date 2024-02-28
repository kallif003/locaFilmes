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
      intent: {
        acessArea: `
          glass-effect
          rounded-md
          flex
          flex-col
          items-center
          justify-center
          h-[55%]
          w-[30%]
          xl:h-[50%]
          lg:w-[40%]
          md:w-[60%]
          sm:w-[80%]
        `,

        inputArea: `
          h-[8rem]
          flex
          flex-col
          justify-between
          w-full
          px-2
          py-2
        `,

        inputIcon: `flex space-x-1 w-full relative`,

        iconArea: `bg-v_light_gray flex justify-center items-center rounded-md w-10`,

        logo: `
          glass-effect 
          w-[10rem] 
          rounded-[50%] 
          h-[8rem] 
          flex 
          items-center 
          justify-center 
          absolute 
          z-10 
          top-[7.5rem]
          px-8
        `,

        textArea: "text-center text-white mt-10 mb-2",

        modal: `
					w-full
					h-full
					absolute
					top-[50%]
					left-[50%]
					flex 
					flex-col
					items-center 
					justify-center
					modalContainer`,
      },
    },
  })({
    intent: props.type,
  });
});
</script>

<style scoped>
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(13.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
