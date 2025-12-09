<template>
  <div class="container-fluid py-12">
    <div v-if="loading" class="text-center py-12">
      <div class="skeleton h-12 w-3/4 mx-auto mb-8"></div>
      <div class="skeleton h-4 w-full mb-4"></div>
      <div class="skeleton h-4 w-full mb-4"></div>
      <div class="skeleton h-4 w-3/4"></div>
    </div>

    <div v-else-if="article" class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Main Content -->
      <article class="lg:col-span-3">
        <!-- Header -->
        <header class="mb-8">
          <div class="mb-4">
            <span class="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              {{ article.category }}
            </span>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-headline">
            {{ article.title[$i18n.locale as 'ka' | 'en'] }}
          </h1>
          <div class="flex items-center space-x-4 text-gray-600">
            <span>{{ formatDate(article.publishedAt) }}</span>
            <span v-if="article.viewCount">• {{ article.viewCount }} {{ $t('press.views') }}</span>
          </div>
        </header>

        <!-- Featured Image -->
        <div v-if="article.image" class="mb-8">
          <img
            :src="getImageUrl(article.image)"
            :alt="article.title[$i18n.locale as 'ka' | 'en']"
            class="w-full h-auto rounded-2xl"
          />
        </div>

        <!-- Content -->
        <div class="prose prose-lg max-w-none mb-8">
          <p class="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {{ article.content[$i18n.locale as 'ka' | 'en'] }}
          </p>
        </div>

        <!-- Gallery -->
        <div v-if="article.gallery && article.gallery.length > 0" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 font-headline">{{ $t('press.gallery') }}</h2>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(image, index) in article.gallery"
              :key="index"
              class="aspect-4-3 overflow-hidden rounded-xl cursor-pointer group"
              @click="openLightbox(index)"
            >
              <img
                :src="getImageUrl(image)"
                :alt="`${article.title[$i18n.locale as 'ka' | 'en']} - Image ${index + 1}`"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="article.tags && article.tags.length > 0" class="mt-8 pt-8 border-t border-gray-200">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- Back Button -->
        <div class="mt-8">
          <RouterLink
            :to="{ name: 'press' }"
            class="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>←</span>
            <span>{{ $t('press.backToPress') }}</span>
          </RouterLink>
        </div>
      </article>

      <!-- Sidebar -->
      <aside class="lg:col-span-1">
        <div class="sticky top-8 space-y-6">
          <!-- Related Articles -->
          <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div class="bg-gradient-to-r from-primary-500 to-primary-600 p-4">
              <h3 class="text-lg font-bold text-white font-headline flex items-center">
                <span class="w-1 h-6 bg-white rounded-full mr-3"></span>
                {{ $t('press.relatedArticles') }}
              </h3>
            </div>
            <div class="p-4">
              <div v-if="relatedArticles.length > 0" class="space-y-4">
                <article
                  v-for="relatedArticle in relatedArticles"
                  :key="relatedArticle.id"
                  class="group hover:bg-gray-50 rounded-xl transition-all duration-200"
                >
                  <RouterLink
                    :to="{ name: 'press-article', params: { slug: relatedArticle.slug } }"
                    class="block p-2"
                  >
                    <div v-if="relatedArticle.image" class="aspect-16-9 overflow-hidden rounded-lg mb-2 shadow-sm">
                      <img
                        :src="getImageUrl(relatedArticle.image)"
                        :alt="relatedArticle.title[$i18n.locale as 'ka' | 'en']"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div class="px-1">
                      <span class="inline-block px-2 py-1 bg-primary-50 text-primary-600 rounded-md text-xs font-semibold mb-2">
                        {{ relatedArticle.category }}
                      </span>
                      <h4 class="text-sm font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2 mb-2 leading-snug transition-colors">
                        {{ relatedArticle.title[$i18n.locale as 'ka' | 'en'] }}
                      </h4>
                      <p class="text-xs text-gray-500 flex items-center">
                        <Clock class="w-3 h-3 mr-1" />
                        {{ formatDate(relatedArticle.publishedAt) }}
                      </p>
                    </div>
                  </RouterLink>
                </article>
              </div>
              <div v-else class="text-center py-8 text-gray-500">
                <p class="text-sm">{{ $t('press.noRelatedArticles') }}</p>
              </div>
            </div>
          </div>

          <!-- Popular Articles -->
          <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div class="bg-gradient-to-r from-secondary-500 to-secondary-600 p-4">
              <h3 class="text-lg font-bold text-white font-headline flex items-center">
                <span class="w-1 h-6 bg-white rounded-full mr-3"></span>
                {{ $t('press.popularArticles') }}
              </h3>
            </div>
            <div class="p-4">
              <div v-if="popularArticles.length > 0" class="space-y-3">
                <article
                  v-for="popularArticle in popularArticles"
                  :key="popularArticle.id"
                  class="group"
                >
                  <RouterLink
                    :to="{ name: 'press-article', params: { slug: popularArticle.slug } }"
                    class="flex items-start space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                  >
                    <div v-if="popularArticle.image" class="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg">
                      <img
                        :src="getImageUrl(popularArticle.image)"
                        :alt="popularArticle.title[$i18n.locale as 'ka' | 'en']"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2 leading-snug transition-colors">
                        {{ popularArticle.title[$i18n.locale as 'ka' | 'en'] }}
                      </h4>
                      <p class="text-xs text-gray-500 mt-1">{{ formatDate(popularArticle.publishedAt) }}</p>
                    </div>
                  </RouterLink>
                </article>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-600">{{ $t('press.articleNotFound') }}</p>
    </div>

    <!-- Lightbox -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      @click="closeLightbox"
    >
      <button
        class="absolute top-4 right-4 text-white hover:text-gray-300"
        @click="closeLightbox"
      >
        <X class="w-8 h-8" />
      </button>
      <button
        v-if="currentImageIndex > 0"
        class="absolute left-4 text-white hover:text-gray-300"
        @click.stop="previousImage"
      >
        <ChevronLeft class="w-8 h-8" />
      </button>
      <button
        v-if="currentImageIndex < (article?.gallery?.length || 0) - 1"
        class="absolute right-4 text-white hover:text-gray-300"
        @click.stop="nextImage"
      >
        <ChevronRight class="w-8 h-8" />
      </button>
      <img
        v-if="article?.gallery"
        :src="getImageUrl(article.gallery[currentImageIndex])"
        :alt="`${article.title[$i18n.locale as 'ka' | 'en']} - Image ${currentImageIndex + 1}`"
        class="max-w-full max-h-full object-contain"
        @click.stop
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, X, Clock } from 'lucide-vue-next'
import { getImageUrl, getImageUrls } from '../../utils/imageUrl'
import { usePressStore } from '../../stores/press'

