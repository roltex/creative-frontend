<template>
  <div class="bg-white rounded-2xl shadow-lg p-6">
    <!-- Calendar Header -->
    <div class="flex items-center justify-between mb-6">
      <button
        @click="previousMonth"
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft class="w-5 h-5 text-gray-600" />
      </button>
      
      <h2 class="text-lg font-semibold text-gray-900">
        {{ currentMonthYear }}
      </h2>
      
      <button
        @click="nextMonth"
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronRight class="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <!-- Days of Week -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div
        v-for="day in weekDays"
        :key="day"
        class="text-center text-xs font-medium text-gray-500 py-2"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-1">
      <!-- Empty cells for days before month start -->
      <div
        v-for="empty in startingDayOfWeek"
        :key="`empty-${empty}`"
        class="aspect-square"
      ></div>

      <!-- Calendar days -->
      <button
        v-for="day in daysInMonth"
        :key="day"
        @click="selectDate(day)"
        :class="[
          'aspect-square flex flex-col items-center justify-center rounded-lg transition-all relative',
          isSelected(day) ? 'bg-secondary-100 text-secondary-700 font-semibold' : 'hover:bg-gray-50 text-gray-700',
          isTodayCheck(day) ? 'ring-2 ring-secondary-500' : '',
          isPastDate(day) ? 'opacity-50' : ''
        ]"
      >
        <span class="text-sm">{{ day }}</span>
        <!-- Event indicator -->
        <div
          v-if="getEventCountForDate(day) > 0"
          class="absolute bottom-1 w-1.5 h-1.5 bg-secondary-500 rounded-full"
        ></div>
      </button>
    </div>

    <!-- Event Count Summary -->
    <div v-if="getSelectedDateEventCount() > 0" class="mt-6 pt-4 border-t border-gray-200">
      <p class="text-sm text-gray-600">
        {{ getSelectedDateEventCount() }} {{ $t('events.eventOnDate') }}
      </p>
    </div>

    <!-- Clear Filter Button -->
    <button
      v-if="selectedDate"
      @click="clearFilter"
      class="mt-4 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
    >
      {{ $t('events.clearFilter') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { 
  format, 
  startOfMonth, 
  getDay, 
  isSameDay, 
  isToday as isTodayDateFns, 
  isPast 
} from 'date-fns'
import { ka as kaLocale, enUS } from 'date-fns/locale'
import { useEventsStore } from '../../stores/events'
import type { Event } from '../../types'

const { locale } = useI18n()
const eventsStore = useEventsStore()

const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)
const events = ref<Event[]>([])
const loading = ref(false)

const emit = defineEmits<{
  (e: 'date-selected', date: Date | null): void
}>()

// Fetch events when month changes
const fetchEventsForMonth = async () => {
  loading.value = true
  try {
    const month = currentDate.value.getMonth() + 1
    const year = currentDate.value.getFullYear()
    const fetchedEvents = await eventsStore.fetchCalendar(month, year)
    events.value = fetchedEvents || []
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    events.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEventsForMonth()
})

// Refetch when month changes
watch(currentDate, () => {
  fetchEventsForMonth()
})

const weekDays = computed(() => {
  if (locale.value === 'ka') {
    return ['ორ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი']
  }
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
})

const currentMonthYear = computed(() => {
  return format(currentDate.value, 'MMMM yyyy', { 
    locale: locale.value === 'ka' ? kaLocale : enUS 
  })
})

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month + 1, 0).getDate()
})

const startingDayOfWeek = computed(() => {
  const firstDay = startOfMonth(currentDate.value)
  return (getDay(firstDay) + 6) % 7 // Convert Sunday=0 to Monday=0
})

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const isSelected = (day: number) => {
  if (!selectedDate.value) return false
  const dateToCheck = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day)
  return isSameDay(dateToCheck, selectedDate.value)
}

const isTodayCheck = (day: number) => {
  const dateToCheck = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day)
  return isTodayDateFns(dateToCheck)
}

const isPastDate = (day: number) => {
  const dateToCheck = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day)
  return isPast(dateToCheck) && !isTodayDateFns(dateToCheck)
}

const getEventCountForDate = (day: number) => {
  const dateToCheck = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day)
  // Use local events ref which contains calendar events for the current month
  const currentEvents = events.value || []
  
  return currentEvents.filter(event => {
    if (!event.startAt) return false
    try {
      const eventDate = new Date(event.startAt)
      return isSameDay(eventDate, dateToCheck)
    } catch {
      return false
    }
  }).length
}

const getSelectedDateEventCount = () => {
  if (!selectedDate.value) return 0
  // Use local events ref here too
  const currentEvents = events.value || []
  
  return currentEvents.filter(event => {
    if (!event.startAt) return false
    try {
      const eventDate = new Date(event.startAt)
      return isSameDay(eventDate, selectedDate.value as Date)
    } catch {
      return false
    }
  }).length
}

const selectDate = (day: number) => {
  const dateToCheck = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day)
  if (selectedDate.value && isSameDay(dateToCheck, selectedDate.value)) {
    selectedDate.value = null
    emit('date-selected', null)
  } else {
    selectedDate.value = dateToCheck
    emit('date-selected', dateToCheck)
  }
}

const clearFilter = () => {
  selectedDate.value = null
  emit('date-selected', null)
}
</script>

