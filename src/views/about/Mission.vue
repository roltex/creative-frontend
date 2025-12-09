<template>
  <div v-if="loading" class="container-fluid py-8 lg:py-8 animate-pulse">
    <!-- Hero Section Skeleton -->
    <div class="text-center mb-16">
      <div class="h-12 bg-gray-200 rounded-lg mb-6 max-w-md mx-auto"></div>
      <div class="h-6 bg-gray-200 rounded-lg max-w-3xl mx-auto"></div>
    </div>

    <!-- Mission Section Skeleton -->
    <section class="mb-16">
      <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 lg:p-12">
        <div class="max-w-4xl mx-auto">
          <!-- Icon Skeleton -->
          <div class="w-16 h-16 bg-gray-300 rounded-full mb-6"></div>
          <!-- Title Skeleton -->
          <div class="h-8 bg-gray-300 rounded-lg mb-6 max-w-md"></div>
          <!-- Content Skeleton -->
          <div class="space-y-3">
            <div class="h-4 bg-gray-300 rounded w-full"></div>
            <div class="h-4 bg-gray-300 rounded w-full"></div>
            <div class="h-4 bg-gray-300 rounded w-5/6"></div>
            <div class="h-4 bg-gray-300 rounded w-full"></div>
            <div class="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Goals Section Skeleton -->
    <section class="mb-16">
      <div class="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-3xl p-8 lg:p-12">
        <div class="max-w-4xl mx-auto">
          <!-- Icon Skeleton -->
          <div class="w-16 h-16 bg-gray-300 rounded-full mb-6"></div>
          <!-- Title Skeleton -->
          <div class="h-8 bg-gray-300 rounded-lg mb-6 max-w-md"></div>
          <!-- Content Skeleton -->
          <div class="space-y-3 mb-6">
            <div class="h-4 bg-gray-300 rounded w-full"></div>
            <div class="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
          <!-- List Items Skeleton -->
          <ul class="space-y-3">
            <li v-for="i in 4" :key="i" class="flex items-start">
              <div class="w-2 h-2 bg-gray-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div class="h-4 bg-gray-300 rounded flex-1" :style="{ width: i % 2 === 0 ? '90%' : '75%' }"></div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Values Section Skeleton -->
    <section class="mb-16">
      <!-- Title Skeleton -->
      <div class="h-8 bg-gray-200 rounded-lg mb-8 max-w-md mx-auto"></div>
      <!-- Values Grid Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl shadow-lg p-6 text-center">
          <!-- Icon Skeleton -->
          <div class="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <!-- Title Skeleton -->
          <div class="h-6 bg-gray-200 rounded-lg mb-2 max-w-32 mx-auto"></div>
          <!-- Description Skeleton -->
          <div class="space-y-2 mt-4">
            <div class="h-3 bg-gray-200 rounded w-full"></div>
            <div class="h-3 bg-gray-200 rounded w-4/5 mx-auto"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section Skeleton -->
    <section class="bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl p-8 lg:p-12">
      <!-- Title Skeleton -->
      <div class="h-8 bg-gray-300 rounded-lg mb-8 max-w-md mx-auto"></div>
      <!-- Stats Grid Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="text-center">
          <!-- Number Skeleton -->
          <div class="h-16 bg-gray-300 rounded-lg mb-2 max-w-32 mx-auto"></div>
          <!-- Label Skeleton -->
          <div class="h-6 bg-gray-300 rounded-lg max-w-40 mx-auto"></div>
        </div>
      </div>
    </section>
  </div>

  <div v-else-if="error" class="container-fluid py-8 lg:py-8">
    <div class="text-center">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-headline">
        Page Not Found
      </h1>
      <p class="text-xl text-gray-600">
        {{ error }}
      </p>
    </div>
  </div>

  <div v-else-if="pageData" class="container-fluid py-8 lg:py-8">
    <!-- Dynamic Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-headline">
        {{ $i18n.locale === 'ka' ? pageData.title.ka : pageData.title.en }}
      </h1>
      <p v-if="pageData.hero_subtitle" class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {{ $i18n.locale === 'ka' ? pageData.hero_subtitle.ka : pageData.hero_subtitle.en }}
      </p>
      <p v-else-if="pageData.subtitle" class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {{ $i18n.locale === 'ka' ? pageData.subtitle.ka : pageData.subtitle.en }}
      </p>
    </div>

    <!-- Dynamic Mission Section -->
    <section v-if="pageData.mission_title || pageData.mission_content" class="mb-16">
      <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 lg:p-12">
        <div class="max-w-4xl mx-auto">
          <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-6">
            <div class="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <h2 v-if="pageData.mission_title" class="text-3xl font-bold text-gray-900 mb-6 font-headline">
            {{ $i18n.locale === 'ka' ? pageData.mission_title.ka : pageData.mission_title.en }}
          </h2>
          <div class="prose prose-lg max-w-none">
            <div v-if="pageData.mission_content" 
                 class="text-gray-700 leading-relaxed text-lg mb-4"
                 v-html="$i18n.locale === 'ka' ? pageData.mission_content.ka : pageData.mission_content.en">
            </div>
            <div v-if="pageData.mission_content_2" 
                 class="text-gray-700 leading-relaxed text-lg"
                 v-html="$i18n.locale === 'ka' ? pageData.mission_content_2.ka : pageData.mission_content_2.en">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic Goals Section -->
    <section v-if="pageData.goals_title || pageData.goals_list" class="mb-16">
      <div class="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-3xl p-8 lg:p-12">
        <div class="max-w-4xl mx-auto">
          <div class="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mb-6">
            <div class="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <h2 v-if="pageData.goals_title" class="text-3xl font-bold text-gray-900 mb-6 font-headline">
            {{ $i18n.locale === 'ka' ? pageData.goals_title.ka : pageData.goals_title.en }}
          </h2>
          <div class="prose prose-lg max-w-none">
            <div v-if="pageData.goals_content" 
                 class="text-gray-700 leading-relaxed text-lg mb-4"
                 v-html="$i18n.locale === 'ka' ? pageData.goals_content.ka : pageData.goals_content.en">
            </div>
            <ul v-if="pageData.goals_list && pageData.goals_list.length > 0" class="text-gray-700 space-y-3">
              <li v-for="(goal, index) in pageData.goals_list" :key="index" class="flex items-start">
                <div class="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>{{ $i18n.locale === 'ka' ? goal.ka : goal.en }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic Values Section -->
    <section v-if="pageData.values_title || pageData.values_list" class="mb-16">
      <h2 v-if="pageData.values_title" class="text-3xl font-bold text-gray-900 mb-8 text-center font-headline">
        {{ $i18n.locale === 'ka' ? pageData.values_title.ka : pageData.values_title.en }}
      </h2>
      <div v-if="pageData.values_list && pageData.values_list.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(value, index) in pageData.values_list" :key="index" class="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div class="w-6 h-6 border-2 border-primary-500 rounded-full"></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2 font-headline">
            {{ $i18n.locale === 'ka' ? value.ka : value.en }}
          </h3>
          <p v-if="value.description" class="text-gray-600">
            {{ $i18n.locale === 'ka' ? value.description.ka : value.description.en }}
          </p>
        </div>
      </div>
    </section>

    <!-- Dynamic Stats Section -->
    <section v-if="pageData.stats_title || pageData.stats_list" class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 lg:p-12 text-white">
      <h2 v-if="pageData.stats_title" class="text-3xl font-bold mb-8 text-center font-headline">
        {{ $i18n.locale === 'ka' ? pageData.stats_title.ka : pageData.stats_title.en }}
      </h2>
      <div v-if="pageData.stats_list && pageData.stats_list.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(stat, index) in pageData.stats_list" :key="index" class="text-center">
          <div class="text-5xl font-bold mb-2 font-headline">{{ stat.number }}{{ stat.suffix || '' }}</div>
          <div class="text-xl opacity-90">{{ $i18n.locale === 'ka' ? stat.label.ka : stat.label.en }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePagesStore } from '../../stores/pages'

const { locale } = useI18n()
const pagesStore = usePagesStore()

const pageData = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // Fetch mission page data by slug
    const response = await pagesStore.fetchPageBySlug('about/mission')
    if (response) {
      pageData.value = response
    } else {
      error.value = 'Mission page not found'
    }
  } catch (err: any) {
    console.error('Failed to load mission page:', err)
    error.value = err.message || 'Failed to load page'
  } finally {
    loading.value = false
  }
})
</script>