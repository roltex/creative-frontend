<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

// Check if user is authenticated on app load
onMounted(async () => {
  if (authStore.token) {
    await authStore.fetchUser()
  }
})
</script>
