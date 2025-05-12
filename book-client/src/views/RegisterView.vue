<script setup lang="ts">
import InputField from '@/components/atoms/InputField.vue';
import PrimaryButton from '@/components/atoms/PrimaryButton.vue';
import MainHeader from '@/fixtures/MainHeader.vue';
import { ref } from 'vue';

  const API_URL = import.meta.env.VITE_API_URL;

  const username = ref('');
  const password = ref('');

  const register = async () => {
    try {
      const response = await fetch(API_URL + 'auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Invalid credentials or server error');
    }

    const data = await response.json()
    const token = data.token

    localStorage.setItem('token', token)
    window.location.href = '/login'
    console.log('New user has been registred');
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

</script>

<template>
  <MainHeader title="Register"/>
  <main>
    <form @submit.prevent="register">
      <div class="login-container">
        <InputField type="text" placeholder="Username" v-model="username"/>
        <InputField type="password" placeholder="Password" v-model="password" />
        <RouterLink to="/login" class="login">Login here</RouterLink>
      </div>
      <PrimaryButton type="submit" buttonLabel="Register"/>
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

.login {
  align-self: flex-end;
  text-decoration: underline;
  font-family: $secondary-font;
  cursor: pointer;
  &:hover {
    color: $brown-sugar-color;
  }
}
</style>
