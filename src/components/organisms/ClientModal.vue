<template>
  <form @submit.prevent="createOrUpdateClient(client, typeAction)">
    <h1 class="text-v_medium_gray">{{ typeAction }} usuário</h1>

    <div class="flex justify-between flex-wrap space-y-2 px-2 py-2">
      <Input
        inputType="input"
        :is-disabled="false"
        placeholder="Nome:"
        :class="client.name !== '' ? ' bg-white mt-2 w-[49%]' : 'mt-2 w-[49%]'"
        @keyup="handleClient($event.target.value, 'name')"
      />

      <Input
        inputType="input"
        :is-disabled="false"
        placeholder="Sobrenome:"
        :class="client.surname !== '' ? ' bg-white w-[49%]' : 'w-[49%]'"
        @keyup="handleClient($event.target.value, 'surname')"
      />

      <Input
        inputType="input"
        :is-disabled="false"
        placeholder="Email:"
        :class="client.email !== '' ? ' bg-white w-[49%]' : 'w-[49%]'"
        @keyup="handleClient($event.target.value, 'email')"
      />

      <Input
        inputType="input"
        :is-disabled="false"
        placeholder="Telefone:"
        :class="client.phone !== '' ? ' bg-white w-[49%]' : 'w-[49%]'"
        @keyup="handleClient($event.target.value, 'phone')"
      />

      <Input
        :value="client.docNum"
        inputType="input"
        maxlength="14"
        :is-disabled="false"
        placeholder="Cpf:"
        :class="client.docNum !== '' ? ' bg-white w-[49%]' : 'w-[49%]'"
        @keyup="handleClient(maskZipCode($event.target.value), 'docNum')"
      />

      <Input
        inputType="input"
        :is-disabled="false"
        placeholder="Cep:"
        :class="client.cep !== '' ? ' bg-white w-[49%]' : 'w-[49%]'"
        @keyup="validateZipCode($event.target.value)"
      />

      <Input
        :value="client.street"
        inputType="input"
        :is-disabled="false"
        placeholder="Rua:"
        :class="client.street !== '' ? ' bg-white w-[49%]' : 'w-[49%]'"
        @keyup="handleClient($event.target.value, 'street')"
      />

      <Input
        :value="client.district"
        inputType="input"
        :is-disabled="false"
        placeholder="Bairro:"
        :class="client.district !== '' ? ' bg-white w-[49%]' : 'w-[49%]'"
        @keyup="handleClient($event.target.value, 'district')"
      />

      <Input
        :value="client.city"
        inputType="input"
        :is-disabled="false"
        placeholder="Cidade:"
        :class="client.city !== '' ? ' bg-white w-[49%]' : 'w-[49%]'"
        @keyup="handleClient($event.target.value, 'city')"
      />

      <Input
        :value="client.state"
        inputType="input"
        :is-disabled="false"
        placeholder="Estado:"
        :class="client.state !== '' ? ' bg-white w-[49%]' : 'w-[49%]'"
        @keyup="handleClient($event.target.value, 'state')"
      />
    </div>

    <slot></slot>
  </form>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { PropType, onMounted, ref } from "vue";
import Input from "../atoms/Input.vue";
import { ClientForm, IInputWrappingStyle } from "@/utils/interfaces";

let styles = ref();

const props = defineProps({
  client: { type: Object as PropType<ClientForm>, required: true },

  inputWrappingStyle: {
    type: Function as PropType<() => IInputWrappingStyle>,
    required: true,
  },

  typeAction: {
    type: String,
    required: true,
  },

  maskZipCode: {
    type: Function as PropType<(docNum: string) => string>,
    required: true,
  },

  createOrUpdateClient: {
    type: Function as PropType<(client: ClientForm, action: string) => void>,
    required: true,
  },

  validateZipCode: {
    type: Function as PropType<(zipCode: string) => void>,
    required: true,
  },

  handleClient: {
    type: Function as PropType<(info: string, key: string) => void>,
    required: true,
  },
});

onMounted(() => {
  styles.value = props.inputWrappingStyle();
});
</script>
