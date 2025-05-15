<script setup lang="ts">
  import AdminHeader from "@/fixtures/AdminHeader.vue";
  import { onMounted, ref } from "vue";
  import { IBook } from '@/types/IBooks'


  const books = ref<IBook[]>([]);


  const newBook = ref<IBook>({
    title: '',
    description: '',
    author: '',
    genres: [],
    image: '',
    published_year: 0,
    id: '',
    _id: ''
  });

  const genreInput = ref('');


  const createBook = async () => {

    newBook.value.genres = genreInput.value.split(',').map(g => g.trim()).filter(g => g !== '');

    try {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Send a POST request to the backend API with the book data
      const response = await fetch(import.meta.env.VITE_API_URL + 'books', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(newBook.value),
        headers: myHeaders
      });


      const result = await response.json();
      console.log('Book created:', result);
    } catch (error) {

      console.error('Error creating book:', error);
    }
  };
</script>

<template>
  <AdminHeader title="Add book"/>

  <main>
    <div>
      <h1>Add a new book</h1>
      <form @submit.prevent="createBook" class="book-form">
        <label>
          <input type="text" v-model="newBook.title" placeholder="Title" required />
        </label>

        <label>
          <input type="text" v-model="newBook.author" required placeholder="Author"/>
        </label>

        <label>
          <textarea v-model="newBook.description" required placeholder="Description"></textarea>
        </label>

        <label>
          <input type="text" v-model="genreInput" required placeholder="Genres"/>
        </label>

        <label>
          <input type="text" v-model="newBook.image" required placeholder="Link to book cover image"/>
        </label>

        <label>
          <input type="number" v-model.number="newBook.published_year" required placeholder="Year published"/>
        </label>

        <button type="submit">Add book to database</button>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: center;
  padding-inline: 3.5rem;
}

.book-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fdfdfd;
  border: 1px solid #ccc;
  border-radius: 8px;

  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    font-size: 0.95rem;

    input,
    textarea {
      margin-top: 0.4rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }
  }

  button {
    align-self: flex-start;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    background-color: #3d405b;
    color: white;
    border: none;
    border-radius: 9999px ;
    cursor: pointer;

    &:hover {
      background-color: #be6e46;
    }
  }
}
</style>


