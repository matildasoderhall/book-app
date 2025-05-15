<script setup lang="ts">
import MainHeader from '@/fixtures/MainHeader.vue';
import { onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BigCard from "../components/BigCard.vue"
import PrimaryButton from '@/components/atoms/PrimaryButton.vue';
import ReviewList from '@/components/ReviewList.vue';
import ReviewForm from '@/components/ReviewForm.vue';
import { useUserStore } from '@/stores/user';

const API_URL = import.meta.env.VITE_API_URL

const useStore = useUserStore();

interface Review {
  _id: string;
  name: string;
  content: string;
  rating: number;
  created_at: Date;
}

interface Book {
  _id: string;
  title: string;
  description: string;
  author: string;
  genres: string[];
  image: string;
  published_year: number;
  reviews: Review[];
}

const book = ref<Book | null>(null);

const route = useRoute();

const fetchBook = async () => {
    try {
      const response = await fetch(API_URL + 'books/' + route.params.id);
      const data = await response.json();
      console.log(data)
      book.value = data;

    } catch (error) {
      console.log(error)
    }

}

onMounted(async () => {
    fetchBook();
  });
</script>

<template>
<MainHeader title = "Book"></MainHeader>
<main>
  <RouterLink to="/" class="button">
      <PrimaryButton buttonLabel="Back"></PrimaryButton>
  </RouterLink>
  
  <BigCard
  v-if="book"
  :image="book.image"
  :title="book.title"
  :author="book.author"
  :published_year="book.published_year"
  :description="book.description"
  :genres="book.genres"></BigCard>
  
  <section class="createReview">
      <h2>Create review</h2>
      <template v-if="useStore.username">
        <ReviewForm @submitted="fetchBook"></ReviewForm>
      </template>
      <template v-else>
        <RouterLink to="/login">Log in to submit a review</RouterLink>
      </template>
  </section>
  
  <section v-if="book?.reviews.length" class="review-wrapper">
      <h2>Reviews</h2>
      <ReviewList
      v-for="review in book?.reviews"
      :key="review._id"
      :name="review.name"
      :rating="review.rating"
      :content="review.content"
      :created_at="review.created_at"></ReviewList>
  </section>
</main>


</template>

<style lang="scss" scoped>
.button {
    margin: 1rem;
}
.review-wrapper {
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 4px;
  color: $jet-color;
}

.createReview {
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 4px;
}
</style>