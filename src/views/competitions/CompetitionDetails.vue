<template>
  <div class="container-fluid py-8 lg:py-8">
    <!-- Loading State - Skeleton Loader -->
    <div v-if="loading" class="animate-pulse">
      <!-- Back Button Skeleton -->
      <div class="mb-8">
        <div class="h-6 bg-gray-200 rounded w-24"></div>
      </div>

      <!-- Hero Section Skeleton -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div class="relative h-96 lg:h-[500px] bg-gray-200">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div class="max-w-4xl">
              <!-- Badges Skeleton -->
              <div class="flex items-center gap-3 mb-4">
                <div class="h-8 bg-gray-300 rounded-full w-32"></div>
                <div class="h-8 bg-gray-300 rounded-full w-24"></div>
              </div>
              <!-- Title Skeleton -->
              <div class="h-12 bg-gray-300 rounded-lg mb-4 max-w-2xl"></div>
              <!-- Description Skeleton -->
              <div class="space-y-2">
                <div class="h-4 bg-gray-300 rounded w-full"></div>
                <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                <div class="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid Skeleton -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content Skeleton -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Full Description Section Skeleton -->
          <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
            <div class="h-8 bg-gray-200 rounded-lg w-64 mb-6"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>

          <!-- CTA Section Skeleton -->
          <div class="bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl p-8 lg:p-12">
            <div class="h-10 bg-gray-300 rounded-lg w-64 mx-auto mb-4"></div>
            <div class="h-6 bg-gray-300 rounded-lg w-96 mx-auto mb-8"></div>
            <div class="h-12 bg-gray-300 rounded-full w-48 mx-auto"></div>
          </div>
        </div>

        <!-- Sidebar Skeleton -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-3xl shadow-lg p-6">
            <div class="h-7 bg-gray-200 rounded-lg w-32 mb-4"></div>
            <div class="space-y-4">
              <div>
                <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div class="ml-6 space-y-2">
                  <div class="h-3 bg-gray-200 rounded w-32"></div>
                  <div class="h-5 bg-gray-200 rounded w-40"></div>
                  <div class="h-3 bg-gray-200 rounded w-28 mt-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-40"></div>
                </div>
              </div>
            </div>
          </div>
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
      <!-- Hero Section -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div class="relative h-96 lg:h-[500px]">
          <img
            v-if="competition.image"
            :src="getImageUrl(competition.image)"
            :alt="competition.title[$i18n.locale as 'ka' | 'en']"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
            <Trophy class="w-32 h-32 text-primary-500" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <!-- Content Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
            <div class="max-w-4xl">
              <div class="flex items-center gap-3 mb-4">
                <span class="px-4 py-2 bg-secondary-500 rounded-full text-sm font-semibold">
                  {{ competition.category }}
                </span>
                <span v-if="competition.status === 'current'" class="px-4 py-2 bg-green-500 rounded-full text-sm font-semibold">
                  {{ $t('competitions.current') }}
                </span>
                <span v-if="competition.status === 'completed'" class="px-4 py-2 bg-gray-500 rounded-full text-sm font-semibold">
                  {{ $t('competitions.completed') }}
                </span>
              </div>
              <h1 class="text-4xl lg:text-5xl font-bold mb-4 font-headline">
                {{ competition.title[$i18n.locale as 'ka' | 'en'] }}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Competition Content with Sidebar -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Full Description -->
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

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Quick Info -->
          <div class="bg-white rounded-3xl shadow-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4 font-headline">ინფორმაცია</h3>
            <div class="space-y-4">
              <!-- Deadlines -->
              <div>
                <p class="text-sm text-gray-600 mb-1 flex items-center">
                  <Calendar class="w-4 h-4 mr-2" />
                  {{ $t('competitions.dates') }}
                </p>
                <div class="ml-6">
                  <p v-if="(competition as any).start_date || competition.startDate" class="text-sm text-gray-600 mb-1">{{ $t('competitions.startDate') }}</p>
                  <p v-if="(competition as any).start_date || competition.startDate" class="text-base font-semibold text-gray-900 mb-2">{{ formatDate((competition as any).start_date || competition.startDate, locale) }}</p>
                  <p v-if="(competition as any).end_date || competition.endDate" class="text-sm text-gray-600 mb-1">{{ $t('competitions.endDate') }}</p>
                  <p v-if="(competition as any).end_date || competition.endDate" class="text-base font-semibold text-gray-900">{{ formatDate((competition as any).end_date || competition.endDate, locale) }}</p>
                </div>
              </div>
            </div>
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

