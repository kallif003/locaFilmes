<template>
  <button :class="button_class"><slot></slot></button>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { IButtonVariant } from "@/utils/interfaces";
import { cva } from "class-variance-authority";
import { computed } from "vue";

const props = defineProps<{ btnType: keyof IButtonVariant }>();

const button_class = computed(() => {
  return cva(
    `shadow-[0_0.3rem_0.62rem_rgba(0,0,0,0.4)]
	 rounded-md 
	 flex 
	 justify-center
	 items-center 
	 font-[700]`,
    {
      variants: {
        intent: {
          login: `
            w-[96%]
            h-10
            bg-v_gold
            text-white
            mt-5
      `,
          showPassword: `
            absolute  
            top-[5.5rem]
            left-[90%]
            sm:left-[85%]
            text-v_light_gray
            shadow-none
          `,

          paginationButton: `w-[2rem] !h-7 rounded-md`,

          submit: `w-[12rem] h-[3rem] `,

          closeButton: `!h-10 bg-white border-2 border-v_medium_gray px-3`,

          confirmButton: `!h-10 px-3`,
        },
      },
    }
  )({
    intent: props.btnType,
  });
});
</script>
