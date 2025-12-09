<template>
  <div>
    <!-- Loading State -->
    <div v-if="!initialized" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-white rounded-2xl shadow-lg">
        <div class="h-48 skeleton"></div>
        <div class="p-6 space-y-3">
          <div class="skeleton h-4 w-20"></div>
          <div class="skeleton h-6 w-full"></div>
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-1/3"></div>
        </div>
      </div>
    </div>

    <!-- Events Grid -->
    <div v-else-if="filteredEvents?.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 bg-white rounded-2xl shadow-lg">
      <Calendar class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('events.noEvents') }}</h3>
      <p class="text-gray-600">{{ $t('events.noEventsDescription') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, ref } from 'vue'
import { Calendar } from 'lucide-vue-next'
import { isSameDay } from 'date-fns'
import { useEventsStore } from '../../stores/events'
import type { Event } from '../../types'
import EventCard from './EventCard.vue'

interface Props {
  filteredDate?: Date | null
}

const props = defineProps<Props>()
const eventsStore = useEventsStore()

const events = computed(() => eventsStore.events)
const initialized = computed(() => eventsStore.initialized)
const loading = computed(() => eventsStore.loading)
const calendarEvents = ref<Event[]>([])

// Watch for date selection and fetch calendar events for that month
watch(() => props.filteredDate, async (newDate) => {
  if (newDate) {
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()
    try {
      const monthEvents = await eventsStore.fetchCalendar(month, year)
      calendarEvents.value = monthEvents || []
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      calendarEvents.value = []
    }
  } else {
    calendarEvents.value = []
  }
}, { immediate: true })

const filteredEvents = computed(() => {
  // If a date is selected, use calendar events for that month
  // Otherwise, use the main events store
  const sourceEvents = props.filteredDate ? calendarEvents.value : (events.value || [])
  
  if (props.filteredDate) {
    return sourceEvents.filter(event => {
      if (!event.startAt) return false
      try {
        const eventDate = new Date(event.startAt)
        return isSameDay(eventDate, props.filteredDate!)
      } catch {
        return false
      }
    })
  }
  
  return sourceEvents
})

onMounted(async () => {
  if (!initialized.value) {
    await eventsStore.fetchEvents()
  }
})
</script>

