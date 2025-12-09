<template>
  <div>
    <h2 class="text-2xl font-bold text-center mb-6">{{ $t('auth.login') }}</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="form-label">{{ $t('auth.email') }}</label>
        <input v-model="form.email" type="email" class="form-input" required />
      </div>
      <div>
        <label class="form-label">{{ $t('auth.password') }}</label>
        <input v-model="form.password" type="password" class="form-input" required />
      </div>
      <button type="submit" class="btn-primary w-full">{{ $t('auth.loginButton') }}</button>
    </form>
    <p class="mt-4 text-center text-sm">
      {{ $t('auth.dontHaveAccount') }}
      <RouterLink :to="{ name: 'application-step-1' }" class="text-primary-500">{{ $t('auth.register') }}</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({ email: '', password: '' })

const handleLogin = async () => {
  const result = await authStore.login(form.value)
  if (result.success) {
    router.push({ name: 'dashboard' })
  }
}
</script>
