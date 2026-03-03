<template>
  <div v-if="!siteUnlocked" class="fixed inset-0 z-[9999] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <div class="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-3xl lg:text-4xl font-bold text-white mb-3 font-headline">
          საიტი მუშავდება
        </h1>
        <p class="text-primary-200 text-lg leading-relaxed">
          ვებგვერდი ამჟამად განახლების პროცესშია. გთხოვთ, შეიყვანოთ პაროლი წვდომისთვის.
        </p>
      </div>

      <form @submit.prevent="checkPassword" class="space-y-4">
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="პაროლი"
            class="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 text-center text-lg focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent transition-all"
            autocomplete="off"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
          </button>
        </div>
        <p v-if="wrongPassword" class="text-red-300 text-sm">არასწორი პაროლი</p>
        <button
          type="submit"
          class="w-full py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-2xl font-semibold text-lg transition-all duration-200 hover:shadow-lg"
        >
          შესვლა
        </button>
      </form>

      <p class="mt-8 text-primary-300 text-sm">
        © {{ new Date().getFullYear() }} შემოქმედებითი საქართველო
      </p>
    </div>
  </div>
  <RouterView v-else />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const SITE_PASSWORD = 'creative112233'
const STORAGE_KEY = 'site_unlocked'

const siteUnlocked = ref(false)
const password = ref('')
const showPassword = ref(false)
const wrongPassword = ref(false)

function checkPassword() {
  if (password.value === SITE_PASSWORD) {
    siteUnlocked.value = true
    localStorage.setItem(STORAGE_KEY, 'true')
    wrongPassword.value = false
  } else {
    wrongPassword.value = true
  }
}

onMounted(async () => {
  siteUnlocked.value = localStorage.getItem(STORAGE_KEY) === 'true'

  if (authStore.token) {
    await authStore.fetchUser()
  }
})
</script>
