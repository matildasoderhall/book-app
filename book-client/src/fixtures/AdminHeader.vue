<script setup lang="ts">
  import { RouterLink, useRouter } from "vue-router";
  import logo from "@/assets/StoryStack_logo_eggshell.svg";
  import { useUserStore } from "@/stores/user";

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

</script>

<template>
  <header>
    <div class="main-nav-links">
      <RouterLink to="/">
        <img class="logo" :src="logo" alt="Vue logo" height="30">
      </RouterLink>

      <nav>
      <RouterLink to="/" class="router-link">Home</RouterLink>
      <RouterLink to="/admin/users" class="router-link">Admin</RouterLink>
      <template v-if="useStore.username">
        <button @click="logout" class="router-link button-link">Logout</button>
      </template>
      <template v-else>
        <RouterLink to="/login" class="router-link">Login/Register</RouterLink>
      </template>

      </nav>
    </div>
    <nav class="admin-nav-links">
      <ul>
        <li>
          <RouterLink to="/admin/users" class="router-link">Users</RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/books" class="router-link">Books</RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/add-book" class="router-link">Create Books</RouterLink>
        </li>
      </ul>
    </nav>
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

.admin-nav-links {

  padding-inline: 20px;
  padding-block: 10px;
  background-color: white;
  ul {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 20px;
  padding: 0;
  margin: 0;
  }
  li {
    list-style: none;
  }

  .router-link {
    grid-column: span 2;
    color: $delft-blue-color;
    font-weight: 700;

    &:hover {
      color: $brown-sugar-color;
    }
  }

}
</style>
