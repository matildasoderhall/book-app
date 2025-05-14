<script setup lang="ts">
import InputField from './atoms/InputField.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted, reactive } from 'vue';
import PrimaryButton from './atoms/PrimaryButton.vue';

const emit = defineEmits(['submitted']);

const API_URL = import.meta.env.VITE_API_URL;

const form = reactive({
    name: '',
    content: '',
    rating: ''
})

const route = useRoute();
const reviewedBookId =  ref<string | null>(null);

const errors = reactive({
    name: '',
    content: '',
    rating: ''
});

const submit = async () => {

    errors.name = '';
    errors.content = '';
    errors.rating = '';

    let hasError = false;

    if (!form.name) {
        errors.name = 'Name is required';
        hasError = true;
    }

    if (!form.content) {
        errors.content = 'Please write a review';
        hasError = true;
    }

    if (!form.rating) {
        errors.rating = 'Enter a number between 1-5';
        hasError = true
    }

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

        emit('submitted')

        form.name = '';
        form.content = '';
        form.rating = '';

    } catch (error) {
        console.log(error);
    } 
}


onMounted ( async() => {
    reviewedBookId.value = route.params.id as string;
    console.log("Book ID: ", reviewedBookId.value)

})


</script>


<template>
    <form class="form-section" @submit.prevent="submit">
        <label>Name
            <InputField placeholder="Name" type="text" name="name" v-model="form.name"></InputField>
            <span class="error" v-if="errors.name">{{ errors.name }}</span>
        </label>
        <label>Rating
            <InputField type="number" name="rating" :min="1" :max="5" v-model="form.rating" class="rating-input"></InputField>
            <span class="error" v-if="errors.rating">{{ errors.rating }}</span>
        </label>
        <label>Review
            <InputField placeholder="Review" type="text" name="review" v-model="form.content"></InputField>
            <span class="error" v-if="errors.content">{{ errors.content }}</span>
        </label>
        <PrimaryButton type="submit" buttonLabel="Submit review"></PrimaryButton>

    </form>

</template>


<style lang="scss" scoped>

.form-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .rating-input {
            width: 18rem;
        }

        span {
            color: red;
        }
    }
}


</style>