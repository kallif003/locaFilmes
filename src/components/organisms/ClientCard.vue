<template>
  <container type="card">
    <slot></slot>

    <Wrapper
      v-for="(items, index) in content"
      :key="'customer' + index"
      type="backgroundCard"
      class="h-[16rem]"
    >
      <div class="text-sm px-5">
        <p class="font-extrabold">
          <span class="text-v_gold">Id: </span>{{ items.id }}
        </p>

        <p class="font-extrabold">
          <span class="text-v_light_gray">Nome:</span> {{ items.name }}
          {{ items.surname }}
        </p>

        <p class="font-extrabold">
          <span class="text-v_gold">Email: </span> {{ items.email }}
        </p>

        <p class="font-extrabold">
          <span class="text-v_light_gray">Telefone:</span> {{ items.phone }}
        </p>

        <p class="font-extrabold">
          <span class="text-v_gold">Documento: </span> {{ items.docNum }}
        </p>

        <p class="font-extrabold">
          <span class="text-v_light_gray">Cep:</span> {{ items.cep }}
        </p>

        <p class="font-extrabold">
          <span class="text-v_gold">Rua: </span> {{ items.street }}
        </p>

        <p class="font-extrabold">
          <span class="text-v_light_gray">Bairro:</span> {{ items.district }}
        </p>

        <p class="font-extrabold">
          <span class="text-v_gold">Cidade: </span> {{ items.city }}
        </p>

        <p class="font-extrabold">
          <span class="text-v_light_gray">Estado:</span> {{ items.state }}
        </p>

        <p class="font-extrabold">
          <span class="text-v_gold">Status: </span> {{ items.status }}
        </p>

        <div class="flex space-x-2">
          <p class="font-extrabold text-v_light_gray">Ajustar:</p>

          <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <button
                id="select-action"
                v-bind="props"
                :disabled="items.status == 'Inativo' ? true : false"
              >
                <v-icon icon="mdi-pencil-box-outline" class="" />
              </button>
            </template>

            <v-list>
              <v-list-item>
                <button
                  @click="openUserModal(Actions.UPDATE, items.id)"
                  id="update-customer"
                >
                  Atualizar
                </button>
              </v-list-item>

              <v-list-item>
                <button @click="showDeleteModal(items.id)">Deletar</button>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </Wrapper>
  </container>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { PropType } from "vue";
import { IClient } from "@/utils/interfaces";
import { Actions } from "@/utils/enum";
import Wrapper from "../atoms/Wrapper.vue";
import Container from "../atoms/Container.vue";

defineProps({
  itemsPerPage: { type: Number, required: true },

  actions: { type: Array as PropType<string[]>, required: true },

  content: { type: Array as PropType<IClient[]>, required: true },

  showDeleteModal: {
    type: Function as PropType<(id: string) => void>,
    required: true,
  },

  openUserModal: {
    type: Function as PropType<(action: string, id: string) => void>,
    required: true,
  },
});
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: start;
  padding: 0 2em;
}

th {
  background-color: #77ab59;
  color: #fff;
  height: 3rem;
}

tbody td {
  line-height: 3;
}

.table-container {
  width: 80%;
  overflow-y: auto; /* Adiciona uma barra de rolagem horizontal quando necessário */
}
</style>
