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
    { variants: { intent: { login: "" } } }
  )({
    intent: props.btnType,
  });
});
</script>
