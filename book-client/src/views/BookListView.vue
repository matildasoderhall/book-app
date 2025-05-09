<script setup lang="ts">
  import MainHeader from "@/fixtures/MainHeader.vue";
  import { onMounted, ref } from "vue";
  import { RouterLink } from "vue-router";

  const API_URL = import.meta.env.VITE_API_URL
  const books = ref([]);
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
  <div>
    <MainHeader title="Book List"/>

    <form id="" @submit.prevent="searchBooks">
      <input type="text" placeholder="Search" v-model="searchQuery">
      <button>Submit</button>
    </form>

    <section id="books" v-for="book in books" :key="book.id">
      <article>
        <div>
           <h3> {{ book.title }} by {{ book.author }} </h3>
           <p> Published {{ book.published_year }}. <br>
            Genres: {{ book.genres[0] }}, {{ book.genres[1] }} </p>
        </div>

        <div class="book-link">
          <RouterLink :to="`/books/${book._id}`">View book</RouterLink>
        </div>

      </article>
    </section>


  </div>
</template>
