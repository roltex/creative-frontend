<template>
  <div class="container-fluid py-8 lg:py-8">
    <!-- Loading State - Skeleton Loader -->
    <div v-if="loading">
      <!-- Hero Section Skeleton -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div class="relative h-96 lg:h-[500px]">
          <div class="absolute inset-0 skeleton"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <!-- Content Overlay Skeleton -->
          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div class="max-w-4xl">
              <div class="skeleton h-8 w-32 mb-4 bg-white/20"></div>
              <div class="skeleton h-12 w-3/4 mb-4 bg-white/20"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Content with Sidebar Skeleton -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content Skeleton -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
            <div class="skeleton h-10 w-64 mb-6"></div>
            <div class="space-y-4">
              <div class="skeleton h-4 w-full"></div>
              <div class="skeleton h-4 w-full"></div>
              <div class="skeleton h-4 w-5/6"></div>
              <div class="skeleton h-4 w-full"></div>
              <div class="skeleton h-4 w-4/5"></div>
            </div>
          </div>
        </div>

        <!-- Sidebar Skeleton -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-3xl shadow-lg p-6">
            <div class="skeleton h-7 w-32 mb-4"></div>
            <div class="space-y-4">
              <!-- Date & Time Skeleton -->
              <div>
                <div class="skeleton h-4 w-24 mb-2"></div>
                <div class="ml-6 space-y-2">
                  <div class="skeleton h-5 w-48"></div>
                  <div class="skeleton h-4 w-20"></div>
                </div>
              </div>
              
              <!-- Location Skeleton -->
              <div class="pt-4 border-t border-gray-200">
                <div class="skeleton h-4 w-20 mb-2"></div>
                <div class="ml-6">
                  <div class="skeleton h-5 w-40 mb-3"></div>
                  <!-- Map Skeleton -->
                  <div class="skeleton h-[200px] w-full rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <RouterLink
        :to="{ name: 'events' }"
        class="inline-flex items-center text-primary-600 hover:text-primary-700"
      >
        <ChevronLeft class="w-5 h-5 mr-2" />
        <span>{{ $t('common.back') }}</span>
      </RouterLink>
    </div>

    <!-- Event Details -->
    <div v-else>
      <!-- Hero Section -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div class="relative h-96 lg:h-[500px]">
          <img
            :src="getImageUrl(event.image)"
            :alt="event.title[$i18n.locale as 'ka' | 'en']"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <!-- Content Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
            <div class="max-w-4xl">
              <div class="flex items-center gap-3 mb-4">
                <span class="px-4 py-2 bg-secondary-500 rounded-full text-sm font-semibold">
                  {{ getEventType(event.type) }}
                </span>
              </div>
              <h1 class="text-4xl lg:text-5xl font-bold mb-4 font-headline">
                {{ event.title[$i18n.locale as 'ka' | 'en'] }}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Content with Sidebar -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Full Description -->
          <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-6 font-headline">{{ $t('events.fullDescription') }}</h2>
            <div class="prose prose-lg max-w-none text-gray-700">
              <div class="leading-relaxed mb-4" v-html="event.description[$i18n.locale as 'ka' | 'en']"></div>
              <div v-if="event.details" class="leading-relaxed" v-html="event.details[$i18n.locale as 'ka' | 'en']"></div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Quick Info -->
          <div class="bg-white rounded-3xl shadow-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4 font-headline">ინფორმაცია</h3>
            <div class="space-y-4">
              <!-- Date & Time -->
              <div>
                <p class="text-sm text-gray-600 mb-1 flex items-center">
                  <Calendar class="w-4 h-4 mr-2" />
                  {{ $t('events.dateTime') }}
                </p>
                <div class="ml-6">
                  <p v-if="formatDate(event.startAt)" class="text-base font-semibold text-gray-900 mb-1">{{ formatDate(event.startAt) }}</p>
                  <p v-if="formatTime(event.startAt)" class="text-sm text-gray-600">{{ formatTime(event.startAt) }}</p>
                </div>
              </div>
              
              <!-- Location -->
              <div class="pt-4 border-t border-gray-200">
                <p class="text-sm text-gray-600 mb-1 flex items-center">
                  <MapPin class="w-4 h-4 mr-2" />
                  {{ $t('events.location') }}
                </p>
                <p class="text-base font-semibold text-gray-900 ml-6 mb-3">
                  {{ typeof event.location === 'string' ? event.location : (event.location?.[$i18n.locale as 'ka' | 'en'] || event.location?.ka || event.location?.en || '') }}
                </p>
                
                <!-- Google Map -->
                <div class="mt-3 ml-6 rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    :src="getMapUrl(typeof event.location === 'string' ? event.location : (event.location?.[$i18n.locale as 'ka' | 'en'] || event.location?.ka || event.location?.en || ''))"
                    width="100%"
                    height="200"
                    style="border:0;"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
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
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Calendar, MapPin, ChevronLeft } from 'lucide-vue-next'
import { format } from 'date-fns'
import { ka, enUS } from 'date-fns/locale'
import { getImageUrl } from '../../utils/imageUrl'
import { useEventsStore } from '../../stores/events'
import type { Event } from '../../types'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const eventsStore = useEventsStore()

const event = ref<Event | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const getEventType = (type: string) => {
  const types: { [key: string]: string } = {
    workshop: 'ვორქშოპი',
    exhibition: 'გამოფენა',
    conference: 'კონფერენცია',
    other: 'ღონისძიება'
  }
  return types[type] || 'ღონისძიება'
}

const formatDate = (date: string | null | undefined) => {
  if (!date) return ''
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) return ''
    return format(dateObj, 'EEEE, d MMMM yyyy', { locale: locale.value === 'ka' ? ka : enUS })
  } catch {
    return ''
  }
}

const formatTime = (date: string | null | undefined) => {
  if (!date) return ''
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) return ''
    return format(dateObj, 'HH:mm')
  } catch {
    return ''
  }
}

const getMapUrl = (location: string) => {
  // Encode the location for Google Maps embed with marker
  const encodedLocation = encodeURIComponent(location)
  return `https://maps.google.com/maps?q=${encodedLocation}&t=&z=15&ie=UTF8&iwloc=&output=embed`
}

onMounted(async () => {
  const slug = route.params.slug as string
  loading.value = true
  error.value = null
  
  try {
    const fetchedEvent = await eventsStore.fetchEventBySlug(slug)
    if (fetchedEvent) {
      event.value = fetchedEvent
    } else {
      error.value = 'Event not found'
      router.push({ name: 'events' })
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to load event'
    console.error('Error loading event:', err)
  } finally {
    loading.value = false
  }
})
</script>

