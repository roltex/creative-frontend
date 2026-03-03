<template>
  <article class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <!-- Event Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        v-if="event.image"
        :src="getImageUrl(event.image)"
        :alt="event.title[$i18n.locale as 'ka' | 'en']"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div v-else class="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
        <Calendar class="w-16 h-16 text-primary-500" />
      </div>
      
      <!-- Date Badge -->
      <div class="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 shadow-lg">
        <div class="text-2xl font-bold text-gray-900">{{ getDay(event.startAt) }}</div>
        <div class="text-xs text-gray-600 uppercase">{{ getMonth(event.startAt) }}</div>
      </div>
    </div>

    <!-- Event Content -->
    <div class="p-6">
      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
        {{ event.title[$i18n.locale as 'ka' | 'en'] }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 mb-4 line-clamp-2 text-sm">
        {{ stripHtml(event.description[$i18n.locale as 'ka' | 'en']) }}
      </p>

      <!-- Event Meta -->
      <div class="space-y-2 mb-4">
        <div class="flex items-center text-sm text-gray-500">
          <Clock class="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{{ getTime(event.startAt) }}</span>
        </div>
        <div class="flex items-center text-sm text-gray-500">
          <MapPin class="w-4 h-4 mr-2 flex-shrink-0" />
          <span class="truncate">{{ event.location }}</span>
        </div>
        <div v-if="event.capacity" class="flex items-center text-sm text-gray-500">
          <Users class="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{{ event.capacity }} {{ $t('events.seats') }}</span>
        </div>
      </div>

      <!-- Action Button -->
      <RouterLink
        :to="{ name: 'event-details', params: { slug: event.slug || event.id } }"
        class="block w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 text-center group-hover:shadow-lg"
      >
        {{ $t('events.register') }}
      </RouterLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Calendar, Clock, MapPin, Users } from 'lucide-vue-next'
import { getImageUrl, stripHtml } from '../../utils/imageUrl'
import { getDay as getDayUtil, getMonth as getMonthUtil, getTime as getTimeUtil } from '../../utils/dateFormat'
import type { Event } from '../../types'

interface Props {
  event: Event
}

defineProps<Props>()

const { locale } = useI18n()

const getDay = (date: string | null | undefined) => getDayUtil(date)
const getMonth = (date: string | null | undefined) => getMonthUtil(date, locale.value)
const getTime = (date: string | null | undefined) => getTimeUtil(date)
</script>

