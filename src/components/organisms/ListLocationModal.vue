<template>
  <slot name="locationFilter"></slot>
  <table>
    <slot name="header"></slot>

    <tbody style="height: auto">
      <tr
        v-for="(items, index) in locations"
        :key="items.id"
        class="font-medium"
      >
        <td :style="setTableBackground(index)">
          {{ items.client }}
        </td>

        <td :style="setTableBackground(index)">
          {{ items.movie }}
        </td>

        <td :style="setTableBackground(index)">
          {{ items.createdAt.split(",")[0] }}
        </td>

        <td :style="setTableBackground(index)">
          {{ items.date_devolution.split(",")[0] }}
        </td>

        <td :style="setTableBackground(index)">
          {{ items.status }}
        </td>

        <td :style="setTableBackground(index)">
          <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <button
                v-bind="props"
                :disabled="items.status == 'Entregue' ? true : false"
              >
                <v-icon icon="mdi-pencil-box-outline" class="" />
              </button>
            </template>

            <v-list>
              <v-list-item>
                <button @click="returnMovie(items.id)">Devolver</button>
              </v-list-item>
            </v-list>
          </v-menu>
        </td>
      </tr>
    </tbody>
  </table>

  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { ILocation } from "@/utils/interfaces";
import { PropType } from "vue";
import useProps from "@/context/useProps";

const { setTableBackground } = useProps();

defineProps({
  locations: { type: Array as PropType<ILocation[]>, required: true },

  returnMovie: {
    type: Function as PropType<(id: string) => void>,
    required: true,
  },
});
</script>

<style scoped>
@media (max-width: 767px) {
  .table-container {
    width: 40%;
    overflow-y: auto; /* Adiciona uma barra de rolagem horizontal quando necessário */
  }
}

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
</style>
