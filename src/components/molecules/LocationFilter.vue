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

    <button @click="movieFilterCleaning" v-if="locationFilterIsSelected">
      Limpar<v-icon icon="mdi-close" />
    </button>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { watch } from "vue";
import Select from "../atoms/Select.vue";
import { PropType, ref } from "vue";

let clientSelected = ref("");
let statusSelected = ref("");
let date = ref("");

const status = ["Alugado", "Entregue"];

const emit = defineEmits(["movieFilterCleaning"]);

const movieFilterCleaning = () => {
  clientSelected.value = "";
  statusSelected.value = "";
  date.value = "";

  emit("movieFilterCleaning");
};

let props = defineProps({
  selectFilter: {
    type: Function as PropType<(value: string, key: string) => void>,
    required: true,
  },

  locationFilterIsSelected: { type: Boolean, required: true },

  clients: { type: Array as PropType<string[]>, required: true },

  docNum: { type: Array as PropType<any[]>, required: true },
});

watch(date, () => {
  props.selectFilter(date.value, "createdAt");
});

const selectClient = (username: string) => {
  props.selectFilter(username, "customer");
  statusSelected.value = "";
};

const selectStatus = (status: string) => {
  props.selectFilter(status, "status");
  clientSelected.value = "";
};
</script>
