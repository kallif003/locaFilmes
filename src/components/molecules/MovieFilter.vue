<template>
  <div class="">
    <h1>Buscar filme:</h1>
    <Input
      :value="movie"
      input-type="input"
      :is-disabled="false"
      class="text-white"
      @keyup="getMovieByName($event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { PropType } from "vue";
import Input from "../atoms/Input.vue";

defineProps({
  movie: { type: String, required: true },

  getMovieByName: {
    type: Function as PropType<(name: string) => void>,
    required: true,
  },
});
</script>
