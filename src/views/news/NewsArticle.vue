<template>
  <div class="container-fluid py-12">
    <div v-if="loading" class="text-center py-12">
      <div class="skeleton h-12 w-3/4 mx-auto mb-8"></div>
      <div class="skeleton h-4 w-full mb-4"></div>
      <div class="skeleton h-4 w-full mb-4"></div>
      <div class="skeleton h-4 w-3/4"></div>
    </div>

    <div v-else-if="article">
      <!-- Hero Section -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div class="relative h-96 lg:h-[500px]">
          <img
            v-if="article.image"
            :src="getImageUrl(article.image)"
            :alt="article.title[$i18n.locale as 'ka' | 'en']"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
            <Newspaper class="w-32 h-32 text-primary-500" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <!-- Content Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
            <div class="max-w-4xl">
              <div class="flex items-center gap-3 mb-4">
                <span class="px-4 py-2 bg-primary-500 rounded-full text-sm font-semibold">
                  {{ article.category }}
                </span>
                <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {{ formatDate(article.publishedAt, locale) }}
                </span>
              </div>
              <h1 class="text-4xl lg:text-5xl font-bold mb-4 font-headline">
                {{ article.title[$i18n.locale as 'ka' | 'en'] }}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Content -->
        <article class="lg:col-span-3">

        <!-- Content -->
        <div class="prose prose-lg max-w-none mb-8">
          <div class="text-lg text-gray-700 leading-relaxed" v-html="article.content[$i18n.locale as 'ka' | 'en']"></div>
        </div>

        <!-- Gallery -->
        <div v-if="article.gallery && article.gallery.length > 0" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 font-headline">{{ $t('news.gallery') }}</h2>
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
            :to="{ name: 'news' }"
            class="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>←</span>
            <span>{{ $t('news.backToNews') }}</span>
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
                {{ $t('news.relatedArticles') }}
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
                    :to="{ name: 'news-article', params: { slug: relatedArticle.slug } }"
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
                        {{ formatDate(relatedArticle.publishedAt, locale) }}
                      </p>
                    </div>
                  </RouterLink>
                </article>
              </div>
              <div v-else class="text-center py-8 text-gray-500">
                <p class="text-sm">{{ $t('news.noRelatedArticles') }}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-600">{{ $t('news.articleNotFound') }}</p>
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
import { ChevronLeft, ChevronRight, X, Clock, Newspaper } from 'lucide-vue-next'
import { getImageUrl } from '../../utils/imageUrl'
import { formatDate } from '../../utils/dateFormat'
import { useNewsStore } from '../../stores/news'

const route = useRoute()
const { locale } = useI18n()
const newsStore = useNewsStore()

const loading = computed(() => newsStore.loading)
const article = computed(() => newsStore.currentArticle || newsStore.articles.find(a => a.slug === route.params.slug))

const relatedArticles = computed(() => {
  if (!article.value) return []
  
  // First try to get articles from same category
  const sameCategory = newsStore.articles.filter(a => a.id !== article.value!.id && a.category === article.value!.category)
  
  // If we have at least 3 from same category, use those
  if (sameCategory.length >= 3) {
    return sameCategory.slice(0, 3)
  }
  
  // Otherwise, fill with other articles
  const otherArticles = newsStore.articles.filter(a => a.id !== article.value!.id)
  return [...sameCategory, ...otherArticles].slice(0, 3)
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

onMounted(async () => {
  const slug = route.params.slug as string
  if (slug && !article.value) {
    await newsStore.fetchArticleBySlug(slug)
  }
})
</script>
