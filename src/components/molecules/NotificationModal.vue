<template>
  <Container type="backgroundContainer" v-if="showNotificationModal">
    <Wrapper type="modal">
      <Wrapper type="notification">
        <h1 class="text-v_blue text-[2rem]">{{ title }}</h1>

        <h3 class="text-v_medium_gray text-[1.2rem]">
          {{ subTitle }}
        </h3>

        <Button
          id="btn-close"
          btn-type="submit"
          class="bg-v_gold text-white mt-5"
          @click="$emit('closeModal', false)"
        >
          Fechar
        </Button>
      </Wrapper>
    </Wrapper>
  </Container>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import Container from "../atoms/Container.vue";
import Wrapper from "../atoms/Wrapper.vue";
import Button from "../atoms/Button.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },

  showNotificationModal: { type: Boolean, required: true },
});
</script>
