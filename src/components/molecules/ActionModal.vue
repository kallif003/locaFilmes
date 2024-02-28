<template>
  <Container type="backgroundContainer">
    <Wrapper type="modal">
      <Wrapper type="deleteModal">
        <h2 class="text-v_medium_gray text-[1.9rem]">
          {{ title }}
        </h2>

        <Typograph type="Paragraph">{{ subTitle }}</Typograph>

        <div class="flex items-center space-x-5 mt-3">
          <Button
            btnType="confirmButton"
            class="text-white bg-v_gold"
            @click="confirmAction"
          >
            Sim
          </Button>

          <Button btnType="closeButton" @click="closeDeleteModal"> Não </Button>
        </div>
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
  closeDeleteModal: {
    type: Function as any as () => (event: MouseEvent) => void,
    required: true,
  },

  confirmAction: {
    type: Function as any as () => (event: MouseEvent) => void,
    required: true,
  },

  title: {
    type: String,
    requerid: true,
  },

  subTitle: {
    type: String,
    required: true,
  },
});
</script>
