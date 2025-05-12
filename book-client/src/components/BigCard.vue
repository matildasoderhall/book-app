<script setup lang="ts">
  import { onMounted, ref, PropType } from "vue";
  import { RouterLink } from "vue-router";

  defineProps({
    image: String,
    title: String,
    author: String,
    published_year: Number,
    description: String,
    genres: {
    type: Array as PropType<string[]>,
    required: true
  }
  })


</script>


<template>
    <section class="book-section">
        <img :src="image" class="book-cover">
        <div class="text-section">
            <h3>{{ title }}</h3>
            <span>by {{ author }}, {{ published_year }}</span>
            <p class="description">{{ description }}</p>
            <p>Genres: {{ genres.join(', ') }} </p>
        </div>
    </section>
</template>

<style lang="scss" scoped>
body{ 
    .book-section {
        background-color: white;
        padding: 0.5rem;
        display: flex;
        margin: 2rem;
        color: $jet-color;
        border-radius: 4px;

        .book-cover {
            width: auto;
            height:500px;
        }
        
        .text-section {
            display: flex;
            flex-direction: column;
            width: 25%;
            padding-left: 2rem;
        }

        .description {
            font-family: $secondary-font;
            font-style: italic;
        }
    }
}
</style>