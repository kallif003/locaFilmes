<template>
  <Container type="card">
    <Wrapper
      class="!w-[15rem]"
      type="backgroundCard"
      v-for="(items, index) in movies"
      :key="index"
    >
      <img
        :src="path + items.poster_path"
        alt="poster"
        :height="10"
        width="220"
      />

      <p class="font-bold text-center">{{ items.title }}</p>

      <p class="text-center text-[0.5rem]">{{ items.release_date }}</p>

      <div class="flex justify-center mt-2">
        <Button
          btn-type="confirmButton"
          class="bg-v_gold"
          @click="openLocationModal(items)"
          >Alugar</Button
        >
      </div>
    </Wrapper>
  </Container>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { IMovies } from "@/utils/interfaces";
import { PropType } from "vue";
import Container from "../atoms/Container.vue";
import Wrapper from "../atoms/Wrapper.vue";
import Button from "../atoms/Button.vue";

const path = "https://image.tmdb.org/t/p/w500/";

defineProps({
  movies: { type: Array as PropType<IMovies[]>, required: true },

  openLocationModal: {
    type: Function as PropType<(movie: IMovies) => void>,
    required: true,
  },
});
</script>

<style>
img {
  border-radius: 0.5rem;
}
</style>
