<template>
  <div class="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
    <!-- Event Image with Overlay -->
    <div class="relative h-64 overflow-hidden">
      <img
        :src="getImageUrl(currentEvent.image)"
        :alt="currentEvent.title[$i18n.locale as 'ka' | 'en']"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      
      <!-- Date and Time Badge -->
      <div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-900 font-headline">{{ getDay((currentEvent as any).start_date || currentEvent.startAt) }}</div>
          <div class="text-xs uppercase text-gray-600 font-medium tracking-wide">{{ getMonth((currentEvent as any).start_date || currentEvent.startAt) }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ getTime((currentEvent as any).start_date || currentEvent.startAt) }}</div>
        </div>
      </div>

      <!-- Event Type Badge -->
      <div class="absolute top-4 right-4">
        <span class="px-3 py-1.5 bg-secondary-500 text-white text-xs font-semibold rounded-full shadow-md">
          {{ getEventType(currentEvent.type) }}
        </span>
      </div>

      <!-- Rotating Indicator Dots (if multiple events) -->
      <div v-if="eventsForDate.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div
          v-for="(event, index) in eventsForDate"
          :key="event.id"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="currentIndex === index ? 'bg-white w-6' : 'bg-white/50'"
        ></div>
      </div>
    </div>

    <!-- Event Content -->
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 font-headline group-hover:text-primary-600 transition-colors">
        {{ currentEvent.title[$i18n.locale as 'ka' | 'en'] }}
      </h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ stripHtml(currentEvent.description[$i18n.locale as 'ka' | 'en']) }}
      </p>
      
      <!-- Event Details -->
      <div class="flex flex-wrap items-center gap-3 text-sm">
        <div class="flex items-center text-gray-600">
          <MapPin class="w-4 h-4 mr-1" />
          <span>{{ currentEvent.location }}</span>
        </div>
        <div v-if="currentEvent.capacity" class="flex items-center text-gray-600">
          <Users class="w-4 h-4 mr-1" />
          <span>{{ currentEvent.capacity }}</span>
        </div>
        <div class="ml-auto">
          <span :class="[
            'px-3 py-1 rounded-full text-xs font-semibold',
            currentEvent.price ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          ]">
            {{ currentEvent.price ? `₾${currentEvent.price}` : $t('events.free') }}
          </span>
        </div>
      </div>

      <!-- Action Button -->
      <div class="mt-5">
        <RouterLink 
          :to="{ name: 'event-details', params: { slug: currentEvent.slug || currentEvent.id } }"
          class="block w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-full font-medium transition-colors duration-200 text-sm font-headline text-center"
        >
          {{ $t('events.register') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { MapPin, Users } from 'lucide-vue-next'
import { format } from 'date-fns'
import { getImageUrl, stripHtml } from '../../utils/imageUrl'
import type { Event } from '../../types'

interface Props {
  events: Event[]
  startIndex?: number
}

const props = defineProps<Props>()
const { } = useI18n()

const currentIndex = ref(0)
let intervalId: number | null = null

// Events are already grouped by date, so just use them directly
const eventsForDate = computed(() => {
  return props.events || []
})

const currentEvent = computed(() => {
  return eventsForDate.value[currentIndex.value] || eventsForDate.value[0]
})

const getDay = (date: string | null | undefined) => {
  if (!date) return ''
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    return format(d, 'dd')
  } catch { return '' }
}

const getMonth = (date: string | null | undefined) => {
  if (!date) return ''
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    return format(d, 'MMM')
  } catch { return '' }
}

const getTime = (date: string | null | undefined) => {
  if (!date) return ''
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    return format(d, 'HH:mm')
  } catch { return '' }
}

const getEventType = (type: string) => {
  const types: { [key: string]: string } = {
    workshop: 'ვორქშოპი',
    exhibition: 'გამოფენა',
    conference: 'კონფერენცია',
    other: 'ღონისძიება'
  }
  return types[type] || 'ღონისძიება'
}

// Auto-rotate if multiple events
onMounted(() => {
  if (eventsForDate.value.length > 1) {
    intervalId = window.setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % eventsForDate.value.length
    }, 4000) // Rotate every 4 seconds
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

