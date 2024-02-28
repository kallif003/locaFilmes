<template>
  <div class="flex justify-end w-full space-x-5 mt-5">
    <Button
      type="submit"
      btnType="confirmButton"
      :class="showButton ? ' bg-v_gold' : 'bg-v_dark_gray'"
      :disabled="!showButton"
    >
      <p class="text-white">{{ typeAction }}</p>
    </Button>

    <Button btnType="closeButton" @click="closeModal"> Cancelar </Button>
  </div>
</template>
<script setup lang="ts">
/* eslint-disable no-undef */
import { PropType } from "vue";
import Button from "../atoms/Button.vue";

defineProps({
  showButton: {
    type: Boolean,
    required: true,
  },

  closeModal: {
    type: Function as PropType<(event: Event) => void>,
    required: true,
  },

  typeAction: {
    type: String,
    required: true,
  },
});
</script>
