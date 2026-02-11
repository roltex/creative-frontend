<template>
  <div class="space-y-6">
    <!-- Filters Section -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Search Input -->
        <div class="md:col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('common.search') }}</label>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('press.searchPlaceholder')"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Media Filter -->
        <div class="md:col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('press.mediaFilter') }}</label>
          <select
            v-model="selectedMedia"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">{{ $t('common.all') }}</option>
            <option v-for="media in mediaNames" :key="media" :value="media">{{ media }}</option>
          </select>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mt-4 text-sm text-gray-600">
        {{ $t('press.showingResults', { count: filteredArticles.length, total: articles.length || 0 }) }}
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!initialized" class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div v-for="i in 10" :key="i" class="p-6">
          <div class="flex items-center gap-6">
            <div class="skeleton h-16 w-16 rounded-lg"></div>
            <div class="flex-1 space-y-2">
              <div class="skeleton h-6 w-3/4"></div>
              <div class="skeleton h-4 w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Press List Table -->
    <div v-else-if="filteredArticles.length > 0" class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <!-- Table Header -->
      <div class="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
        <div class="grid grid-cols-12 gap-6 text-white font-semibold text-sm">
          <div class="col-span-4">{{ $t('press.articleTitle') }}</div>
          <div class="col-span-3">{{ $t('press.mediaName') }}</div>
          <div class="col-span-3">{{ $t('press.link') }}</div>
          <div class="col-span-2 text-center">{{ $t('press.mediaLogo') }}</div>
        </div>
      </div>

      <!-- Table Body -->
      <div class="divide-y divide-gray-200">
        <div
          v-for="article in paginatedArticles"
          :key="article.id"
          class="grid grid-cols-12 gap-6 px-6 py-5 hover:bg-gray-50 transition-colors items-center"
        >
          <!-- Title -->
          <div class="col-span-4">
            <h3 class="text-base font-semibold text-gray-900 line-clamp-2 mb-1">
              {{ article.title?.[$i18n.locale as 'ka' | 'en'] || article.title?.ka || article.title?.en || '' }}
            </h3>
            <p class="text-xs text-gray-500">{{ formatDate(article.publishedAt, locale) }}</p>
          </div>

          <!-- Media Name -->
          <div class="col-span-3">
            <p class="text-sm font-medium text-gray-700">{{ article.mediaName || article.category }}</p>
          </div>

          <!-- Link -->
          <div class="col-span-3">
            <a
              v-if="article.externalUrl"
              :href="article.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <ExternalLink class="w-4 h-4 mr-1" />
              <span class="truncate">{{ $t('press.viewArticle') }}</span>
            </a>
            <RouterLink
              v-else
              :to="{ name: 'press-article', params: { slug: article.slug } }"
              class="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {{ $t('press.readMore') }}
            </RouterLink>
          </div>

          <!-- Media Logo -->
          <div class="col-span-2 flex justify-center">
            <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                v-if="article.mediaLogo"
                :src="getImageUrl(article.mediaLogo)"
                :alt="article.mediaName || 'Media logo'"
                class="w-full h-full object-contain p-2"
              />
              <Newspaper v-else class="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            {{ $t('press.page') }} {{ currentPage }} {{ $t('press.of') }} {{ totalPages }}
          </div>
          <div class="flex gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-primary-500 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-white rounded-2xl shadow-lg">
      <Newspaper class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('common.noResults') }}</h3>
      <p class="text-gray-600">{{ $t('press.noPressAvailable') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { Newspaper, ExternalLink, Search, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { usePressStore } from '../../stores/press'
import { RouterLink } from 'vue-router'
import { getImageUrl } from '../../utils/imageUrl'
import { formatDate } from '../../utils/dateFormat'

interface Props {
  limit?: number
  category?: string
}

const props = defineProps<Props>()
const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const pressStore = usePressStore()

const articles = computed(() => pressStore.articles)
const initialized = computed(() => pressStore.initialized)

// Filter states
const searchQuery = ref('')
const selectedMedia = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Get unique media names
const mediaNames = computed(() => {
  const names = new Set<string>()
  const articlesList = Array.isArray(articles.value) ? articles.value : []
  articlesList.forEach(a => {
    if (a.mediaName) names.add(a.mediaName)
  })
  return Array.from(names).sort()
})

// Filtered articles based on search and filters
const filteredArticles = computed(() => {
  let filtered = Array.isArray(articles.value) ? articles.value : []
  
  // Apply search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a => {
      const titleKa = a.title?.ka || ''
      const titleEn = a.title?.en || ''
      const mediaName = a.mediaName || ''
      return titleKa.toLowerCase().includes(query) ||
        titleEn.toLowerCase().includes(query) ||
        mediaName.toLowerCase().includes(query)
    })
  }
  
  // Apply media filter
  if (selectedMedia.value) {
    filtered = filtered.filter(a => a.mediaName === selectedMedia.value)
  }
  
  // Apply prop filters
  if (props.category) {
    filtered = filtered.filter(a => a.category === props.category)
  }
  
  return filtered
})

// Paginated articles
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredArticles.value.slice(start, end)
})

// Total pages
const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / itemsPerPage)
})

// Displayed page numbers
const displayedPages = computed(() => {
  const pages = []
  const maxPagesToShow = 5
  let startPage = Math.max(1, currentPage.value - Math.floor(maxPagesToShow / 2))
  let endPage = Math.min(totalPages.value, startPage + maxPagesToShow - 1)
  
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

// Sync page number to URL query parameter
const updateUrlPage = (page: number) => {
  if (props.limit) return
  const query = { ...route.query }
  if (page > 1) {
    query.page = String(page)
  } else {
    delete query.page
  }
  router.replace({ query })
}

// Update URL when page changes
watch(currentPage, (newPage) => {
  updateUrlPage(newPage)
})

// Reset page when filters change
watch([searchQuery, selectedMedia], () => {
  currentPage.value = 1
})

// Fetch articles on mount if not initialized
onMounted(async () => {
  // Read page from URL query on mount
  const urlPage = parseInt(route.query.page as string)
  if (!props.limit && urlPage && urlPage > 0) {
    currentPage.value = urlPage
  }
  
  if (!initialized.value) {
    await pressStore.fetchArticles()
  }
})
</script>

