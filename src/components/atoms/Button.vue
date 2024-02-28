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
        },
      },
    }
  )({
    intent: props.btnType,
  });
});
</script>
