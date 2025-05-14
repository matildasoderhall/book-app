<script setup lang="ts">
import InputField from './atoms/InputField.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted, reactive } from 'vue';
import PrimaryButton from './atoms/PrimaryButton.vue';
import ReviewList from './ReviewList.vue';

const API_URL = import.meta.env.VITE_API_URL;

const form = reactive({
    name: '',
    content: '',
    rating: ''
})

const submit = async () => {

    try {
        await fetch(API_URL + 'reviews', {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: form.name,
                content: form.content,
                rating: form.rating,
                bookId: reviewedBookId.value
            })
        })

    } catch (error) {
        console.log(error);
    } 
}
const route = useRoute();

const reviewedBookId =  ref<string | null>(null);
const rating = ref('');

onMounted (() => {
    reviewedBookId.value = route.params.id as string;
    console.log("Book ID: ", reviewedBookId.value)

})


</script>


<template>
    <form class="form-section" @submit.prevent="submit">
        <label>Name
            <InputField placeholder="Name" type="text" name="name" v-model="form.name"></InputField>
        </label>
        <label>Rating
            <InputField type="number" name="rating" :min="1" :max="5" v-model="form.rating"></InputField>
        </label>
        <label>Review
            <InputField placeholder="Review" type="text" name="review" v-model="form.content"></InputField>
        </label>
        <PrimaryButton type="submit" buttonLabel="Submit review"></PrimaryButton>

    </form>

</template>


<style lang="scss" scoped>

.form-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}


</style>