<template>
  <div :class="wrapperClass" :style="{ aspectRatio }">
    <img
      ref="imgRef"
      :src="currentSrc"
      :alt="alt"
      :class="imageClass"
      :loading="lazy ? 'lazy' : 'eager'"
      :decoding="async ? 'async' : 'auto'"
      @load="onLoad"
      @error="onError"
    />
    
    <!-- Loading Placeholder -->
    <div v-if="isLoading" :class="placeholderClass">
      <div v-if="showLoadingSpinner" class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      <div v-else class="animate-pulse bg-gray-200 w-full h-full"></div>
    </div>

    <!-- Error Placeholder -->
    <div v-if="hasError" :class="errorClass">
      <div class="text-gray-400 text-center">
        <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-sm">{{ errorText || $t('common.imageLoadError') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  src: string
  alt: string
  lazy?: boolean
  async?: boolean
  aspectRatio?: string
  placeholder?: string
  fallback?: string
  quality?: number
  format?: 'webp' | 'jpg' | 'png'
  sizes?: string
  showLoadingSpinner?: boolean
  errorText?: string
  wrapperClass?: string
  imageClass?: string
  placeholderClass?: string
  errorClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  lazy: true,
  async: true,
  aspectRatio: 'auto',
  quality: 80,
  format: 'webp',
  showLoadingSpinner: false,
  wrapperClass: 'relative overflow-hidden',
  imageClass: 'w-full h-full object-cover transition-opacity duration-300',
  placeholderClass: 'absolute inset-0 flex items-center justify-center bg-gray-100',
  errorClass: 'absolute inset-0 flex items-center justify-center bg-gray-50'
})

const { t } = useI18n()
const imgRef = ref<HTMLImageElement>()
const isLoading = ref(true)
const hasError = ref(false)
const isIntersecting = ref(false)

// Generate optimized image URL
const currentSrc = computed(() => {
  // If not lazy loading or if intersecting, return actual source
  if (!props.lazy || isIntersecting.value) {
    return getOptimizedImageUrl(props.src)
  }
  
  // Return placeholder or 1px transparent image
  return props.placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'
})

// Generate optimized image URL with quality and format
const getOptimizedImageUrl = (url: string): string => {
  // If it's already an optimized URL or external URL, return as is
  if (url.includes('?') || url.startsWith('http')) {
    return url
  }

  // Add optimization parameters for local images
  const params = new URLSearchParams()
  
  if (props.quality !== 80) {
    params.append('quality', props.quality.toString())
  }
  
  if (props.format !== 'webp') {
    params.append('format', props.format)
  }

  if (props.sizes) {
    params.append('sizes', props.sizes)
  }

  return params.toString() ? `${url}?${params.toString()}` : url
}

// Intersection Observer for lazy loading
let observer: IntersectionObserver | null = null

const onLoad = () => {
  isLoading.value = false
  hasError.value = false
}

const onError = () => {
  isLoading.value = false
  hasError.value = true
  
  // Try fallback if available
  if (props.fallback && props.src !== props.fallback) {
    // Update src to fallback
    // This would require reactive src handling
  }
}

const initIntersectionObserver = () => {
  if (!props.lazy || !imgRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isIntersecting.value = true
          observer?.disconnect()
        }
      })
    },
    {
      rootMargin: '50px', // Load images 50px before they come into view
      threshold: 0.1
    }
  )

  observer.observe(imgRef.value)
}

// Watch for src changes
watch(() => props.src, () => {
  isLoading.value = true
  hasError.value = false
})

onMounted(() => {
  if (props.lazy) {
    initIntersectionObserver()
  }
})

// Cleanup observer
onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
