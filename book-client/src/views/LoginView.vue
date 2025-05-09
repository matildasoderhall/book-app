<script setup lang="ts">
  import MainHeader from "@/fixtures/MainHeader.vue";
  import InputField from "@/components/atoms/InputField.vue";
  import PrimaryButton from '@/components/atoms/PrimaryButton.vue';
</script>

<template>
  <MainHeader title="Login"/>
  <main>
    <form>
      <div class="login-container">
        <InputField type="text" placeholder="Username"/>
        <InputField type="text" placeholder="Password"/>
        <a class="register">Register</a>
      </div>
      <PrimaryButton type="submit" buttonLabel="Login"/>
    </form>
  </main>
</template>

<style lang="scss" scoped>

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.login-container {
  display: flex;
  flex-direction: column;

  :not(:first-child) {
    margin-top: 1rem;
  }

  :nth-child(3) {
    margin-top: 0.2rem;
  }
}

.register {
  align-self: flex-end;
  text-decoration: underline;
  font-family: $secondary-font;
  cursor: pointer;
  &:hover {
    color: $brown-sugar-color;
  }
}
</style>
