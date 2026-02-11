<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <!-- Image Skeleton -->
      <div class="bg-gray-200 w-full" style="aspect-ratio: 16/9;"></div>
      <!-- Content Skeleton -->
      <div class="container-fluid -mt-12 lg:-mt-20 relative z-10">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div class="flex gap-3 mb-6">
              <div class="h-8 bg-gray-200 rounded-full w-28"></div>
              <div class="h-8 bg-gray-200 rounded-full w-24"></div>
            </div>
            <div class="space-y-3 mb-8">
              <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
              <div class="h-10 bg-gray-200 rounded-lg w-3/4"></div>
            </div>
            <div class="flex flex-wrap gap-6 mb-8">
              <div class="h-12 bg-gray-200 rounded-xl w-48"></div>
              <div class="h-12 bg-gray-200 rounded-xl w-48"></div>
            </div>
            <div class="h-14 bg-gray-200 rounded-full w-56"></div>
          </div>
          <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12 mt-6">
            <div class="h-8 bg-gray-200 rounded-lg w-64 mb-6"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container-fluid text-center py-20">
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
      <!-- Full-bleed Image -->
      <div class="relative bg-gray-100">
        <img
          v-if="competition.image"
          :src="getImageUrl(competition.image)"
          :alt="competition.title[$i18n.locale as 'ka' | 'en']"
          class="w-full max-h-[75vh] object-contain mx-auto block"
        />
        <div v-else class="w-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100" style="aspect-ratio: 16/10;">
          <Trophy class="w-32 h-32 text-primary-300" />
        </div>
        <!-- Subtle bottom fade for overlap effect -->
        <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <!-- Overlapping Content Card -->
      <div class="container-fluid -mt-12 lg:-mt-20 relative z-10 pb-8 lg:pb-12">
        <div class="max-w-4xl mx-auto">
          <!-- Main Info Card -->
          <div class="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <!-- Badges -->
            <div class="flex flex-wrap items-center gap-3 mb-5">
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
            <h1 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-8 font-headline leading-tight">
              {{ competition.title[$i18n.locale as 'ka' | 'en'] }}
            </h1>

            <!-- Date chips -->
            <div class="flex flex-wrap items-center gap-4 mb-8">
              <div
                v-if="(competition as any).start_date || competition.startDate"
                class="flex items-center gap-3 bg-primary-50 rounded-2xl px-5 py-3"
              >
                <div class="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Calendar class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p class="text-xs text-primary-600 font-medium uppercase tracking-wide">{{ $t('competitions.startDate') }}</p>
                  <p class="text-base font-bold text-gray-900">{{ formatDate((competition as any).start_date || competition.startDate, locale) }}</p>
                </div>
              </div>

              <!-- Separator arrow -->
              <ChevronRight
                v-if="((competition as any).start_date || competition.startDate) && ((competition as any).end_date || competition.endDate)"
                class="w-5 h-5 text-gray-300 hidden sm:block"
              />

              <div
                v-if="(competition as any).end_date || competition.endDate"
                class="flex items-center gap-3 bg-red-50 rounded-2xl px-5 py-3"
              >
                <div class="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <Calendar class="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p class="text-xs text-red-500 font-medium uppercase tracking-wide">{{ $t('competitions.endDate') }}</p>
                  <p class="text-base font-bold text-gray-900">{{ formatDate((competition as any).end_date || competition.endDate, locale) }}</p>
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

          <!-- Description Section -->
          <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12 mt-6">
            <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 font-headline">{{ $t('competitions.fullDescription') }}</h2>
            <div 
              class="prose prose-lg max-w-none text-gray-700"
              v-html="competition.description[$i18n.locale as 'ka' | 'en']"
            ></div>
          </div>

          <!-- CTA Section -->
          <div class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 lg:p-12 text-white text-center mt-6">
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

