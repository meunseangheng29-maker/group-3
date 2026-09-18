import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  username: string
}

export const useAuth = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isLoggedIn = computed(() => {
    return user.value !== null
  })

  function login(username: string, password: string): boolean {
    if (!username.trim() || !password.trim()) {
      return false
    }

    user.value = {
      username: username.trim()
    }

    return true
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    isLoggedIn,
    login,
    logout
  }
})