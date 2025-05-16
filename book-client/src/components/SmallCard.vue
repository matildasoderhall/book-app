<script setup lang="ts">
  import { onMounted, ref, PropType } from "vue";
  import { RouterLink } from "vue-router";
  import type { IBook } from '@/types/IBooks'


defineProps<{book: IBook}>()

</script>

<template>
  <article class="book-card">
    <img :src="book.image" alt="Book cover" loading="lazy" width="200" />
    <div class="book-content">
      <h3>{{ book.title }} by {{ book.author }}</h3>
      <p>
        Published {{ book.published_year }} <br />
        Genres: {{ book.genres.join(', ') }}
      </p>
      <div class="book-link">
        <RouterLink :to="`/books/${book._id}`">View book</RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
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
            color: #be6e46;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
