<script setup lang="ts">
  import MainHeader from "@/fixtures/MainHeader.vue";
  import InputField from "@/components/atoms/InputField.vue";
  import PrimaryButton from '@/components/atoms/PrimaryButton.vue';
  import { reactive } from 'vue';
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/user";

  const API_URL = import.meta.env.VITE_API_URL;

  const loginValues = reactive({
    username: '',
    password: ''
  })

  const formErrors = reactive({
    username: '',
    password: ''
  })

  const validateForm = () => {
    formErrors.username = loginValues.username ? '' : 'Please fill in your username';
    formErrors.password = loginValues.password ? '' : 'Please fill in your password';

    return !formErrors.username && !formErrors.password;
  };



  const userStore = useUserStore();
  const router = useRouter();


  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
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

    await userStore.fetchUser();

    router.push('/');
    console.log('You are logged in');
    } catch (error) {
      console.error('Login failed:', error)
    }
  }


</script>

<template>
  <MainHeader/>
  <main>
    <form @submit.prevent="handleLogin">
      <h1>Login</h1>
      <div class="login-container">
        <div>
          <InputField id="username" label="Username" type="text" placeholder="Username" v-model="loginValues.username"/>
          <span v-if="formErrors.username" class="error">{{ formErrors.username }}</span>
        </div>
        <div>
          <InputField id="password" label="Password" type="password" placeholder="Password" v-model="loginValues.password" />
          <span v-if="formErrors.password" class="error">{{ formErrors.password }}</span>
        </div>
        <RouterLink to="/register" class="register">New user?</RouterLink>
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
  color: $delft-blue-color;
  cursor: pointer;
  &:hover {
    color: $brown-sugar-color;
  }
}

.error {
  color: red;
  margin-top: 0px;
  margin-bottom: 5px;
}
</style>
