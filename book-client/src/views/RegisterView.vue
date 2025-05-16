<script setup lang="ts">
import InputField from '@/components/atoms/InputField.vue';
import PrimaryButton from '@/components/atoms/PrimaryButton.vue';
import MainHeader from '@/fixtures/MainHeader.vue';
import { useUserStore } from '@/stores/user';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

  const useStore = useUserStore();
  const router = useRouter();

  const API_URL = import.meta.env.VITE_API_URL;

 const registerValues = reactive({
    username: '',
    password: ''
  })

  const formErrors = reactive({
    username: '',
    password: ''
  })

  const validateForm = () => {
    formErrors.username = registerValues.username ? '' : 'Username is required';
    formErrors.password = registerValues.password ? '' : 'Password is required';

    return !formErrors.username && !formErrors.password;
  };

  const register = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(API_URL + 'auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: registerValues.username,
        password: registerValues.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials or server error');
    }

    const loginResponse = await fetch(API_URL + 'auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(registerValues),
    });

    if (!loginResponse.ok) {
      throw new Error('Auto-login failed');
    }

    const data = await response.json()
    const token = data.token

    localStorage.setItem('token', token)

    await useStore.fetchUser();

    router.push('/')
    console.log('New user has been registred');
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

</script>

<template>
  <MainHeader title="Register"/>
  <main>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="login-container">
        <div>
          <InputField id="username" label="Username" type="text" placeholder="Username" v-model="registerValues.username"/>
          <span v-if="formErrors.username" class="error">{{ formErrors.username }}</span>
        </div>
        <div>
          <InputField id="password" label="Password" type="password" placeholder="Password" v-model="registerValues.password" />
          <span v-if="formErrors.password" class="error">{{ formErrors.password }}</span>
        </div>
        <RouterLink to="/login" class="login">Login here</RouterLink>
      </div>
      <PrimaryButton type="submit" buttonLabel="Register"/>
    </form>
  </main>
</template>

<style lang="scss" scoped>

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.error {
  color: red;
}
</style>
