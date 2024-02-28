<template>
  <Wrapper type="acessArea">
    <Wrapper type="textArea">
      <h1 class="text-[2rem]">Lóca Filmes</h1>
      <p>Após o login você terá acesso as funcionalidades</p>
    </Wrapper>

    <form
      @submit.prevent="login(userInfo)"
      class="w-[90%] flex flex-col items-center relative"
    >
      <Wrapper type="inputArea">
        <Wrapper type="inputIcon">
          <Wrapper type="iconArea">
            <v-icon icon="mdi-account" />
          </Wrapper>

          <Input
            input-type="login"
            placeholder="Email:"
            :isDisabled="false"
            @input="(value: string) => userInfo.email = value"
          />
        </Wrapper>

        <Wrapper type="inputIcon">
          <Wrapper type="iconArea">
            <v-icon icon="mdi-lock" />
          </Wrapper>

          <Input
            id="pass"
            input-type="login"
            placeholder="Senha:"
            type="password"
            :isDisabled="false"
            @input="(value: string) => userInfo.password = value"
          />
        </Wrapper>

        <p
          class="text-red-500 text-center text-[0.75rem] absolute top-[8rem] left-[30%]"
          v-if="validationError"
        >
          {{ errorMessage }}. Tente novamente
        </p>
      </Wrapper>
      <Button
        btn-type="login"
        type="submit"
        :disabled="!showButton"
        :class="showButton ? ' bg-v_gold' : 'bg-v_medium_gray'"
      >
        Entrar
      </Button>

      <Button btn-type="showPassword" @click.prevent="showPassord">
        <v-icon :icon="eyeIcon ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" />
      </Button>
    </form>
  </Wrapper>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import Wrapper from "../atoms/Wrapper.vue";
import Button from "../atoms/Button.vue";
import Input from "../atoms/Input.vue";
import { PropType, ref, watch } from "vue";
import { IUserInfo } from "@/utils/interfaces";

let userInfo = ref<IUserInfo>({ email: "", password: "" });

const props = defineProps({
  eyeIcon: { type: Boolean, required: true },

  showButton: { type: Boolean, required: true },

  showPassord: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true,
  },

  validatedUserInfo: {
    type: Function as PropType<(userInfo: IUserInfo) => void>,
    required: true,
  },

  login: {
    type: Function as PropType<(userInfo: IUserInfo) => void>,
    required: true,
  },

  validationError: { type: Boolean, required: true },

  errorMessage: {
    type: String,
    required: true,
  },
});

watch(userInfo.value, () => {
  props.validatedUserInfo(userInfo.value);
});
</script>
