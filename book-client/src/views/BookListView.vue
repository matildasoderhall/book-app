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
  <div class="page-wrapper">
    <MainHeader title="Book List"/>

    <form id="" @submit.prevent="searchBooks">
      <input type="text" placeholder="Search" v-model="searchQuery">
      <button>Submit</button>
    </form>

    <section id="books">
  <article v-for="book in books" :key="book.id" class="book-card">
    <img :src="book.image" alt="Book cover" loading="lazy" width="200"/>
    <div class="book-content">
      <h3>{{ book.title }} by {{ book.author }}</h3>
      <p>
        Published {{ book.published_year }}. <br />
        Genres: {{ book.genres.join(',  ') }}
      </p>
      <div class="book-link">
        <RouterLink :to="`/books/${book._id}`">View book</RouterLink>
      </div>
    </div>
  </article>
</section>


  </div>
</template>


<style lang="scss" scoped>

.page-wrapper {
	margin: 2rem;
}

#books {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  .book-card {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .book-content {
      padding: 1rem;

      h3 {
        margin-top: 0;
        font-size: 1.1rem;
      }

      p {
        font-size: 0.9rem;
        color: #3d405b;
      }

      .book-link {
        margin-top: 0.5rem;

        a {
          color: #3d405b;
          text-decoration: none;
          font-weight: bold;

          &:hover {
            color: #ff6d33;
            text-decoration: underline;
          }
        }
      }
    }
  }
}

</style>
