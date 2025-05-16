<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  columns: string[];
  rows: Record<string, any>[];
}>();

const formatCell = (value: any) => {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const date = new Date(value);
    return date.toLocaleDateString();
  }

  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return value ?? '';
};
</script>

<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="row.id ?? index">
          <td v-for="column in columns" :key="column">
            {{
            formatCell(row[column.toLowerCase()])
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;

  thead {
    background-color: #f3f4f6;
  }

  th,
  td {
    text-align: left;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    white-space: nowrap;
  }

  th {
    color: #374151;
    font-weight: 600;
    font-size: 0.95rem;
    background-color: #f9fafb;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:nth-child(odd) {
    background-color: #e3e4e6;
  }

  tbody tr:hover {
    background-color: #f1f5f9;
    transition: background-color 0.2s ease-in-out;
  }
}
</style>


