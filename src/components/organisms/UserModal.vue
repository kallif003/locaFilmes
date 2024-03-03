<template>
  <form @submit.prevent="createOrUpdateUser(user, typeAction)">
    <h1 class="text-v_medium_gray">{{ typeAction }} usuário</h1>

    <div :style="styles">
      <Input
        id="username"
        inputType="input"
        :is-disabled="false"
        placeholder="Nome:"
        :class="user.name !== '' ? '!w-full bg-white' : '!w-full'"
        @input="(value: string) => user.name = value"
      />

      <Input
        id="user-email"
        inputType="input"
        :is-disabled="false"
        placeholder="Email:"
        :class="user.email !== '' ? '!w-full bg-white' : '!w-full'"
        @input="(value: string) => user.email = value"
      />

      <Input
        id="user-docNum"
        inputType="input"
        :is-disabled="false"
        placeholder="Documento:"
        :class="user.docNum !== '' ? '!w-full bg-white' : '!w-full'"
        @input="(value: string) => user.docNum = value"
      />

      <Input
        id="user-password"
        inputType="input"
        type="password"
        :is-disabled="false"
        placeholder="Senha:"
        :class="user.password !== '' ? '!w-full bg-white' : '!w-full'"
        @input="(value: string) => user.password = value"
      />
    </div>

    <slot></slot>
  </form>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { PropType, onMounted, reactive, ref, watch } from "vue";
import Input from "../atoms/Input.vue";
import { IInputWrappingStyle, IUsers } from "@/utils/interfaces";
import { Actions } from "@/utils/enum";

const user: Pick<IUsers, "name" | "email" | "docNum" | "password"> = reactive({
  name: "",
  email: "",
  docNum: "",
  password: "",
});

let styles = ref();

const props = defineProps({
  inputWrappingStyle: {
    type: Function as PropType<() => IInputWrappingStyle>,
    required: true,
  },

  typeAction: {
    type: String,
    required: true,
  },

  createOrUpdateUser: {
    type: Function as PropType<
      (user: Pick<IUsers, "name" | "email" | "docNum">, action: string) => void
    >,
    required: true,
  },

  validateDataToCreateUser: {
    type: Function as PropType<
      (user: Pick<IUsers, "name" | "email" | "docNum">) => void
    >,
    required: true,
  },

  validateDataToUpdateUser: {
    type: Function as PropType<
      (user: Pick<IUsers, "name" | "email" | "docNum">) => void
    >,
    required: true,
  },
});

onMounted(() => {
  styles.value = props.inputWrappingStyle();
});

watch(user, () => {
  if (props.typeAction == Actions.SAVE) {
    props.validateDataToCreateUser(user);
  } else {
    props.validateDataToUpdateUser(user);
  }
});
</script>
