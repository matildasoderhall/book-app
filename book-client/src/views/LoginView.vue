<script setup lang="ts">
  import MainHeader from "@/fixtures/MainHeader.vue";
  import InputField from "@/components/atoms/InputField.vue";
  import PrimaryButton from '@/components/atoms/PrimaryButton.vue';
</script>

<template>
  <MainHeader title="Login"/>
  <form>
    <div class="login-container">
      <InputField type="text" placeholder="Username"/>
      <InputField type="text" placeholder="Password"/>
    </div>
    <PrimaryButton type="submit" buttonLabel="Login"/>
  </form>
</template>

<style lang="scss" scoped>

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.login-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
