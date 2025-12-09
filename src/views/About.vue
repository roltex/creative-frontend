<template>
  <div class="container-fluid py-8 lg:py-8">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-headline">
        {{ $t('about.title') }}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {{ $t('about.subtitle') }}
      </p>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <!-- Mission Card -->
      <RouterLink 
        to="/about/mission"
        class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 lg:p-12 hover:shadow-xl transition-all duration-300 group block"
      >
        <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <div class="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4 font-headline">{{ $t('about.missionVision') }}</h2>
        <p class="text-gray-700 leading-relaxed text-lg mb-4">
          {{ $t('about.missionVisionDesc') }}
        </p>
        <div class="flex items-center text-primary-700 font-medium group-hover:translate-x-2 transition-transform duration-300">
          {{ $t('about.learnMore') }}
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </RouterLink>

      <!-- Reports Card -->
      <RouterLink 
        to="/about/reports"
        class="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-3xl p-8 lg:p-12 hover:shadow-xl transition-all duration-300 group block"
      >
        <div class="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <div class="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4 font-headline">{{ $t('about.reportsStrategy') }}</h2>
        <p class="text-gray-700 leading-relaxed text-lg mb-4">
          {{ $t('about.reportsStrategyDesc') }}
        </p>
        <div class="flex items-center text-secondary-700 font-medium group-hover:translate-x-2 transition-transform duration-300">
          {{ $t('about.learnMore') }}
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </RouterLink>
    </div>

    <!-- Stats Section -->
    <section class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 lg:p-12 text-white">
      <h2 class="text-3xl font-bold mb-8 text-center font-headline">{{ $t('about.achievementsTitle') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="text-5xl font-bold mb-2 font-headline">1000+</div>
          <div class="text-xl opacity-90">{{ $t('about.achievements.supportedProjects') }}</div>
        </div>
        <div class="text-center">
          <div class="text-5xl font-bold mb-2 font-headline">500+</div>
          <div class="text-xl opacity-90">{{ $t('about.achievements.successfulCreators') }}</div>
        </div>
        <div class="text-center">
          <div class="text-5xl font-bold mb-2 font-headline">50M+</div>
          <div class="text-xl opacity-90">{{ $t('about.achievements.funding') }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
