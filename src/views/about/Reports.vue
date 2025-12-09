<template>
  <div v-if="loading" class="container-fluid py-8 lg:py-8 animate-pulse">
    <!-- Hero Section Skeleton -->
    <div class="text-center mb-16">
      <div class="h-12 bg-gray-200 rounded-lg mb-6 max-w-md mx-auto"></div>
      <div class="h-6 bg-gray-200 rounded-lg max-w-3xl mx-auto"></div>
    </div>

    <!-- Annual Reports Section Skeleton -->
    <section class="mb-16">
      <!-- Title Skeleton -->
      <div class="h-8 bg-gray-200 rounded-lg mb-8 max-w-md"></div>
      <!-- Reports Grid Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <!-- Icon Skeleton -->
          <div class="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
          <!-- Title Skeleton -->
          <div class="h-6 bg-gray-200 rounded-lg mb-2 max-w-40"></div>
          <!-- Year Skeleton -->
          <div class="h-4 bg-gray-200 rounded w-24 mb-4"></div>
          <!-- Download Link Skeleton -->
          <div class="h-5 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </section>

    <!-- Strategic Plans Section Skeleton -->
    <section class="mb-16">
      <!-- Title Skeleton -->
      <div class="h-8 bg-gray-200 rounded-lg mb-8 max-w-md"></div>
      <!-- Plans Grid Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="i in 2" :key="i" class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <!-- Icon Skeleton -->
          <div class="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
          <!-- Title Skeleton -->
          <div class="h-6 bg-gray-200 rounded-lg mb-2 max-w-48"></div>
          <!-- Period/Year Skeleton -->
          <div class="h-4 bg-gray-200 rounded w-32 mb-4"></div>
          <!-- Download Link Skeleton -->
          <div class="h-5 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </section>

    <!-- Financial Reports Section Skeleton -->
    <section class="mb-16">
      <!-- Title Skeleton -->
      <div class="h-8 bg-gray-200 rounded-lg mb-8 max-w-md"></div>
      <!-- Reports Grid Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="i in 2" :key="i" class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <!-- Icon Skeleton -->
          <div class="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
          <!-- Title Skeleton -->
          <div class="h-6 bg-gray-200 rounded-lg mb-2 max-w-40"></div>
          <!-- Year Skeleton -->
          <div class="h-4 bg-gray-200 rounded w-24 mb-4"></div>
          <!-- Download Link Skeleton -->
          <div class="h-5 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </section>

    <!-- Key Achievements Section Skeleton -->
    <section class="bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl p-8 lg:p-12">
      <!-- Title Skeleton -->
      <div class="h-8 bg-gray-300 rounded-lg mb-8 max-w-md mx-auto"></div>
      <!-- Achievements Grid Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="text-center">
          <!-- Number Skeleton -->
          <div class="h-16 bg-gray-300 rounded-lg mb-2 max-w-32 mx-auto"></div>
          <!-- Title Skeleton -->
          <div class="h-6 bg-gray-300 rounded-lg mb-2 max-w-40 mx-auto"></div>
          <!-- Description Skeleton -->
          <div class="h-4 bg-gray-300 rounded-lg max-w-32 mx-auto mt-2"></div>
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
      <p v-if="pageData.subtitle" class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {{ $i18n.locale === 'ka' ? pageData.subtitle.ka : pageData.subtitle.en }}
      </p>
    </div>

    <!-- Dynamic Annual Reports -->
    <section v-if="pageData.annual_reports_title || pageData.annual_reports_list" class="mb-16">
      <h2 v-if="pageData.annual_reports_title" class="text-3xl font-bold text-gray-900 mb-8 font-headline">
        {{ $i18n.locale === 'ka' ? pageData.annual_reports_title.ka : pageData.annual_reports_title.en }}
      </h2>
      
      <div v-if="pageData.annual_reports_list && pageData.annual_reports_list.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(report, index) in pageData.annual_reports_list" :key="index" class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <div class="w-6 h-6 border-2 border-primary-500 rounded-full"></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2 font-headline">
            {{ $i18n.locale === 'ka' ? report.title.ka : report.title.en }}
          </h3>
          <p v-if="report.year" class="text-gray-600 mb-4 text-sm">{{ report.year }} {{ $t('common.year') }}</p>
          <a v-if="report.file" :href="report.file" target="_blank" class="text-primary-600 hover:text-primary-700 font-medium flex items-center">
            {{ $t('about.reports.download') }}
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Dynamic Strategic Plans -->
    <section v-if="pageData.strategic_plans_title || pageData.strategic_plans_list" class="mb-16">
      <h2 v-if="pageData.strategic_plans_title" class="text-3xl font-bold text-gray-900 mb-8 font-headline">
        {{ $i18n.locale === 'ka' ? pageData.strategic_plans_title.ka : pageData.strategic_plans_title.en }}
      </h2>
      
      <div v-if="pageData.strategic_plans_list && pageData.strategic_plans_list.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(plan, index) in pageData.strategic_plans_list" :key="index" 
             :class="['rounded-2xl p-8 border', index % 2 === 0 ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200' : 'bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200']">
          <div :class="['w-12 h-12 rounded-full flex items-center justify-center mb-4', index % 2 === 0 ? 'bg-primary-500' : 'bg-secondary-500']">
            <div class="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3 font-headline">
            {{ $i18n.locale === 'ka' ? plan.title.ka : plan.title.en }}
          </h3>
          <p v-if="plan.year || plan.period" class="text-gray-700 mb-4 leading-relaxed">
            {{ plan.period || plan.year }} {{ plan.period ? '' : $t('common.year') }}
          </p>
          <a v-if="plan.file" :href="plan.file" target="_blank" 
             :class="['font-semibold flex items-center hover:underline', index % 2 === 0 ? 'text-primary-700 hover:text-primary-800' : 'text-secondary-700 hover:text-secondary-800']">
            {{ $t('about.reports.download') }}
            <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Dynamic Financial Reports -->
    <section v-if="pageData.financial_reports_title || pageData.financial_reports_list" class="mb-16">
      <h2 v-if="pageData.financial_reports_title" class="text-3xl font-bold text-gray-900 mb-8 font-headline">
        {{ $i18n.locale === 'ka' ? pageData.financial_reports_title.ka : pageData.financial_reports_title.en }}
      </h2>
      
      <div v-if="pageData.financial_reports_list && pageData.financial_reports_list.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(report, index) in pageData.financial_reports_list" :key="index" class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <div class="w-6 h-6 border-2 border-primary-500 rounded-full"></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2 font-headline">
            {{ $i18n.locale === 'ka' ? report.title.ka : report.title.en }}
          </h3>
          <p v-if="report.year" class="text-gray-600 mb-4 text-sm">{{ report.year }} {{ $t('common.year') }}</p>
          <a v-if="report.file" :href="report.file" target="_blank" class="text-primary-600 hover:text-primary-700 font-medium flex items-center">
            {{ $t('about.reports.download') }}
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Dynamic Key Achievements -->
    <section v-if="pageData.achievements_title || pageData.achievements_list" class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 lg:p-12 text-white">
      <h2 v-if="pageData.achievements_title" class="text-3xl font-bold mb-8 text-center font-headline">
        {{ $i18n.locale === 'ka' ? pageData.achievements_title.ka : pageData.achievements_title.en }}
      </h2>
      <div v-if="pageData.achievements_list && pageData.achievements_list.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(achievement, index) in pageData.achievements_list" :key="index" class="text-center">
          <div v-if="achievement.number" class="text-5xl font-bold mb-2 font-headline">{{ achievement.number }}{{ achievement.suffix || '' }}</div>
          <div class="text-xl opacity-90">{{ $i18n.locale === 'ka' ? achievement.title.ka : achievement.title.en }}</div>
          <p v-if="achievement.description" class="text-base opacity-75 mt-2">
            {{ $i18n.locale === 'ka' ? achievement.description.ka : achievement.description.en }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePagesStore } from '../../stores/pages'

useI18n() // Initialize i18n for $t() usage
const pagesStore = usePagesStore()

const pageData = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // Fetch reports page data by slug
    const response = await pagesStore.fetchPageBySlug('about/reports')
    if (response) {
      pageData.value = response
    } else {
      error.value = 'Reports page not found'
    }
  } catch (err: any) {
    console.error('Failed to load reports page:', err)
    error.value = err.message || 'Failed to load page'
  } finally {
    loading.value = false
  }
})
</script>