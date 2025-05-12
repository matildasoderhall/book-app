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
    <section>
        <img :src="image" class="book-cover">
        <h3>{{ title }}</h3>
        <p>{{ author }}</p>
        <p>{{ published_year }}</p>
        <p>{{ description }}</p>
        <p>{{ genres.join(', ') }} </p>
    </section>
</template>

<style lang="scss" scoped>
body{ 
    .book-cover {
        width: 80px;
        height: 120px;
    }
}
</style>