const route = useRoute()
const {  } = useI18n()
const pressStore = usePressStore()

const { loading, currentArticle, articles } = pressStore

const article = computed(() => currentArticle || articles.find(a => a.slug === route.params.slug))

const relatedArticles = computed(() => {
  if (!article.value) return []
  
  // First try to get articles from same category
  const sameCategory = articles.filter(a => a.id !== article.value!.id && a.category === article.value!.category)
  
  // If we have at least 3 from same category, use those
  if (sameCategory.length >= 3) {
    return sameCategory.slice(0, 3)
  }
  
  // Otherwise, fill with other articles
  const otherArticles = articles.filter(a => a.id !== article.value!.id)
  return [...sameCategory, ...otherArticles].slice(0, 3)
})

const popularArticles = computed(() => {
  return articles
    .filter(a => a.id !== article.value?.id)
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 3)
})

const lightboxOpen = ref(false)
const currentImageIndex = ref(0)

const openLightbox = (index: number) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextImage = () => {
  if (article.value?.gallery && currentImageIndex.value < article.value.gallery.length - 1) {
    currentImageIndex.value++
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const formatDate = (date: string) => {
  return format(new Date(date), 'MMM dd, yyyy')
}

onMounted(async () => {
  const slug = route.params.slug as string
  if (slug && !article.value) {
    await pressStore.fetchArticleBySlug(slug)
  }
})
</script>
