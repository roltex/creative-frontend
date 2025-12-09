<template>
  <div>
    <!-- Loading State -->
    <div v-if="!initialized" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="i in limit || 4" :key="i" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="skeleton h-64"></div>
        <div class="p-6 space-y-3">
          <div class="skeleton h-6 w-3/4"></div>
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-2/3"></div>
        </div>
      </div>
    </div>

    <!-- Events Grid -->
    <div v-else-if="displayedEvents?.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <EventsCalendarCard
        v-for="dateGroup in displayedEvents"
        :key="dateGroup.date"
        :events="dateGroup.events"
        :start-index="0"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-white rounded-2xl">
      <Calendar class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('common.noResults') }}</h3>
      <p class="text-gray-600">No upcoming events at the moment.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Calendar } from 'lucide-vue-next'
import { format } from 'date-fns'
import { useEventsStore } from '../../stores/events'
import EventsCalendarCard from './EventsCalendarCard.vue'
import type { Event } from '../../types'

interface Props {
  limit?: number
  type?: string
}

const props = defineProps<Props>()
const eventsStore = useEventsStore()

const { events, initialized } = eventsStore

const displayedEvents = computed(() => {
  let filtered = events || []
  
  if (props.type) {
    filtered = filtered.filter(e => e.type === props.type)
  }
  
  // Group events by date
  const groupedByDate: { [key: string]: { date: string; events: Event[]; firstIndex: number } } = {}
  
  filtered.forEach((event, index) => {
    const dateKey = format(new Date(event.startAt), 'yyyy-MM-dd')
    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = {
        date: dateKey,
        events: [],
        firstIndex: index
      }
    }
    groupedByDate[dateKey].events.push(event)
  })
  
  // Convert to array of unique dates
  const uniqueDates = Object.values(groupedByDate)
  
  // Apply limit to unique dates (not individual events)
  if (props.limit) {
    return uniqueDates.slice(0, props.limit)
  }
  
  return uniqueDates
})
</script>

