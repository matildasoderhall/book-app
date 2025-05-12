<script setup lang="ts">
  import logo from "@/assets/StoryStack_logo_eggshell.svg";
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
      <RouterLink to="/login" class="router-link">Login/Register</RouterLink>
      </nav>
    </div>
    <h1 class="green">{{ title }}</h1>
  </header>
</template>

<style lang="scss" scoped>
.router-link {
  text-decoration: none;
  font-size: 1.2rem;

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
