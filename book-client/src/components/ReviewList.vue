<script setup lang="ts">

    defineProps ({
        name: String,
        content: String,
        rating: Number,
        created_at: String
    })


</script>




<template>
    <div class="review">
    <p><strong>Name:</strong> {{ name }}</p>
    <p><strong>Rating:</strong> {{ rating }} / 5</p>
    <p><strong>Review:</strong> {{ content }}</p>
    <p><i>{{ new Date (created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    }) }}</i></p>

</div>

</template>


<style lang="scss" scoped>
.review {
    background-color: white;
    padding: 0.5rem;
    display: flex;
    color: $jet-color;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    border: 2px solid $jet-color;
    margin-top: 1rem;
    

    p {
        font-family: $secondary-font;
    }
}

</style>