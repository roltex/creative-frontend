<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in perPage" :key="i" class="card">
        <div class="aspect-16-9 skeleton"></div>
        <div class="p-6 space-y-3">
          <div class="skeleton h-4 w-20"></div>
          <div class="skeleton h-6 w-full"></div>
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-1/3"></div>
        </div>
      </div>
    </div>

    <!-- News Grid -->
    <div v-else-if="articles.length > 0">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink
          v-for="article in articles"
          :key="article.id"
          :to="{ name: 'news-article', params: { slug: article.slug } }"
          class="card-hover group block"
        >
          <!-- Image with Overlay -->
          <div class="relative aspect-16-9 bg-gray-100 overflow-hidden">
            <img
              v-if="article.image"
              :src="getImageUrl(article.image)"
              :alt="article.title[$i18n.locale as 'ka' | 'en']"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
              <Newspaper class="w-16 h-16 text-gray-400" />
            </div>
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <!-- Category Badge -->
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1.5 bg-primary-500 text-white text-xs font-semibold rounded-full shadow-md uppercase tracking-wide">
                {{ article.category }}
              </span>
            </div>
            
            <!-- Date Badge -->
            <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
              <div class="text-xs text-gray-600 text-center">{{ formatDate(article.published_at || article.publishedAt, locale) }}</div>
            </div>
            
            <!-- Title at Bottom -->
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <h3 class="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-primary-200 transition-colors">
                {{ article.title[$i18n.locale as 'ka' | 'en'] }}
              </h3>
            </div>
          </div>
          
          <!-- Content Below Image -->
          <div class="p-6 bg-white">
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ article.excerpt?.[$i18n.locale as 'ka' | 'en'] || stripHtml(article.content?.[$i18n.locale as 'ka' | 'en'] || '').substring(0, 150) + '...' }}
            </p>
            <div class="flex items-center justify-end">
              <span class="text-primary-500 hover:text-primary-600 font-medium text-sm">
                {{ $t('news.readMore') }} →
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
      
      <!-- Pagination -->
      <Pagination
        v-if="!limit && totalPages > 1"
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        class="mt-8"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <Newspaper class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('common.noResults') }}</h3>
      <p class="text-gray-600">{{ $t('news.noNewsAvailable') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Newspaper } from 'lucide-vue-next'
import { getImageUrl } from '../../utils/imageUrl'
import { formatDate } from '../../utils/dateFormat'
import Pagination from '../common/Pagination.vue'
import api from '../../api/axios'

interface Props {
  limit?: number
  category?: string
}

const props = defineProps<Props>()
const { locale } = useI18n()

// Local state for server-side pagination
const articles = ref<any[]>([])
const isLoading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = props.limit || 9

// Fetch articles from API with pagination
const fetchArticles = async (page: number = 1) => {
  isLoading.value = true
  
  try {
    const params: any = {
      page,
      per_page: perPage
    }
    
    if (props.category) {
      params.category = props.category
    }
    
    const response = await api.get('/news', { params })
    
    if (response.data.success) {
      articles.value = Array.isArray(response.data.data) ? response.data.data : []
      
      // Update pagination from response meta
      if (response.data.meta) {
        currentPage.value = response.data.meta.current_page || page
        totalPages.value = response.data.meta.last_page || 1
      } else {
        totalPages.value = 1
      }
    }
  } catch (err) {
    console.error('Failed to fetch articles:', err)
    articles.value = []
  } finally {
    isLoading.value = false
  }
}

// Watch for page changes
watch(currentPage, (newPage) => {
  if (!props.limit) {
    fetchArticles(newPage)
  }
})

// Watch for category changes
watch(() => props.category, () => {
  currentPage.value = 1
  fetchArticles(1)
})

const stripHtml = (html: string): string => {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

onMounted(() => {
  fetchArticles(1)
})
</script>
