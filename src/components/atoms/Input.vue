<template>
  <input
    :class="input_class"
    :disabled="isDisabled"
    @input="handleInput($event)"
  />
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { IInputVariant } from "@/utils/interfaces";
import { cva } from "class-variance-authority";
import { computed } from "vue";

const emit = defineEmits(["input"]);

const props = defineProps<{
  inputType: keyof IInputVariant;
  isDisabled: boolean;
}>();

const input_class = computed(() => {
  return cva(
    `text-[1rem]
	 font-[700]
	 rounded-md
	 shadow-[0_0.3rem_0.62rem_rgba(0,0,0,0.4)]
	 outline-[#e1e4ed]
	 input`,
    {
      variants: {
        intent: {
          login: "px-2 py-2 w-full",
          input: `w-[18rem] h-[3rem] px-4 inputLogin`,
        },
      },
    }
  )({
    intent: props.inputType,
  });
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  emit("input", value);
};
</script>

<style>
.input::placeholder,
.input::-webkit-input-placeholder {
  color: #9d9797;
}

.input:-ms-input-placeholder {
  color: #9d9797;
}

.input {
  color: #9d9797 !important;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input:focus {
  background: transparent;
  outline: 1px solid #ffd700;
}

input {
  -moz-appearance: textfield;
}

@media (max-width: 767px) {
  .inputLogin {
    width: calc(100% - 5rem) !important;
  }
}
</style>
