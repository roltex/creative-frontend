<template>
  <div>
    <!-- Loading State -->
    <div v-if="!initialized" class="space-y-4">
      <div v-for="i in limit || 4" :key="i" class="bg-white rounded-full shadow-md p-6">
        <div class="flex gap-6">
          <div class="skeleton w-24 h-24 rounded-full"></div>
          <div class="flex-1 space-y-3">
            <div class="skeleton h-6 w-3/4"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Events List -->
    <div v-else-if="events?.length > 0" class="space-y-4">
      <article 
        v-for="event in displayedEvents" 
        :key="event.id"
        class="bg-white rounded-full shadow-md hover:shadow-lg transition-shadow p-6"
      >
        <div class="flex gap-6">
          <!-- Date Box -->
          <div class="flex-shrink-0 w-24 h-24 bg-secondary-500 rounded-full flex flex-col items-center justify-center text-white">
            <div class="text-3xl font-bold">{{ getDay(event.startAt) }}</div>
            <div class="text-sm uppercase">{{ getMonth(event.startAt) }}</div>
          </div>

          <!-- Event Details -->
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ event.title[$i18n.locale as 'ka' | 'en'] }}
            </h3>
            <p class="text-gray-600 mb-3 line-clamp-2">
              {{ event.description[$i18n.locale as 'ka' | 'en'] }}
            </p>
            
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div class="flex items-center">
                <Clock class="w-4 h-4 mr-1" />
                <span>{{ getTime(event.startAt) }}</span>
              </div>
              <div class="flex items-center">
                <MapPin class="w-4 h-4 mr-1" />
                <span>{{ event.location }}</span>
              </div>
              <div v-if="event.capacity" class="flex items-center">
                <Users class="w-4 h-4 mr-1" />
                <span>{{ event.capacity }} seats</span>
              </div>
              <div class="flex items-center">
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-semibold',
                  event.price ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                ]">
                  {{ event.price ? `₾${event.price}` : $t('events.free') }}
                </span>
              </div>
            </div>

            <!-- Action Button -->
            <div class="mt-4 flex gap-3">
              <RouterLink 
                :to="{ name: 'event-details', params: { slug: event.slug || event.id } }"
                class="btn-primary"
              >
                {{ $t('events.register') }}
              </RouterLink>
              <RouterLink
                :to="{ name: 'event-details', params: { slug: event.slug || event.id } }"
                class="btn-secondary"
              >
                {{ $t('events.moreInfo') }}
              </RouterLink>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-white rounded-full">
      <Calendar class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('common.noResults') }}</h3>
      <p class="text-gray-600">No upcoming events at the moment.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { Clock, MapPin, Users, Calendar } from 'lucide-vue-next'
import { useEventsStore } from '../../stores/events'
import { getDay as getDayUtil, getMonth as getMonthUtil, getTime as getTimeUtil } from '../../utils/dateFormat'

interface Props {
  limit?: number
  type?: string
}

const props = defineProps<Props>()
const { locale } = useI18n()
const eventsStore = useEventsStore()

const { events, initialized } = eventsStore

const displayedEvents = computed(() => {
  let filtered = events || []
  
  if (props.type) {
    filtered = filtered.filter(e => e.type === props.type)
  }
  
  if (props.limit) {
    return filtered.slice(0, props.limit)
  }
  
  return filtered
})

const getDay = (date: string) => getDayUtil(date)
const getMonth = (date: string) => getMonthUtil(date, locale.value)
const getTime = (date: string) => getTimeUtil(date)

onMounted(() => {
  // Data is now loaded by the parent Home component
  // No need to set mock data here as it's handled by the store
})
</script>
