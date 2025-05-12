<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  columns: string[];
  rows: Record<string, any>[];
}>();
</script>


<template>
 <table class="table">
  <thead>
    <tr>
      <th v-for="column in columns" :key="column">{{ column }}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(row, index) in rows" :key="row.id">
      <td v-for="column in columns" :key="column">{{ row[column.toLowerCase()] }}</td>
    </tr>
  </tbody>
 </table>

</template>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  th,
  td {
    text-align: left; // 👈 make sure everything is left-aligned
    padding: 0.75rem;
    border: 1px solid #ddd;
    font-size: 1rem;
  }
  th {
    background-color: #f9f9f9;
    font-weight: bold;
  }
}
</style>
