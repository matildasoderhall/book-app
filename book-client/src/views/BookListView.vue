<script setup lang="ts">
  import MainHeader from "@/fixtures/MainHeader.vue";
  import { onMounted, ref } from "vue";
  import { RouterLink } from "vue-router";
  import { IBook } from '@/types/IBooks'
  import SmallCard from '@/components/SmallCard.vue'


  const API_URL = import.meta.env.VITE_API_URL
  const books = ref<IBook[]>([]);
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
  <MainHeader title="Book List"/>
  <div class="page-wrapper">

     <section id="books">
      <SmallCard v-for="book in books" :key="book.id" :book="book" />
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


}

</style>
