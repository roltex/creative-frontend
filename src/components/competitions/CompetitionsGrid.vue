<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading || !isInitialized" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CompetitionCardSkeleton v-for="i in limit || 6" :key="i" />
    </div>

    <!-- Competitions Grid -->
    <div v-else-if="displayedCompetitions.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CompetitionCard
        v-for="competition in displayedCompetitions"
        :key="competition.id"
        :competition="competition"
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
import { computed, onMounted, ref } from 'vue'
import { Trophy } from 'lucide-vue-next'
import { useCompetitionsStore } from '../../stores/competitions'
import CompetitionCard from './CompetitionCard.vue'
import CompetitionCardSkeleton from './CompetitionCardSkeleton.vue'

interface Props {
  limit?: number
  status?: 'current' | 'archive' | 'completed' | 'upcoming'
}

const props = defineProps<Props>()
const competitionsStore = useCompetitionsStore()

const { competitions, loading, initialized } = competitionsStore
const localCompetitions = ref<any[]>([])
const localLoading = ref(false)
const localInitialized = ref(false)

// Fetch competitions based on status
const fetchByStatus = async () => {
  if (!props.status) {
    // If no status specified, use store competitions
    localCompetitions.value = competitions.value || []
    localInitialized.value = initialized.value
    return
  }

  localLoading.value = true
  try {
    let fetched: any[] = []
    
    if (props.status === 'current') {
      fetched = await competitionsStore.fetchCurrent(props.limit || 100)
    } else if (props.status === 'completed' || props.status === 'archive') {
      fetched = await competitionsStore.fetchCompleted(props.limit || 100)
    } else if (props.status === 'upcoming') {
      fetched = await competitionsStore.fetchUpcoming(props.limit || 100)
    }
    
    localCompetitions.value = fetched || []
    localInitialized.value = true
  } catch (err) {
    console.error('Failed to fetch competitions:', err)
    localCompetitions.value = []
    localInitialized.value = true
  } finally {
    localLoading.value = false
  }
}

const displayedCompetitions = computed(() => {
  // Use local competitions if status is specified, otherwise use store competitions
  const sourceCompetitions = props.status ? localCompetitions.value : (competitions.value || [])
  
  if (props.limit && sourceCompetitions.length > props.limit) {
    return sourceCompetitions.slice(0, props.limit)
  }
  
  return sourceCompetitions
})

const isLoading = computed(() => localLoading.value || (props.status ? false : loading.value))
const isInitialized = computed(() => props.status ? localInitialized.value : initialized.value)

onMounted(async () => {
  if (props.status) {
    // Fetch by status if specified
    await fetchByStatus()
  } else {
    // Otherwise use store data (for homepage, etc.)
    localCompetitions.value = competitions.value || []
    localInitialized.value = initialized.value
  }
})
</script>
