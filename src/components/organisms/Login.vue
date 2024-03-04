<template>
  <Wrapper type="acessArea">
    <Wrapper type="textArea">
      <h1 class="text-[2rem]">Aloca Filmes</h1>
      <p>Após o login você terá acesso as funcionalidades</p>
    </Wrapper>

    <form
      @submit.prevent="login()"
      class="w-[90%] flex flex-col items-center relative"
    >
      <Wrapper type="inputArea">
        <Wrapper type="inputIcon">
          <Wrapper type="iconArea">
            <v-icon icon="mdi-account" />
          </Wrapper>

          <Input
            id="email"
            type="email"
            data-cy="email"
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
            :type="inputType"
            :isDisabled="false"
            @input="(value: string) => userInfo.password = value"
          />
        </Wrapper>

        <p
          id="errorMsg"
          class="text-red-500 text-center text-[0.75rem] absolute top-[8rem] left-[30%]"
          v-if="validationError"
        >
          {{ errorMessage }}. Tente novamente
        </p>
      </Wrapper>
      <Button
        btn-type="login"
        type="submit"
        id="btn"
        :disabled="!showButton"
        :class="showButton ? ' bg-v_gold' : 'bg-v_medium_gray'"
      >
        Entrar
      </Button>

      <Button
        btnType="showPassword"
        @click.prevent="showPassword"
        id="showPassword"
      >
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

const emit = defineEmits(["login"]);

const login = () => {
  emit("login", userInfo.value);
};

const props = defineProps({
  eyeIcon: { type: Boolean, required: true },

  inputType: { type: String, required: true },

  showButton: { type: Boolean, required: true },

  showPassword: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true,
  },

  validatedUserInfo: {
    type: Function as PropType<(userInfo: IUserInfo) => void>,
    required: true,
  },

  // login: {
  //   type: Function as PropType<(userInfo: IUserInfo) => void>,
  //   required: true,
  // },

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
