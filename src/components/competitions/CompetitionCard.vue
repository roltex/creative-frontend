<template>
  <article class="card-hover group">
    <!-- Image -->
    <div class="aspect-16-9 bg-gray-100 relative overflow-hidden">
      <img
        v-if="competition.image"
        :src="getImageUrl(competition.image)"
        :alt="competition.title[$i18n.locale as 'ka' | 'en']"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
        <Trophy class="w-16 h-16 text-primary-500" />
      </div>
      
      <!-- Status Badge -->
      <div class="absolute top-4 right-4">
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-semibold',
            statusClass
          ]"
        >
          {{ $t(`competitions.status.${competition.status}`) }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Category -->
      <div v-if="competition.category" class="text-xs text-primary-500 font-semibold uppercase tracking-wide mb-2">
        {{ competition.category }}
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
        {{ competition.title[$i18n.locale as 'ka' | 'en'] }}
      </h3>

      <!-- Description -->
      <div 
        class="text-gray-600 mb-4 line-clamp-3 prose prose-sm max-w-none"
        v-html="competition.description[$i18n.locale as 'ka' | 'en']"
      ></div>

      <!-- Meta Info -->
      <div class="space-y-2 mb-4">
        <div v-if="(competition as any).end_date || competition.endDate" class="flex items-center text-sm text-gray-500">
          <Calendar class="w-4 h-4 mr-2" />
          <span>{{ $t('competitions.deadline') }}: {{ formatDate((competition as any).end_date || competition.endDate) }}</span>
        </div>
      </div>

      <!-- Action Button -->
      <RouterLink
        :to="{ name: 'competition-details', params: { slug: competition.slug } }"
        class="btn-primary w-full text-center"
      >
        {{ competition.status === 'current' ? $t('competitions.apply') : $t('common.viewDetails') }}
      </RouterLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Trophy, Calendar } from 'lucide-vue-next'
import { format } from 'date-fns'
import { getImageUrl } from '../../utils/imageUrl'
import type { Competition } from '../../types'

interface Props {
  competition: Competition
}

const props = defineProps<Props>()
const { } = useI18n()

const statusClass = computed(() => {
  switch (props.competition.status) {
    case 'current':
      return 'bg-green-100 text-green-800'
    case 'upcoming':
      return 'bg-primary-100 text-primary-800'
    case 'completed':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const formatDate = (date: string | null | undefined) => {
  if (!date) return ''
  
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return ''
    }
    return format(dateObj, 'MMM dd, yyyy')
  } catch (error) {
    console.error('Error formatting date:', error, date)
    return ''
  }
}
</script>
