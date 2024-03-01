<template>
  <div class="flex items-center space-x-2 mb-5">
    <div>
      <h1>Buscar por Cliente:</h1>
      <Select
        type="filter"
        v-model="clientSelected"
        @click="selectClient(clientSelected)"
      >
        <option v-for="(item, index) in clients" :value="item" :key="index">
          {{ item }}
        </option>
      </Select>
    </div>

    <div class="sm:mt-2">
      <h1>Buscar por Status:</h1>
      <Select
        type="filter"
        v-model="statusSelected"
        @click="selectStatus(statusSelected)"
      >
        <option v-for="(item, index) in status" :value="item" :key="index">
          {{ item }}
        </option>
      </Select>
    </div>

    <div>
      <p>Selecione uma data</p>

      <input
        type="date"
        class="bg-white shadow-none px-4 font-[100] rounded-md outline-[#e1e4ed] input h-8"
        v-model="date"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { watch } from "vue";
import Select from "../atoms/Select.vue";
import { PropType, ref } from "vue";

let clientSelected = ref("");
let docNumSelected = ref("");
let statusSelected = ref("");
let date = ref("");

const status = ["Alugado", "Entregue"];

let props = defineProps({
  selectClient: {
    type: Function as PropType<(client: string) => void>,
    required: true,
  },

  selectStatus: {
    type: Function as PropType<(status: string) => void>,
    required: true,
  },

  selectDate: {
    type: Function as PropType<(date: string) => void>,
    required: true,
  },

  clients: { type: Array as PropType<string[]>, required: true },

  docNum: { type: Array as PropType<any[]>, required: true },
});

watch(date, () => {
  props.selectDate(date.value);
});

const selectClient = (username: string) => {
  props.selectClient(username);
  docNumSelected.value = "";
  statusSelected.value = "";
};

const selectStatus = (status: string) => {
  props.selectStatus(status);

  clientSelected.value = "";
  docNumSelected.value = "";
};
</script>
