<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import MainHeader from "@/fixtures/MainHeader.vue";
  import DataTable from "@/components/DataTable.vue";

  const API_URL = import.meta.env.VITE_API_URL
  const columns = ['Username', 'Password', 'is_admin', 'created_at'];
  const rows = ref([]);

  onMounted(async () => {
  try {
    const res = await fetch(API_URL + 'users')
    const data = await res.json()
    rows.value = data;
  } catch (error) {
    console.error('Error fetching users:', error)
  }
})
</script>

<template>
  <MainHeader title="Admin Users"/>
  <DataTable
  :columns="columns"
  :rows="rows"
  />
</template>
