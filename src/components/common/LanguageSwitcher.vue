<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <span class="text-xs font-medium">{{ currentLocale.code.toUpperCase() }}</span>
      <ChevronDown class="w-3 h-3" />
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
      >
        <div class="py-1">
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="changeLanguage(locale.code)"
            class="flex items-center w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
            :class="{ 'bg-gray-50': locale.code === currentLocale.code }"
          >
            <span class="mr-2">{{ locale.flag }}</span>
            <span>{{ locale.name }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDown } from 'lucide-vue-next'

const { locale } = useI18n()
const isOpen = ref(false)

const availableLocales = [
  { code: 'ka', name: 'ქართული', flag: '🇬🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
]

const currentLocale = computed(() => 
  availableLocales.find(l => l.code === locale.value) || availableLocales[0]
)

const changeLanguage = (code: string) => {
  locale.value = code
  localStorage.setItem('locale', code)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

// Add click outside listener
if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script>
