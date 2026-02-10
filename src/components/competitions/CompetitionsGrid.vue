<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CompetitionCardSkeleton v-for="i in perPage" :key="i" />
    </div>

    <!-- Competitions Grid -->
    <div v-else-if="competitions.length > 0">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CompetitionCard
          v-for="competition in competitions"
          :key="competition.id"
          :competition="competition"
        />
      </div>
      
      <!-- Pagination -->
      <Pagination
        v-if="!limit && totalPages > 1"
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        class="mt-8"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <Trophy class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('common.noResults') }}</h3>
      <p class="text-gray-600">{{ $t('competitions.noActiveCompetitions') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Trophy } from 'lucide-vue-next'
import CompetitionCard from './CompetitionCard.vue'
import CompetitionCardSkeleton from './CompetitionCardSkeleton.vue'
import Pagination from '../common/Pagination.vue'
import api from '../../api/axios'

interface Props {
  limit?: number
  status?: 'current' | 'archive' | 'completed' | 'upcoming'
}

const props = defineProps<Props>()

// Local state for server-side pagination
const competitions = ref<any[]>([])
const isLoading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = props.limit || 9

// Fetch competitions from API with pagination
const fetchCompetitions = async (page: number = 1) => {
  isLoading.value = true
  
  try {
    let endpoint = '/competitions'
    const params: any = {
      page,
      per_page: perPage
    }
    
    // Use specific endpoints based on status
    if (props.status === 'current') {
      endpoint = '/competitions/current'
    } else if (props.status === 'completed' || props.status === 'archive') {
      endpoint = '/competitions/completed'
    } else if (props.status === 'upcoming') {
      endpoint = '/competitions/upcoming'
    }
    
    const response = await api.get(endpoint, { params })
    
    if (response.data.success) {
      competitions.value = response.data.data || []
      
      // Update pagination from response meta
      if (response.data.meta) {
        currentPage.value = response.data.meta.current_page || page
        totalPages.value = response.data.meta.last_page || 1
      } else {
        // If no meta, calculate based on total items (fallback)
        totalPages.value = 1
      }
    }
  } catch (err) {
    console.error('Failed to fetch competitions:', err)
    competitions.value = []
  } finally {
    isLoading.value = false
  }
}

// Watch for page changes
watch(currentPage, (newPage) => {
  if (!props.limit) {
    fetchCompetitions(newPage)
  }
})

// Watch for status changes
watch(() => props.status, () => {
  currentPage.value = 1
  fetchCompetitions(1)
})

onMounted(() => {
  fetchCompetitions(1)
})
</script>
