<template>
  <div class="container-fluid py-8 lg:py-10">
    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div class="flex flex-col lg:flex-row">
          <div class="w-full lg:w-[30%] bg-gray-200 min-h-[280px] lg:min-h-[360px]"></div>
          <div class="w-full lg:w-[70%] p-8 lg:p-10 space-y-5">
            <div class="flex gap-3">
              <div class="h-7 bg-gray-200 rounded-full w-28"></div>
              <div class="h-7 bg-gray-200 rounded-full w-24"></div>
            </div>
            <div class="space-y-3">
              <div class="h-9 bg-gray-200 rounded-lg w-full"></div>
              <div class="h-9 bg-gray-200 rounded-lg w-3/4"></div>
            </div>
            <div class="flex gap-4">
              <div class="h-14 bg-gray-200 rounded-2xl w-48"></div>
              <div class="h-14 bg-gray-200 rounded-2xl w-48"></div>
            </div>
            <div class="h-13 bg-gray-200 rounded-full w-52"></div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
        <div class="h-8 bg-gray-200 rounded-lg w-64 mb-6"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
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
      <!-- Hero Card: 30% Image | 70% Info -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div class="flex flex-col lg:flex-row">
          <!-- Image — 30% -->
          <div class="w-full lg:w-[30%] bg-gray-50 flex-shrink-0 flex items-center justify-center p-4 lg:p-6">
            <img
              v-if="competition.image"
              :src="getImageUrl(competition.image)"
              :alt="competition.title[$i18n.locale as 'ka' | 'en']"
              class="w-full h-auto object-contain rounded-2xl"
            />
            <div v-else class="w-full min-h-[280px] flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
              <Trophy class="w-24 h-24 text-primary-300" />
            </div>
          </div>

          <!-- Info — 70% -->
          <div class="w-full lg:w-[70%] p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
            <!-- Badges -->
            <div class="flex flex-wrap items-center gap-2.5 mb-5">
              <span v-if="competition.category" class="px-4 py-1.5 bg-secondary-50 text-secondary-700 border border-secondary-200 rounded-full text-sm font-semibold">
                {{ competition.category }}
              </span>
              <span v-if="competition.status === 'current'" class="px-4 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-semibold flex items-center gap-1.5">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {{ $t('competitions.current') }}
              </span>
              <span v-if="competition.status === 'completed'" class="px-4 py-1.5 bg-gray-100 text-gray-600 border border-gray-200 rounded-full text-sm font-semibold">
                {{ $t('competitions.completed') }}
              </span>
              <span v-if="competition.status === 'upcoming'" class="px-4 py-1.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-full text-sm font-semibold">
                {{ $t('competitions.upcoming') }}
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 font-headline leading-tight">
              {{ competition.title[$i18n.locale as 'ka' | 'en'] }}
            </h1>

            <!-- Dates -->
            <div class="flex flex-wrap items-center gap-4 mb-8">
              <div
                v-if="(competition as any).start_date || competition.startDate"
                class="flex items-center gap-3 bg-primary-50 rounded-2xl px-4 py-2.5"
              >
                <div class="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Calendar class="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p class="text-xs text-primary-600 font-medium uppercase tracking-wide">{{ $t('competitions.startDate') }}</p>
                  <p class="text-sm font-bold text-gray-900">{{ formatDate((competition as any).start_date || competition.startDate, locale) }}</p>
                </div>
              </div>

              <ChevronRight
                v-if="((competition as any).start_date || competition.startDate) && ((competition as any).end_date || competition.endDate)"
                class="w-5 h-5 text-gray-300 hidden sm:block"
              />

              <div
                v-if="(competition as any).end_date || competition.endDate"
                class="flex items-center gap-3 bg-red-50 rounded-2xl px-4 py-2.5"
              >
                <div class="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                  <Calendar class="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p class="text-xs text-red-500 font-medium uppercase tracking-wide">{{ $t('competitions.endDate') }}</p>
                  <p class="text-sm font-bold text-gray-900">{{ formatDate((competition as any).end_date || competition.endDate, locale) }}</p>
                </div>
              </div>
            </div>

            <!-- Apply Button -->
            <div v-if="competition.status === 'current'">
              <RouterLink
                :to="{ name: 'application-step-1' }"
                class="inline-flex items-center px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transform hover:scale-[1.02] font-headline text-lg"
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
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 font-headline">{{ $t('competitions.fullDescription') }}</h2>
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

