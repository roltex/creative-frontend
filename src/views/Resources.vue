<template>
  <div class="container-fluid py-8 lg:py-8">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-headline">
        {{ $t('resources.title') }}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {{ $t('resources.subtitle') }}
      </p>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
      <!-- FAQs Card -->
      <RouterLink 
        to="/faqs"
        class="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 group block"
      >
        <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <div class="w-6 h-6 border-2 border-secondary-500 rounded-full"></div>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3 font-headline">{{ $t('resources.faqsCard') }}</h2>
        <p class="text-gray-600 mb-4">
          {{ $t('resources.faqsCardDesc') }}
        </p>
        <div class="flex items-center text-secondary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
          {{ $t('resources.seeMore') }}
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </RouterLink>

      <!-- Acts & Regulations Card -->
      <RouterLink 
        to="/resources/acts"
        class="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 group block"
      >
        <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <div class="w-6 h-6 bg-secondary-500 rounded-full"></div>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3 font-headline">{{ $t('resources.actsCard') }}</h2>
        <p class="text-gray-600 mb-4">
          {{ $t('resources.actsCardDesc') }}
        </p>
        <div class="flex items-center text-secondary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
          {{ $t('resources.seeMore') }}
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
