<template>
  <div v-if="totalPages > 1" class="flex items-center justify-between py-4">
    <div class="text-sm text-gray-600">
      {{ $t('common.page') }} {{ currentPage }} {{ $t('common.of') }} {{ totalPages }}
    </div>
    <div class="flex gap-2">
      <!-- Previous Button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>
      
      <!-- First page -->
      <button
        v-if="showFirstPage"
        @click="goToPage(1)"
        class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        1
      </button>
      
      <!-- Ellipsis before -->
      <span v-if="showFirstEllipsis" class="px-2 py-2 text-gray-500">...</span>
      
      <!-- Page Numbers -->
      <button
        v-for="page in displayedPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
          page === currentPage
            ? 'bg-primary-500 text-white'
            : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
        ]"
      >
        {{ page }}
      </button>
      
      <!-- Ellipsis after -->
      <span v-if="showLastEllipsis" class="px-2 py-2 text-gray-500">...</span>
      
      <!-- Last page -->
      <button
        v-if="showLastPage"
        @click="goToPage(totalPages)"
        class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        {{ totalPages }}
      </button>
      
      <!-- Next Button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
  currentPage: number
  totalPages: number
  maxPagesToShow?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxPagesToShow: 5
})

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}

// Calculate which pages to display
const displayedPages = computed(() => {
  const pages: number[] = []
  const maxPages = props.maxPagesToShow
  const total = props.totalPages
  const current = props.currentPage
  
  let startPage = Math.max(2, current - Math.floor(maxPages / 2))
  let endPage = Math.min(total - 1, startPage + maxPages - 1)
  
  if (endPage - startPage < maxPages - 1) {
    startPage = Math.max(2, endPage - maxPages + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

const showFirstPage = computed(() => props.totalPages > props.maxPagesToShow)
const showLastPage = computed(() => props.totalPages > props.maxPagesToShow)
const showFirstEllipsis = computed(() => displayedPages.value.length > 0 && displayedPages.value[0] > 2)
const showLastEllipsis = computed(() => displayedPages.value.length > 0 && displayedPages.value[displayedPages.value.length - 1] < props.totalPages - 1)
</script>
