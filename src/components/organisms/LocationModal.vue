<template>
  <form @submit.prevent="createLocation()">
    <h1 class="text-v_medium_gray mb-2">Alugar Filme</h1>

    <Input
      :value="docNum"
      inputType="input"
      :is-disabled="false"
      placeholder="Cpf:"
      maxlength="14"
      class="ml-[-0.1rem]"
      @keyup="handleClient(maskZipCode($event.target.value))"
    />

    <div class="flex mt-2 space-x-2 text-green-600" v-if="client.name != ''">
      <p>Nome: {{ client.name }}</p>

      <p>Tel:{{ client.phone }}</p>
    </div>

    <p v-if="errorMessage != ''" class="text-red-600 mt-2">
      {{ errorMessage }}
    </p>

    <slot></slot>
  </form>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { PropType } from "vue";
import Input from "../atoms/Input.vue";
import { IClient } from "@/utils/interfaces";

defineProps({
  maskZipCode: {
    type: Function as PropType<(docNum: string) => string>,
    required: true,
  },

  handleClient: {
    type: Function as PropType<(info: string) => void>,
    required: true,
  },

  docNum: { type: String, required: true },

  client: {
    type: Object as PropType<Pick<IClient, "name" | "phone">>,
    required: true,
  },

  createLocation: {
    type: Function as PropType<() => void>,
    required: true,
  },

  errorMessage: { type: String, required: true },
});
</script>
