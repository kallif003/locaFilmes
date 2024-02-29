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
          top-[4.5rem]
          xl:top-[7.5rem]
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

        menuIcon: `
					h-auto
					flex
					flex-col
					items-center
					justify-between
					py-5`,

        dataTable: `
					min-h-[30rem]
					w-full
					glass-effect
					rounded-lg
					relative
				`,

        header: `
					flex 
					items-center 
					w-full 
					justify-between 
					mb-8
				`,

        actionsModal: `
					bg-white 
					flex 
					flex-col 
					py-5
					px-5
					min-h-[13rem] 
					w-[40rem] 
					text-black 
					rounded-md
				`,

        notification: `
					bg-white
					flex 
					flex-col 
					justify-center
					items-center
					py-5
					px-8
					h-[17rem] 
					text-black 
					rounded-md
				`,

        deleteModal: `
					bg-white
					flex 
					flex-col 
					justify-center 
					items-center 
					h-[10rem] 
					min-w-[30rem] 
					text-black 
					rounded-md
					px-8
				`,

        filter: `flex items-end justify-between  w-[42%]`,
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

.modalContainer {
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  animation: fadeInAnimation ease 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
</style>
