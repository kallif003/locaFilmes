<template>
  <div
    class="flex justify-between items-center space-x-5"
    :style="
      hasPermission([AuthorizationUser.ADMIN]) ? 'width: 43rem' : 'width: 25rem'
    "
  >
    <v-autocomplete
      v-model="usersSelected"
      :active="true"
      :style="handleAutoCompleteStyle(usersSelected)"
      clearable
      :on-click:clear="userFilterCleaning"
      :onUpdate:modelValue="selectUser"
      :items="users"
      chips
      label="Buscar Usuário"
    ></v-autocomplete>

    <h1 class="mt-7" v-if="hasPermission([AuthorizationUser.ADMIN])">ou</h1>

    <v-autocomplete
      v-if="hasPermission([AuthorizationUser.ADMIN])"
      clearable
      :active="true"
      :style="handleAutoCompleteStyle(docNumSelected)"
      :on-click:clear="userFilterCleaning"
      v-model="docNumSelected"
      :onUpdate:modelValue="selectUserByDocNum"
      :items="docNum"
      chips
      label="Buscar por documento"
    >
    </v-autocomplete>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { hasPermission } from "@/utils/permissions";
import { AuthorizationUser } from "@/utils/enum";
import useProps from "@/context/useProps";
import { PropType, ref } from "vue";

const { handleAutoCompleteStyle } = useProps();

let usersSelected = ref(null);
let docNumSelected = ref(null);

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
  usersSelected.value = null;
};

const selectUser = (username: string) => {
  props.selectUser(username);
  docNumSelected.value = null;
};

const userFilterCleaning = () => {
  props.userFilterCleaning();
  usersSelected.value = null;
  docNumSelected.value = null;
};
</script>
