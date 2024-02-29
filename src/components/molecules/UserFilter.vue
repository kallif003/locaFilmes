<template>
  <div class="flex justify-between items-center space-x-5">
    <div>
      <h1>Buscar por Usuário:</h1>
      <Select
        type="filter"
        v-model="usersSelected"
        @click="selectUser(usersSelected)"
      >
        <option v-for="(item, index) in users" :value="item" :key="index">
          {{ item }}
        </option>
      </Select>
    </div>

    <h1 class="mt-7">ou</h1>

    <div>
      <h1>Buscar por Documento:</h1>
      <Select
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
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import Select from "../atoms/Select.vue";
import useProps from "@/context/useProps";
import { PropType, ref } from "vue";

const { handleAutoCompleteStyle } = useProps();

let usersSelected = ref("");
let docNumSelected = ref("");

let props = defineProps({
  selectUserByDocNum: {
    type: Function as PropType<(docNum: string) => void>,
    required: true,
  },

  selectUser: {
    type: Function as PropType<(user: string) => void>,
    required: true,
  },

  userFilterCleaning: {
    type: Function as PropType<() => void>,
    required: true,
  },

  users: { type: Array as PropType<string[]>, required: true },

  docNum: { type: Array as PropType<any[]>, required: true },
});

const selectUserByDocNum = (docNum: string) => {
  props.selectUserByDocNum(docNum);
  usersSelected.value = "";
};

const selectUser = (username: string) => {
  props.selectUser(username);
  docNumSelected.value = "";
};

const userFilterCleaning = () => {
  props.userFilterCleaning();
  usersSelected.value = "";
  docNumSelected.value = "";
};
</script>
