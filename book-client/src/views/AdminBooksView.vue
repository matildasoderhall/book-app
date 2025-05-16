<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { IBook } from '@/types/IBooks'
  import AdminHeader from "@/fixtures/AdminHeader.vue";
  import Datatable from "@/components/DataTable.vue";


  const books = ref<IBook[]>([]);

  const API_URL = import.meta.env.VITE_API_URL

  const searchQuery = ref('');

  onMounted(async () => {
    try {
      const response = await fetch(API_URL + 'books');
      const data = await response.json();
      console.log(data)
      books.value = data;

    } catch (error) {
      console.log(error)
    }
  })

  const searchBooks = () => {
    alert('Query:' + searchQuery.value);
  }

  const columns = ['Title', 'Author', 'Genres', 'Published_year'];

</script>



<template>
  <AdminHeader title="Admin Book Overview"/>
  <main>
    <div>
      <h1>All books</h1>
      <div class="table-wrapper">
        <Datatable :columns="columns" :rows="books" />
      </div>
    </div>
  </main>
</template>


<style scoped lang="scss">
main {
  display: flex;
  justify-content: center;
  padding-inline: 3.5rem;
}

.table-wrapper {
  min-width: 1000px;
}

.search-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  input {
    flex: 1;
    padding: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
  }
}

.book-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    text-align: left;
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
