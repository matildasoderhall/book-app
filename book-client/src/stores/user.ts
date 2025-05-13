import { defineStore } from "pinia";

const API_URL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('auth', {
  state: () => ({
    username: null as string | null,
    is_admin: false,
    isLoaded: false,
  }),
  actions: {
    async fetchUser() {
      try {
        const res = await fetch(API_URL + 'users/me', {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Unautorized');
        const data = await res.json();
        this.username = data.username;
        this.is_admin = data.is_admin;
        this.isLoaded = true;
      } catch (error) {
        this.username = null;
        this.is_admin = false;
        this.isLoaded = true;
      }
    }
  }
});
