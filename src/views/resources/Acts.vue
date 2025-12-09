<template>
  <div v-if="loading" class="container-fluid py-8 lg:py-8">
    <!-- Loading skeleton -->
    <div class="text-center mb-16">
      <div class="h-12 bg-gray-200 rounded-md mb-6 max-w-md mx-auto animate-pulse"></div>
      <div class="h-6 bg-gray-200 rounded-md max-w-3xl mx-auto animate-pulse"></div>
    </div>
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

    <!-- Dynamic Legal Acts -->
    <section v-if="pageData.legal_acts_title || pageData.legal_acts_list" class="mb-16">
      <h2 v-if="pageData.legal_acts_title" class="text-3xl font-bold text-gray-900 mb-8 font-headline">
        {{ $i18n.locale === 'ka' ? pageData.legal_acts_title.ka : pageData.legal_acts_title.en }}
      </h2>
      
      <div v-if="pageData.legal_acts_list && pageData.legal_acts_list.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(act, index) in pageData.legal_acts_list" :key="index" 
             :class="['rounded-2xl p-8 border', index % 2 === 0 ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200' : 'bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200']">
          <div :class="['w-12 h-12 rounded-full flex items-center justify-center mb-4', index % 2 === 0 ? 'bg-primary-500' : 'bg-secondary-500']">
            <div class="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3 font-headline">
            {{ $i18n.locale === 'ka' ? act.title.ka : act.title.en }}
          </h3>
          <p v-if="act.date" class="text-gray-700 mb-4 leading-relaxed">
            {{ new Date(act.date).toLocaleDateString('ka-GE') }}
          </p>
          <a v-if="act.file" :href="act.file" target="_blank" 
             :class="['font-semibold flex items-center hover:underline', index % 2 === 0 ? 'text-primary-700 hover:text-primary-800' : 'text-secondary-700 hover:text-secondary-800']">
            ჩამოტვირთვა
            <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Dynamic Regulations -->
    <section v-if="pageData.regulations_title || pageData.regulations_list" class="mb-16">
      <h2 v-if="pageData.regulations_title" class="text-3xl font-bold text-gray-900 mb-8 font-headline">
        {{ $i18n.locale === 'ka' ? pageData.regulations_title.ka : pageData.regulations_title.en }}
      </h2>
      
      <div v-if="pageData.regulations_list && pageData.regulations_list.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(regulation, index) in pageData.regulations_list" :key="index" class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <div class="w-6 h-6 border-2 border-primary-500 rounded-full"></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2 font-headline">
            {{ $i18n.locale === 'ka' ? regulation.title.ka : regulation.title.en }}
          </h3>
          <p v-if="regulation.date" class="text-gray-600 mb-4 text-sm">
            {{ new Date(regulation.date).toLocaleDateString('ka-GE') }}
          </p>
          <a v-if="regulation.file" :href="regulation.file" target="_blank" class="text-primary-600 hover:text-primary-700 font-medium flex items-center">
            ჩამოტვირთვა
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Dynamic Additional Info -->
    <section v-if="pageData.additional_info_title || pageData.additional_info_content" class="bg-gray-50 rounded-3xl p-8 lg:p-12">
      <div class="max-w-3xl mx-auto text-center">
        <h2 v-if="pageData.additional_info_title" class="text-3xl font-bold text-gray-900 mb-4 font-headline">
          {{ $i18n.locale === 'ka' ? pageData.additional_info_title.ka : pageData.additional_info_title.en }}
        </h2>
        <div v-if="pageData.additional_info_content" 
             class="text-xl text-gray-600 mb-8"
             v-html="$i18n.locale === 'ka' ? pageData.additional_info_content.ka : pageData.additional_info_content.en">
        </div>
        <RouterLink
          v-if="pageData.additional_info_button_url && pageData.additional_info_button_text"
          :to="pageData.additional_info_button_url"
          class="inline-flex items-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline"
        >
          {{ $i18n.locale === 'ka' ? pageData.additional_info_button_text.ka : pageData.additional_info_button_text.en }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { usePagesStore } from '../../stores/pages'

const { locale } = useI18n()
const pagesStore = usePagesStore()

const pageData = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // Fetch acts page data by slug
    const response = await pagesStore.fetchPageBySlug('resources/acts')
    if (response) {
      pageData.value = response
    } else {
      error.value = 'Acts page not found'
    }
  } catch (err: any) {
    console.error('Failed to load acts page:', err)
    error.value = err.message || 'Failed to load page'
  } finally {
    loading.value = false
  }
})
</script>