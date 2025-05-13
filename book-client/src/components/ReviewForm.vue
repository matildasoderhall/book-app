<script setup lang="ts">
import InputField from './atoms/InputField.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();

const reviewedBookId =  ref<string | null>(null);
const rating = ref('');

onMounted (() => {
    reviewedBookId.value = route.params.id as string;
    console.log("Book ID: ", reviewedBookId.value)

})


</script>


<template>
    <div>
        <InputField type="text" placeholder="Name"></InputField>
        <InputField type="text" placeholder="Review"></InputField>
        <InputField v-model="rating" type="number" placeholder="Rating" :min="1" :max="5"></InputField>


    </div>

</template>


<style lang="scss" scoped>


</style>