<script setup lang="ts">
import MainHeader from '@/fixtures/MainHeader.vue';
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import BigCard from "../components/BigCard.vue"
import PrimaryButton from '@/components/atoms/PrimaryButton.vue';

const API_URL = import.meta.env.VITE_API_URL

interface Book {
  _id: string;
  title: string;
  description: string;
  author: string;
  genres: string[];
  image: string;
  published_year: number;
}

const book = ref<Book | null>(null);

const route = useRoute();

onMounted(async () => {
    try {
      const response = await fetch(API_URL + 'books/' + route.params.id);
      const data = await response.json();
      console.log(data)
      book.value = data;

    } catch (error) {
      console.log(error)
    }
  });
</script>

<template>
<MainHeader title = "Book"></MainHeader>
<PrimaryButton
buttonLabel="Back" to="/"></PrimaryButton>

<BigCard
v-if="book"
:image="book.image"
:title="book.title"
:author="book.author"
:published_year="book.published_year"
:description="book.description"
:genres="book.genres"></BigCard>

</template>

<style lang="scss" scoped>

</style>