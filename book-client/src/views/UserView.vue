<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import DataTable from "@/components/DataTable.vue";
  import AdminHeader from '@/fixtures/AdminHeader.vue';

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
  <AdminHeader title="Users"/>
  <main>
    <div class="content-container">
      <h1>All users</h1>
      <div class="table-container">
        <DataTable
          :columns="columns"
          :rows="rows"
        />
      </div>
    </div>
  </main>


</template>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  padding-inline: 3.5rem;
}

.table-container {
  min-width: 1000px;
}

</style>
