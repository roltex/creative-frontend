<template>
  <div class="container-fluid py-8 lg:py-8">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-headline">
        {{ $t('search.title') }}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
        {{ $t('search.subtitle') }}
      </p>

      <!-- Enhanced Search Form -->
      <div class="max-w-2xl mx-auto">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1 relative">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('search.placeholder')"
              class="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pr-12"
              @keyup.enter="performSearch"
              @input="onSearchInput"
            />
            <button
              @click="performSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Search class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Content Type Filter -->
        <div class="mt-6 flex flex-wrap justify-center gap-2">
          <button
            v-for="type in contentTypes"
            :key="type.value"
            @click="setContentType(type.value)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              filters.contentType === type.value
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ $i18n.locale === 'ka' ? type.label.ka : type.label.en }}
          </button>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchQuery || hasFilters">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p class="text-gray-600">{{ $t('search.searching') }}</p>
          </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-500 mb-4">
          <X class="w-12 h-12 mx-auto" />
        </div>
        <p class="text-gray-600">{{ error }}</p>
        <button @click="performSearch" class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors">
          {{ $t('search.tryAgain') }}
        </button>
      </div>

      <!-- Results -->
      <div v-else>
        <!-- Results Summary -->
        <div class="mb-8 text-center">
          <p class="text-gray-600">
            {{ $t('search.resultsFound', { 
              count: totalResults, 
              query: searchQuery,
              type: filters.contentType !== 'all' ? getContentTypeLabel(filters.contentType) : $t('search.allContent')
            }) }}
          </p>
        </div>

        <!-- Results by Content Type -->
        <div class="space-y-12">
      <!-- News Results -->
          <section v-if="results.news.length > 0 && (filters.contentType === 'all' || filters.contentType === 'news')">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 font-headline">{{ $t('nav.news') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="article in results.news" :key="article.id" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <img v-if="article.image" :src="getImageUrl(article.image)" :alt="article.title.ka" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">{{ article.category }}</span>
                  <h3 class="text-lg font-bold text-gray-900 mt-3 mb-2 font-headline">
                    {{ $i18n.locale === 'ka' ? article.title.ka : article.title.en }}
                  </h3>
                  <p v-if="article.excerpt" class="text-gray-600 text-sm line-clamp-2">
                    {{ $i18n.locale === 'ka' ? article.excerpt.ka : article.excerpt.en }}
                  </p>
                  <RouterLink :to="`/news/${article.slug}`" class="inline-flex items-center mt-4 text-primary-600 hover:text-primary-700 font-semibold text-sm">
                    {{ $t('common.readMore') }}
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </RouterLink>
                </div>
              </div>
            </div>
          </section>

          <!-- Competition Results -->
          <section v-if="results.competitions.length > 0 && (filters.contentType === 'all' || filters.contentType === 'competitions')">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 font-headline">{{ $t('nav.competitions') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="competition in results.competitions" :key="competition.id" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <img v-if="competition.image" :src="getImageUrl(competition.image)" :alt="competition.title.ka" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold',
                      competition.status === 'current' ? 'bg-green-100 text-green-700' :
                      competition.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    ]">
                      {{ competition.status }}
                    </span>
                    <span v-if="competition.category" class="text-xs text-gray-500">{{ competition.category }}</span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2 font-headline">
                    {{ $i18n.locale === 'ka' ? competition.title.ka : competition.title.en }}
                  </h3>
                  <div v-if="competition.description" class="text-gray-600 text-sm line-clamp-2 mb-4"
                       v-html="$i18n.locale === 'ka' ? competition.description.ka : competition.description.en">
                  </div>
                  <RouterLink :to="`/competitions/${competition.slug}`" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm">
                    {{ $t('common.learnMore') }}
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </RouterLink>
                </div>
              </div>
            </div>
          </section>

          <!-- Event Results -->
          <section v-if="results.events.length > 0 && (filters.contentType === 'all' || filters.contentType === 'events')">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 font-headline">{{ $t('nav.events') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="event in results.events" :key="event.id" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <img v-if="event.image" :src="getImageUrl(event.image)" :alt="event.title.ka" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold',
                      event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                      event.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    ]">
                      {{ event.status }}
                    </span>
                    <span class="text-xs text-gray-500">{{ new Date(event.start_date).toLocaleDateString('ka-GE') }}</span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2 font-headline">
                    {{ $i18n.locale === 'ka' ? event.title.ka : event.title.en }}
                  </h3>
                  <div v-if="event.description" class="text-gray-600 text-sm line-clamp-2 mb-4"
                       v-html="$i18n.locale === 'ka' ? event.description.ka : event.description.en">
                  </div>
                  <RouterLink :to="`/events/${event.slug}`" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm">
                    {{ $t('common.learnMore') }}
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </RouterLink>
                </div>
              </div>
            </div>
          </section>

          <!-- Press Results -->
          <section v-if="results.press.length > 0 && (filters.contentType === 'all' || filters.contentType === 'press')">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 font-headline">{{ $t('nav.press') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="article in results.press" :key="article.id" class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div class="flex items-center mb-4">
                  <img v-if="article.media_logo" :src="article.media_logo" :alt="article.media_name" class="w-8 h-8 rounded-full mr-3" />
                  <span class="text-sm font-semibold text-gray-700">{{ article.media_name }}</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2 font-headline">
                  {{ $i18n.locale === 'ka' ? article.press_title.ka : article.press_title.en }}
                </h3>
                <a v-if="article.media_link" :href="article.media_link" target="_blank" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm">
                  {{ $t('press.readOriginal') }}
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
            </div>
          </section>

          <!-- Success Stories Results -->
          <section v-if="results.successStories.length > 0 && (filters.contentType === 'all' || filters.contentType === 'success-stories')">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 font-headline">{{ $t('nav.successStories') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="story in results.successStories" :key="story.id" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <img v-if="story.image" :src="getImageUrl(story.image)" :alt="story.title.ka" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span v-if="story.category" class="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-semibold">{{ story.category }}</span>
                    <span v-if="story.year" class="text-xs text-gray-500">{{ story.year }}</span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2 font-headline">
                    {{ $i18n.locale === 'ka' ? story.title.ka : story.title.en }}
                  </h3>
                  <p v-if="story.creator_name" class="text-sm text-gray-600 mb-2">{{ story.creator_name }}</p>
                  <p v-if="story.description" class="text-gray-600 text-sm line-clamp-2 mb-4">
                    {{ $i18n.locale === 'ka' ? story.description.ka : story.description.en }}
                  </p>
                  <RouterLink :to="`/success-stories/${story.slug}`" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm">
                    {{ $t('common.readMore') }}
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
            </RouterLink>
          </div>
        </div>
            </div>
          </section>
      </div>

        <!-- No Results -->
        <div v-if="!loading && !error && totalResults === 0" class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <Search class="w-16 h-16 mx-auto" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $t('search.noResults') }}</h3>
          <p class="text-gray-600 mb-6">{{ $t('search.noResultsDesc') }}</p>
          <button @click="clearSearch" class="px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors font-semibold">
            {{ $t('search.clearSearch') }}
          </button>
        </div>

        <!-- Load More Button -->
        <div v-if="canLoadMore && !loading" class="text-center mt-12">
          <button @click="loadMore" class="px-8 py-3 bg-secondary-500 text-white rounded-full hover:bg-secondary-600 transition-colors font-semibold">
            {{ $t('common.loadMore') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Search Suggestions (when no query) -->
    <div v-else class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-8 font-headline">{{ $t('search.suggestions') }}</h2>
      <div class="flex flex-wrap justify-center gap-3">
        <button
          v-for="suggestion in searchSuggestions"
          :key="suggestion"
          @click="applySuggestion(suggestion)"
          class="px-4 py-2 bg-gray-100 hover:bg-primary-500 hover:text-white text-gray-700 rounded-full transition-all duration-200 text-sm"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { Search, X } from 'lucide-vue-next'
import { getImageUrl } from '../utils/imageUrl'
import { useNewsStore } from '../stores/news'
import { useCompetitionsStore } from '../stores/competitions'
import { useEventsStore } from '../stores/events'
import { usePressStore } from '../stores/press'
import api from '../api/axios'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

// Stores
const newsStore = useNewsStore()
const competitionsStore = useCompetitionsStore()
const eventsStore = useEventsStore()
const pressStore = usePressStore()

// Search state
const searchQuery = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

// Filters
const filters = ref({
  contentType: 'all',
  category: 'all',
  dateRange: 'all'
})

// Results
const results = ref({
  news: [],
  competitions: [],
  events: [],
  press: [],
  successStories: []
})

const pagination = ref({
  currentPage: 1,
  hasMore: false
})

// Content types for filtering
const contentTypes = [
  { value: 'all', label: { ka: 'ყველა', en: 'All' } },
  { value: 'news', label: { ka: 'სიახლეები', en: 'News' } },
  { value: 'competitions', label: { ka: 'კონკურსები', en: 'Competitions' } },
  { value: 'events', label: { ka: 'ღონისძიებები', en: 'Events' } },
  { value: 'press', label: { ka: 'პრესა', en: 'Press' } },
  { value: 'success-stories', label: { ka: 'წარმატების ისტორიები', en: 'Success Stories' } }
]

// Search suggestions
const searchSuggestions = [
  'კონკურსები', 'გრანტები', 'ღონისძიებები', 'მხატვრები',
  'მუსიკა', 'ფოტოგრაფია', 'ფილმი', 'თეატრი'
]

// Computed
const totalResults = computed(() => {
  return results.value.news.length + 
         results.value.competitions.length + 
         results.value.events.length + 
         results.value.press.length + 
         results.value.successStories.length
})

const hasFilters = computed(() => {
  return filters.value.contentType !== 'all' || filters.value.category !== 'all'
})

const canLoadMore = computed(() => {
  return pagination.value.hasMore
})

// Methods
const performSearch = async (page = 1) => {
  if (!searchQuery.value.trim() && !hasFilters.value) return

  loading.value = true
  error.value = null

  try {
    // Search across different content types based on filter
    const searchPromises = []

    if (filters.value.contentType === 'all' || filters.value.contentType === 'news') {
      searchPromises.push(
        api.get('/news', {
          params: { search: searchQuery.value, page, per_page: 6 }
        }).then(response => ({ type: 'news', data: response.data }))
      )
    }

    if (filters.value.contentType === 'all' || filters.value.contentType === 'competitions') {
      searchPromises.push(
        api.get('/competitions', {
          params: { search: searchQuery.value, page, per_page: 6 }
        }).then(response => ({ type: 'competitions', data: response.data }))
      )
    }

    if (filters.value.contentType === 'all' || filters.value.contentType === 'events') {
      searchPromises.push(
        api.get('/events', {
          params: { search: searchQuery.value, page, per_page: 6 }
        }).then(response => ({ type: 'events', data: response.data }))
      )
    }

    if (filters.value.contentType === 'all' || filters.value.contentType === 'press') {
      searchPromises.push(
        api.get('/press', {
          params: { search: searchQuery.value, page, per_page: 6 }
        }).then(response => ({ type: 'press', data: response.data }))
      )
    }

    if (filters.value.contentType === 'all' || filters.value.contentType === 'success-stories') {
      searchPromises.push(
        api.get('/success-stories', {
          params: { search: searchQuery.value, page, per_page: 6 }
        }).then(response => ({ type: 'successStories', data: response.data }))
      )
    }

    const responses = await Promise.all(searchPromises)

    // Process results
    responses.forEach(response => {
      if (response.data.success) {
        if (page === 1) {
          // Replace results for new search
          results.value[response.type as keyof typeof results.value] = response.data.data
        } else {
          // Append results for pagination
          results.value[response.type as keyof typeof results.value] = [
            ...results.value[response.type as keyof typeof results.value],
            ...response.data.data
          ]
        }
      }
    })

    // Update pagination
    pagination.value.currentPage = page
    pagination.value.hasMore = responses.some(response => 
      response.data.meta && response.data.meta.current_page < response.data.meta.last_page
    )

    // Update URL
    router.push({ 
      query: { 
        ...route.query, 
        q: searchQuery.value,
        type: filters.value.contentType !== 'all' ? filters.value.contentType : undefined
      }
    })

  } catch (err: any) {
    console.error('Search failed:', err)
    error.value = err.response?.data?.message || 'Search failed'
  } finally {
    loading.value = false
  }
}

const setContentType = (type: string) => {
  filters.value.contentType = type
  if (searchQuery.value.trim()) {
    performSearch(1)
  }
}

const getContentTypeLabel = (type: string) => {
  const typeObj = contentTypes.find(t => t.value === type)
  return typeObj ? (locale.value === 'ka' ? typeObj.label.ka : typeObj.label.en) : type
}

const applySuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  performSearch(1)
}

const clearSearch = () => {
  searchQuery.value = ''
  filters.value.contentType = 'all'
  results.value = {
    news: [],
    competitions: [],
    events: [],
    press: [],
    successStories: []
  }
  router.push({ query: {} })
}

const loadMore = () => {
  performSearch(pagination.value.currentPage + 1)
}

const onSearchInput = () => {
  // Auto-search with debouncing could be implemented here
}

// Watch route query for initial search
watch(() => route.query, (newQuery) => {
  if (newQuery.q) {
    searchQuery.value = newQuery.q as string
    if (newQuery.type) {
      filters.value.contentType = newQuery.type as string
    }
    performSearch(1)
  }
}, { immediate: true })

// Initialize
onMounted(() => {
  // Check for search query from URL
  if (route.query.q) {
    searchQuery.value = route.query.q as string
    if (route.query.type) {
      filters.value.contentType = route.query.type as string
    }
    performSearch(1)
  }
})
</script>