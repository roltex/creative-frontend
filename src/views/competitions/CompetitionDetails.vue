<template>
  <div class="container-fluid py-8 lg:py-8">
    <!-- Loading State - Skeleton Loader -->
    <div v-if="loading" class="animate-pulse">
      <!-- Header Skeleton -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-0">
          <div class="lg:col-span-3 bg-gray-200 min-h-[300px] lg:min-h-[400px]"></div>
          <div class="lg:col-span-2 p-8 lg:p-10 space-y-6">
            <div class="flex gap-3">
              <div class="h-8 bg-gray-200 rounded-full w-28"></div>
              <div class="h-8 bg-gray-200 rounded-full w-24"></div>
            </div>
            <div class="space-y-3">
              <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
              <div class="h-10 bg-gray-200 rounded-lg w-3/4"></div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="h-5 w-5 bg-gray-200 rounded"></div>
                <div class="space-y-1">
                  <div class="h-3 bg-gray-200 rounded w-20"></div>
                  <div class="h-5 bg-gray-200 rounded w-36"></div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="h-5 w-5 bg-gray-200 rounded"></div>
                <div class="space-y-1">
                  <div class="h-3 bg-gray-200 rounded w-20"></div>
                  <div class="h-5 bg-gray-200 rounded w-36"></div>
                </div>
              </div>
            </div>
            <div class="h-14 bg-gray-200 rounded-full w-full"></div>
          </div>
        </div>
      </div>

      <!-- Description Skeleton -->
      <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12 mb-8">
        <div class="h-8 bg-gray-200 rounded-lg w-64 mb-6"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('common.error') }}</h2>
      <p class="text-gray-600 mb-6">{{ error }}</p>
      <RouterLink
        :to="{ name: 'competitions' }"
        class="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
      >
        <ChevronLeft class="w-5 h-5 mr-2" />
        <span>{{ $t('common.back') }}</span>
      </RouterLink>
    </div>

    <!-- Competition Details -->
    <div v-else-if="competition">
      <!-- Header: Image + Info Side by Side -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-0">
          <!-- Image Section - takes natural ratio -->
          <div class="lg:col-span-3 bg-gray-100">
            <img
              v-if="competition.image"
              :src="getImageUrl(competition.image)"
              :alt="competition.title[$i18n.locale as 'ka' | 'en']"
              class="w-full h-full object-contain"
            />
            <div v-else class="w-full h-full min-h-[300px] flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
              <Trophy class="w-32 h-32 text-primary-500" />
            </div>
          </div>

          <!-- Info Section -->
          <div class="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <!-- Badges -->
              <div class="flex flex-wrap items-center gap-3 mb-6">
                <span v-if="competition.category" class="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-semibold">
                  {{ competition.category }}
                </span>
                <span v-if="competition.status === 'current'" class="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {{ $t('competitions.current') }}
                </span>
                <span v-if="competition.status === 'completed'" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
                  {{ $t('competitions.completed') }}
                </span>
                <span v-if="competition.status === 'upcoming'" class="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  {{ $t('competitions.upcoming') }}
                </span>
              </div>

              <!-- Title -->
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-headline leading-tight">
                {{ competition.title[$i18n.locale as 'ka' | 'en'] }}
              </h1>

              <!-- Dates -->
              <div class="space-y-3 mb-6">
                <div v-if="(competition as any).start_date || competition.startDate" class="flex items-center text-gray-600">
                  <Calendar class="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" />
                  <div>
                    <span class="text-sm text-gray-500">{{ $t('competitions.startDate') }}</span>
                    <p class="font-semibold text-gray-900">{{ formatDate((competition as any).start_date || competition.startDate, locale) }}</p>
                  </div>
                </div>
                <div v-if="(competition as any).end_date || competition.endDate" class="flex items-center text-gray-600">
                  <Calendar class="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                  <div>
                    <span class="text-sm text-gray-500">{{ $t('competitions.endDate') }}</span>
                    <p class="font-semibold text-gray-900">{{ formatDate((competition as any).end_date || competition.endDate, locale) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Apply Button -->
            <div v-if="competition.status === 'current'">
              <RouterLink
                :to="{ name: 'application-step-1' }"
                class="inline-flex items-center justify-center w-full px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-headline text-lg"
              >
                <span>{{ $t('competitions.apply') }}</span>
                <ChevronRight class="w-5 h-5 ml-2" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Description Section -->
      <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12 mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 font-headline">{{ $t('competitions.fullDescription') }}</h2>
        <div 
          class="prose prose-lg max-w-none text-gray-700"
          v-html="competition.description[$i18n.locale as 'ka' | 'en']"
        ></div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 lg:p-12 text-white text-center">
        <h2 class="text-3xl font-bold mb-4 font-headline">{{ $t('competitions.applyNow') }}</h2>
        <p class="text-xl opacity-90 mb-8">{{ $t('competitions.fillApplicationAndParticipate') }}</p>
        <RouterLink
          :to="{ name: 'application-step-1' }"
          class="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline"
        >
          <span>{{ $t('competitions.apply') }}</span>
          <ChevronRight class="w-5 h-5 ml-2" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Calendar, Trophy, ChevronRight, ChevronLeft } from 'lucide-vue-next'
import { getImageUrl } from '../../utils/imageUrl'
import { formatLongDate as formatDate } from '../../utils/dateFormat'
import { useCompetitionsStore } from '../../stores/competitions'
import type { Competition } from '../../types'

const route = useRoute()
const { locale } = useI18n()
const competitionsStore = useCompetitionsStore()

const competition = ref<Competition | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const slug = route.params.slug as string
  
  loading.value = true
  error.value = null
  
  try {
    // Fetch competition by slug from API
    const fetchedCompetition = await competitionsStore.fetchCompetitionBySlug(slug)
    if (fetchedCompetition) {
      competition.value = fetchedCompetition
    } else {
      error.value = 'Competition not found'
    }
  } catch (err: any) {
    console.error('Failed to load competition:', err)
    error.value = err.message || 'Failed to load competition'
  } finally {
    loading.value = false
  }
})
</script>

