<template>
  <div>
    <!-- Error State -->
    <div v-if="hasError" :class="errorClass">
      <div class="text-center">
        <!-- Error Icon -->
        <div class="text-red-500 mb-4">
          <AlertCircle class="w-16 h-16 mx-auto" />
        </div>

        <!-- Error Title -->
        <h3 class="text-xl font-bold text-gray-900 mb-2 font-headline">
          {{ errorTitle || $t('error.somethingWentWrong') }}
        </h3>

        <!-- Error Message -->
        <p class="text-gray-600 mb-6">
          {{ errorMessage || $t('error.tryAgainLater') }}
        </p>

        <!-- Error Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            v-if="showRetry"
            @click="retry"
            :disabled="retrying"
            class="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!retrying">{{ $t('error.tryAgain') }}</span>
            <span v-else class="flex items-center">
              <div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              {{ $t('error.retrying') }}
            </span>
          </button>

          <RouterLink
            v-if="showHomeLink"
            to="/"
            class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-semibold transition-colors"
          >
            {{ $t('error.goHome') }}
          </RouterLink>

          <button
            v-if="showReload"
            @click="reload"
            class="px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full font-semibold transition-colors"
          >
            {{ $t('error.reloadPage') }}
          </button>
        </div>

        <!-- Error Details (for development) -->
        <details v-if="showDetails && errorDetails" class="mt-6 text-left max-w-2xl mx-auto">
          <summary class="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
            {{ $t('error.technicalDetails') }}
          </summary>
          <pre class="mt-2 p-4 bg-gray-100 rounded text-xs text-gray-700 overflow-auto">{{ errorDetails }}</pre>
        </details>
      </div>
    </div>

    <!-- Normal Content -->
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { AlertCircle } from 'lucide-vue-next'

interface Props {
  // Error state
  error?: Error | string | null
  errorTitle?: string
  errorMessage?: string
  errorDetails?: string
  
  // Appearance
  errorClass?: string
  
  // Actions
  showRetry?: boolean
  showHomeLink?: boolean
  showReload?: boolean
  showDetails?: boolean
  
  // Retry handler
  onRetry?: () => void | Promise<void>
}

const props = withDefaults(defineProps<Props>(), {
  error: null,
  errorClass: 'flex items-center justify-center min-h-[400px] p-8',
  showRetry: true,
  showHomeLink: true,
  showReload: false,
  showDetails: process.env.NODE_ENV === 'development'
})

const emit = defineEmits<{
  retry: []
  reload: []
}>()

const { t } = useI18n()
const retrying = ref(false)

const hasError = computed(() => {
  return Boolean(props.error)
})

const errorMessage = computed(() => {
  if (!props.error) return ''
  
  if (typeof props.error === 'string') {
    return props.error
  }
  
  if (props.error instanceof Error) {
    return props.error.message
  }
  
  return t('error.unknownError')
})

const errorDetails = computed(() => {
  if (!props.error) return ''
  
  if (props.error instanceof Error) {
    return `${props.error.name}: ${props.error.message}\n${props.error.stack || ''}`
  }
  
  return String(props.error)
})

const retry = async () => {
  if (!props.onRetry) return
  
  retrying.value = true
  
  try {
    await props.onRetry()
    emit('retry')
  } catch (err) {
    console.error('Retry failed:', err)
  } finally {
    retrying.value = false
  }
}

const reload = () => {
  window.location.reload()
  emit('reload')
}
</script>
