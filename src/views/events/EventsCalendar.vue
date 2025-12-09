<template>
  <div class="container-fluid py-12">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-headline">
        {{ $t('events.title') }}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {{ $t('events.subtitle') }}
      </p>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Left Sidebar - Calendar -->
      <div class="lg:col-span-1">
        <EventsCalendarComponent @date-selected="handleDateSelection" />
      </div>

      <!-- Right Content - Events Grid -->
      <div class="lg:col-span-3">
        <EventsGrid :filteredDate="selectedDate" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EventsCalendarComponent from '../../components/events/EventsCalendar.vue'
import EventsGrid from '../../components/events/EventsGrid.vue'

const { } = useI18n()
const selectedDate = ref<Date | null>(null)

const handleDateSelection = (date: Date | null) => {
  selectedDate.value = date
}
</script>

