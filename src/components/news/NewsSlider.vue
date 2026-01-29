<template>
  <div class="relative">
    <!-- Header with Title and Navigation -->
    <div class="flex items-center justify-between mb-12">
      <div class="text-center flex-1">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          ბოლო სიახლეები
        </h2>
        <p class="text-gray-600">
          გაიგე რა გვაქვს ახალი საინტერესო შეთავაზებების სანახავად
        </p>
      </div>
      
      <!-- Navigation Arrows -->
      <div class="flex gap-2 ml-4">
        <button 
          @click="slideLeft"
          :disabled="!canSlidePrevious"
          class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          :class="canSlidePrevious ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 cursor-not-allowed'"
        >
          <ChevronLeft class="w-5 h-5" :class="canSlidePrevious ? 'text-gray-600' : 'text-gray-300'" />
        </button>
        
        <button 
          @click="slideRight"
          :disabled="!canSlideNext"
          class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          :class="canSlideNext ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 cursor-not-allowed'"
        >
          <ChevronRight class="w-5 h-5" :class="canSlideNext ? 'text-gray-600' : 'text-gray-300'" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!initialized" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="bg-gray-50 rounded-2xl shadow-sm overflow-hidden">
        <div class="flex h-48">
          <!-- Image skeleton (Left) -->
          <div class="w-48 h-48 skeleton rounded-l-2xl"></div>
          <!-- Content skeleton (Right) -->
          <div class="flex-1 p-6 space-y-2">
            <div class="skeleton h-3 w-16"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-3/4"></div>
            <div class="skeleton h-3 w-full"></div>
            <div class="skeleton h-3 w-2/3"></div>
            <div class="skeleton h-6 w-20"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- News Grid (2x2 layout like screenshot) -->
    <div v-else-if="articles?.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div 
        v-for="article in displayedArticles" 
        :key="article.id"
        @click="handleCardClick(article)"
        class="bg-gray-50 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      >
        <!-- Horizontal card layout: image left, content right -->
        <div class="flex h-48">
          <!-- Image Section (Left) -->
          <div class="w-48 h-48 flex-shrink-0 overflow-hidden rounded-l-2xl">
            <img
              v-if="article.image"
              :src="getImageUrl(article.image)"
              :alt="article.title[locale as 'ka' | 'en']"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
              <Newspaper class="w-8 h-8 text-gray-400" />
            </div>
          </div>
          
          <!-- Content Section (Right) -->
          <div class="flex-1 p-6 flex flex-col justify-between">
            <!-- Date -->
            <div class="text-xs text-gray-500 mb-2">
              {{ formatDate(article.publishedAt) }}
            </div>
            
            <!-- Article Title -->
            <h3 class="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
              {{ article.title[locale as 'ka' | 'en'] }}
            </h3>
            
            <!-- News small text under title -->
            <p class="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed flex-1">
              {{ article.excerpt?.[locale as 'ka' | 'en'] || article.content[locale as 'ka' | 'en'].substring(0, 80) + '...' }}
            </p>
            
            <!-- Read More Button -->
            <button @click.stop="handleCardClick(article)" class="bg-secondary-500 hover:bg-secondary-600 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 self-start">
              გაიგე მეტი
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- View All Button -->
    <div v-if="articles?.length > 0" class="text-center pt-4 pb-2">
      <button @click="handleViewAll" class="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors duration-200 text-sm">
        ყველას ნახვა
      </button>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-gray-50 rounded-2xl">
      <Newspaper class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('common.noResults') }}</h3>
      <p class="text-gray-600">No news articles available at the moment.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ChevronLeft, ChevronRight, Newspaper } from 'lucide-vue-next'
import { format } from 'date-fns'
import { ka } from 'date-fns/locale'
import { getImageUrl } from '../../utils/imageUrl'
import { useNewsStore } from '../../stores/news'

const newsStore = useNewsStore()
const articles = computed(() => newsStore.articles)
const initialized = computed(() => newsStore.initialized)
const { locale } = useI18n()
const router = useRouter()

// Current page for pagination
const currentPage = ref(1)

// Computed properties for navigation state
const totalPages = computed(() => {
  let filtered = articles.value || []
  if (props.category) {
    filtered = filtered.filter(a => a.category === props.category)
  }
  const itemsPerPage = props.limit || 4
  return Math.ceil(filtered.length / itemsPerPage)
})

const canSlidePrevious = computed(() => currentPage.value > 1)
const canSlideNext = computed(() => currentPage.value < totalPages.value)

const slideLeft = () => {
  if (canSlidePrevious.value) {
    currentPage.value--
  }
}

const slideRight = () => {
  if (canSlideNext.value) {
    currentPage.value++
  }
}

interface Props {
  limit?: number
  category?: string
}

const props = defineProps<Props>()

const displayedArticles = computed(() => {
  let filtered = articles.value || []
  
  if (props.category) {
    filtered = filtered.filter(a => a.category === props.category)
  }
  
  // Calculate items per page (default 4 for 2x2 grid)
  const itemsPerPage = props.limit || 4
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  
  return filtered.slice(startIndex, endIndex)
})

const formatDate = (date: string) => {
  return format(new Date(date), 'dd MMM, yyyy', { 
    locale: locale.value === 'ka' ? ka : undefined 
  })
}

const handleCardClick = (article: any) => {
  router.push({ name: 'news-article', params: { slug: article.slug } })
}

const handleViewAll = () => {
  router.push({ name: 'news' })
}

// Fetch articles if not initialized
onMounted(async () => {
  if (!initialized.value && !newsStore.loading) {
    await newsStore.fetchArticles()
  }
})
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Skeleton loading animation */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
