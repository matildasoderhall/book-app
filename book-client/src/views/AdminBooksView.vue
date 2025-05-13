<script setup lang="ts">
  import MainHeader from "@/fixtures/MainHeader.vue";
  import { onMounted, ref } from "vue";
  import { RouterLink } from "vue-router";
    import { IBook } from '@/types/IBooks'

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

</script>



<template>
  <MainHeader title="Admin Book Overview"/>
  <div class="page-wrapper">

    <form id="" @submit.prevent="searchBooks">
      <input type="text" placeholder="Search" v-model="searchQuery">
      <button>Submit</button>
    </form>

    <table class="book-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Genres</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.genres.join(', ') }}</td>
          <td>{{ book.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped lang="scss">
.page-wrapper {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
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
