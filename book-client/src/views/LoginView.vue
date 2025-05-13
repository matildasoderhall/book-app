<script setup lang="ts">
  import MainHeader from "@/fixtures/MainHeader.vue";
  import InputField from "@/components/atoms/InputField.vue";
  import PrimaryButton from '@/components/atoms/PrimaryButton.vue';
  import { reactive } from 'vue';
  import { useRouter } from "vue-router";

  const API_URL = import.meta.env.VITE_API_URL;

  const loginValues = reactive({
    username: '',
    password: ''
  })

  const router = useRouter();


  const login = async () => {
    try {
      const response = await fetch(API_URL + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginValues),
    })

    if (!response.ok) {
      throw new Error('Invalid credentials or server error');
    }

    const data = await response.json()
    const token = data.token

    localStorage.setItem('token', token)
    router.push('/');
    console.log('You are logged in');
    } catch (error) {
      console.error('Login failed:', error)
    }
  }


</script>

<template>
  <MainHeader title="Login"/>
  <main>
    <form @submit.prevent="login">
      <div class="login-container">
        <InputField type="text" placeholder="Username" v-model="loginValues.username"/>
        <InputField type="password" placeholder="Password" v-model="loginValues.password" />
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
