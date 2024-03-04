<template>
  <div class="flex justify-between items-center sm:flex-col w-[80%] sm:w-[40%]">
    <div>
      <h1>Buscar por Usuário:</h1>
      <Select
        id="userFilter"
        type="filter"
        v-model="usersSelected"
        @click="selectUser(usersSelected)"
      >
        <option v-for="(item, index) in users" :value="item" :key="index">
          {{ item }}
        </option>
      </Select>
    </div>

    <div class="sm:mt-2">
      <h1>Buscar por Documento:</h1>
      <Select
        id="docNumFillter"
        type="filter"
        v-model="docNumSelected"
        @click="selectUserByDocNum(docNumSelected)"
      >
        <option v-for="(item, index) in docNum" :value="item" :key="index">
          {{ item }}
        </option>
      </Select>
    </div>
  </div>

  <button @click="userFilterCleaning" v-if="userIsSelected" class="mt-2">
    Limpar<v-icon icon="mdi-close" />
  </button>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import Select from "../atoms/Select.vue";
import { PropType, ref } from "vue";

let usersSelected = ref("");
let docNumSelected = ref("");

const emit = defineEmits(["userFilterCleaning"]);

let props = defineProps({
  selectFilter: {
    type: Function as PropType<(value: string, key: string) => void>,
    required: true,
  },

  userIsSelected: { type: Boolean, requerid: true },

  users: { type: Array as PropType<string[]>, required: true },

  docNum: { type: Array as PropType<any[]>, required: true },
});

const userFilterCleaning = () => {
  usersSelected.value = "";
  docNumSelected.value = "";

  emit("userFilterCleaning");
};

const selectUserByDocNum = (docNum: string) => {
  props.selectFilter(docNum, "docNum");
  usersSelected.value = "";
};

const selectUser = (username: string) => {
  props.selectFilter(username, "name");

  docNumSelected.value = "";
};
</script>
