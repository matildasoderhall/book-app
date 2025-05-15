<script setup lang="ts">
  import { useUserStore } from "@/stores/user";
  import { RouterLink, useRouter } from "vue-router";
  import logo from "@/assets/StoryStack_logo_eggshell.svg";


  const API_URL = import.meta.env.VITE_API_URL;

  const useStore = useUserStore();
  const router = useRouter();

  const logout = async ()  => {
    await fetch(API_URL + 'auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    useStore.$reset();
    router.push('/');
  }
  defineProps({
    title: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <header>
    <div class="main-nav-links">
      <RouterLink to="/">
        <img class="logo" :src="logo" alt="Vue logo" height="30">
      </RouterLink>
      <nav>
        <RouterLink to="/admin/users" class="router-link">Admin</RouterLink>
        <template v-if="useStore.username">
          <button @click="logout" class="router-link button-link">Logout</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="router-link">Login/Register</RouterLink>
        </template>
      </nav>
    </div>
    <h1>{{ title }}</h1>
  </header>
</template>

<style lang="scss" scoped>
.router-link {
  text-decoration: none;
  font-size: 1.2rem;
}

.button-link {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.main-nav-links {
  display: flex;
  padding-inline: 15px;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  background-color: $delft-blue-color;

  .router-link {
    margin: 20px;
    text-decoration: none;
    color: $eggshell-color;
  }
}

h1 {
  padding-inline: 3.5rem;
}
</style>
