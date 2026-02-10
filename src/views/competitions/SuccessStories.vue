<template>
  <div class="container-fluid py-8 lg:py-8">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-headline">
        {{ $t('successStory.title') }}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {{ $t('successStory.subtitle') }}
      </p>
    </div>

    <!-- Loading State - Skeleton Loader -->
    <div v-if="loading" class="animate-pulse">
      <!-- Success Stories Grid Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div v-for="i in perPage" :key="i" class="bg-white rounded-3xl shadow-lg overflow-hidden">
          <!-- Image Skeleton -->
          <div class="relative h-64 bg-gray-200">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <!-- Name Skeleton -->
              <div class="h-8 bg-gray-300 rounded-lg mb-2 max-w-48"></div>
              <!-- Category Skeleton -->
              <div class="h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
          <!-- Content Skeleton -->
          <div class="p-6">
            <!-- Description Skeleton -->
            <div class="space-y-2 mb-4">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <!-- Footer Skeleton -->
            <div class="flex items-center justify-between">
              <div class="h-4 bg-gray-200 rounded w-16"></div>
              <div class="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('common.error') }}</h2>
      <p class="text-gray-600">{{ error }}</p>
    </div>

    <!-- Success Stories Grid -->
    <div v-else-if="successStories.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <RouterLink
          v-for="story in successStories" 
          :key="story.id" 
          :to="{ name: 'success-story-details', params: { slug: story.slug } }"
          class="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
        >
          <div class="relative h-64 overflow-hidden">
            <img :src="getImageUrl(story.image)" :alt="typeof story.name === 'object' ? story.name[locale as 'ka' | 'en'] : story.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <h3 class="text-2xl font-bold text-white mb-2 font-headline">{{ typeof story.name === 'object' ? story.name[locale as 'ka' | 'en'] : story.name }}</h3>
              <p class="text-white/90 text-sm line-clamp-2">{{ typeof story.category === 'object' ? story.category[locale as 'ka' | 'en'] : story.category }}</p>
            </div>
          </div>
          <div class="p-6">
            <p class="text-gray-700 leading-relaxed mb-4">{{ typeof story.description === 'object' ? story.description[locale as 'ka' | 'en'] : story.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">{{ story.year }}</span>
              <span class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                {{ $t('successStory.moreInfo') }} →
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
      
      <!-- Pagination -->
      <Pagination
        v-if="totalPages > 1"
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        class="mb-16"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('common.noResults') }}</h3>
      <p class="text-gray-600">{{ $t('successStory.noStories') }}</p>
    </div>

    <!-- CTA Section -->
    <section v-if="!loading" class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 lg:p-12 text-white text-center">
      <h2 class="text-3xl font-bold mb-4 font-headline">{{ $t('successStory.readyToCreate') }}</h2>
      <p class="text-xl opacity-90 mb-8">{{ $t('successStory.joinCreative') }}</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink
          :to="{ name: 'competitions-current' }"
          class="px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline"
        >
          {{ $t('successStory.viewCompetitions') }}
        </RouterLink>
        <RouterLink
          to="/application"
          class="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline"
        >
          {{ $t('successStory.fillApplication') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getImageUrl } from '../../utils/imageUrl'
import api from '../../api/axios'
import Pagination from '../../components/common/Pagination.vue'

const { locale } = useI18n()
const successStories = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Server-side pagination
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = 9

// Fetch success stories with pagination
const fetchSuccessStories = async (page: number = 1) => {
  loading.value = true
  error.value = null
  
  try {
    const response = await api.get('/success-stories', {
      params: {
        page,
        per_page: perPage
      }
    })
    
    if (response.data.success) {
      successStories.value = response.data.data || []
      
      // Update pagination from response meta
      if (response.data.meta) {
        currentPage.value = response.data.meta.current_page || page
        totalPages.value = response.data.meta.last_page || 1
      } else {
        totalPages.value = 1
      }
    } else {
      error.value = 'Failed to load success stories'
    }
  } catch (err: any) {
    console.error('Failed to fetch success stories:', err)
    error.value = err.message || 'Failed to load success stories'
    successStories.value = []
  } finally {
    loading.value = false
  }
}

// Watch for page changes
watch(currentPage, (newPage) => {
  fetchSuccessStories(newPage)
})

onMounted(() => {
  fetchSuccessStories(1)
})
</script>
