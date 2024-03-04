<template>
  <div
    class="flex justify-between items-center sm:flex-col w-full sm:w-[40%] space-x-2"
  >
    <div>
      <h1>Buscar por Usuário:</h1>
      <Select
        id="customer-filter"
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
      <h1>Buscar por Documento:</h1>
      <Select
        id="customer-docNum"
        type="filter"
        v-model="docNumSelected"
        @click="selectDocNum(docNumSelected)"
      >
        <option v-for="(item, index) in docNum" :value="item" :key="index">
          {{ item }}
        </option>
      </Select>
    </div>

    <div class="sm:mt-2">
      <h1>Buscar por Status:</h1>
      <Select
        id="customer-status"
        type="filter"
        v-model="statusSelected"
        @click="selectStatus(statusSelected)"
      >
        <option v-for="(item, index) in status" :value="item" :key="index">
          {{ item }}
        </option>
      </Select>
    </div>
  </div>

  <button @click="clientFilterCleaning" v-if="clientIsSelected">
    Limpar<v-icon icon="mdi-close" />
  </button>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import Select from "../atoms/Select.vue";
import { PropType, ref } from "vue";

let clientSelected = ref("");
let docNumSelected = ref("");
let statusSelected = ref("");

const status = ["Ativo", "Inativo"];

const emit = defineEmits(["clientFilterCleaning"]);

let props = defineProps({
  selectFilter: {
    type: Function as PropType<(value: string, key: string) => void>,
    required: true,
  },

  clientIsSelected: { type: Boolean, requerid: true },

  clients: { type: Array as PropType<string[]>, required: true },

  docNum: { type: Array as PropType<any[]>, required: true },
});

const clientFilterCleaning = () => {
  clientSelected.value = "";
  docNumSelected.value = "";
  statusSelected.value = "";

  emit("clientFilterCleaning");
};

const selectDocNum = (docNum: string) => {
  props.selectFilter(docNum, "docNum");
  clientSelected.value = "";
  statusSelected.value = "";
};

const selectClient = (username: string) => {
  props.selectFilter(username, "name");
  docNumSelected.value = "";
  statusSelected.value = "";
};

const selectStatus = (status: string) => {
  props.selectFilter(status, "status");

  clientSelected.value = "";
  docNumSelected.value = "";
};
</script>
