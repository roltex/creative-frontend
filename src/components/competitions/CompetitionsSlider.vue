<template>
  <div class="relative">
    <!-- Header with Title and Navigation -->
    <div class="flex items-start justify-between mb-16">
      <div class="flex-1 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          მიმდინარე კონკურსები
        </h2>
        <p class="text-gray-600">
          გაიგე რა გვაქვს ახალი საინტერესო შეთავაზებების სანახავად
        </p>
      </div>
      
      <!-- Navigation Arrows -->
      <div class="flex gap-2 ml-4">
        <button 
          @click="slideLeft"
          class="w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all duration-200 shadow-md border border-gray-200"
        >
          <ChevronLeft class="w-6 h-6 text-gray-600" />
        </button>
        
        <button 
          @click="slideRight"
          class="w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all duration-200 shadow-md border border-gray-200"
        >
          <ChevronRight class="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!initialized" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="skeleton h-48"></div>
        <div class="p-6 space-y-3">
          <div class="skeleton h-4 w-20"></div>
          <div class="skeleton h-6 w-full"></div>
          <div class="skeleton h-4 w-3/4"></div>
          <div class="skeleton h-10 w-24"></div>
        </div>
      </div>
    </div>

    <!-- Competitions Slider -->
    <div v-else-if="competitions?.length > 0">
      <Swiper
        :modules="modules"
        :spaceBetween="32"
        :slidesPerView="1"
        :loop="true"
        :navigation="false"
        :pagination="false"
        :autoplay="false"
        :breakpoints="{
          480: { slidesPerView: 1.2, spaceBetween: 32 },
          640: { slidesPerView: 1.5, spaceBetween: 32 },
          768: { slidesPerView: 2, spaceBetween: 32 },
          1024: { slidesPerView: 2.2, spaceBetween: 32 },
          1280: { slidesPerView: 2.5, spaceBetween: 32 },
          1536: { slidesPerView: 2.5, spaceBetween: 32 }
        }"
        class="competitions-slider"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="competition in displayedCompetitions" :key="competition.id">
          <div 
            @click="handleCardClick(competition)"
            class="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <!-- Image Section -->
            <div class="relative h-48 overflow-hidden">
              <img
                :src="getImageUrl(competition.image)"
                :alt="competition.title[locale as 'ka' | 'en']"
                class="w-full h-full object-cover"
              />
              <!-- Status Badge -->
              <div class="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ $t('competitions.status.current') }}
              </div>
              <!-- Category Badge -->
              <div class="absolute top-4 right-4 bg-gray-900 bg-opacity-80 text-white px-3 py-1 rounded-full text-xs font-medium">
                {{ competition.category }}
              </div>
            </div>
            
            <!-- Content Section -->
            <div class="p-6 flex-1 flex flex-col justify-between">
              <!-- Top Content -->
              <div>
                <!-- Competition Title -->
                <h3 class="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                  {{ competition.title[locale as 'ka' | 'en'] }}
                </h3>
                
                <!-- Competition Description -->
                <p class="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {{ competition.description[locale as 'ka' | 'en'] }}
                </p>
              </div>
              
              <!-- Bottom Content (Details) -->
              <div class="space-y-3">
                <!-- Prize -->
                <div class="flex items-center text-sm">
                  <Trophy class="w-4 h-4 text-secondary-500 mr-2" />
                  <span class="text-gray-700">{{ $t('competitions.prize') }}: </span>
                  <span class="font-semibold text-secondary-600 ml-1">{{ competition.prize }}</span>
                </div>
                
                <!-- Deadline -->
                <div v-if="competition.end_date || competition.endDate" class="flex items-center text-sm">
                  <Calendar class="w-4 h-4 text-red-500 mr-2" />
                  <span class="text-gray-700">{{ $t('competitions.deadline') }}: </span>
                  <span class="font-semibold text-red-600 ml-1">{{ formatDate(competition.end_date || competition.endDate) }}</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      
      <!-- View All Button -->
      <div class="text-center mt-8">
        <button @click="handleViewAll" class="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200">
          ყველას ნახვა
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-white rounded-2xl">
      <Trophy class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('common.noResults') }}</h3>
      <p class="text-gray-600">მიმდინარე კონკურსები ამჟამად არ არის.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { ChevronLeft, ChevronRight, Trophy, Calendar } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { format } from 'date-fns'
import { ka } from 'date-fns/locale'
import type { Swiper as SwiperType } from 'swiper'
import { getImageUrl } from '../../utils/imageUrl'
import { useCompetitionsStore } from '../../stores/competitions'

interface Props {
  limit?: number
  status?: 'current' | 'completed' | 'upcoming'
}

const props = defineProps<Props>()
const { locale } = useI18n()
const router = useRouter()
const swiper = ref<SwiperType | null>(null)

const modules = [Autoplay]
const competitionsStore = useCompetitionsStore()

const { competitions, initialized } = storeToRefs(competitionsStore)

const onSwiper = (swiperInstance: SwiperType) => {
  swiper.value = swiperInstance
}

const slideLeft = () => {
  if (swiper.value) {
    swiper.value.slidePrev()
  }
}

const slideRight = () => {
  if (swiper.value) {
    swiper.value.slideNext()
  }
}

const displayedCompetitions = computed(() => {
  let filtered = competitions.value || []
  
  if (props.status) {
    filtered = filtered.filter(c => c.status === props.status)
  }
  
  if (props.limit) {
    return filtered.slice(0, props.limit)
  }
  
  return filtered
})

const formatDate = (date: string | null | undefined) => {
  if (!date) return ''
  
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return ''
    }
    return format(dateObj, 'dd MMM, yyyy', { 
      locale: locale.value === 'ka' ? ka : undefined 
    })
  } catch (error) {
    console.error('Error formatting date:', error, date)
    return ''
  }
}

const handleCardClick = (competition: any) => {
  router.push({ name: 'competition-details', params: { slug: competition.slug } })
}

const handleViewAll = () => {
  router.push({ name: 'competitions-current' })
}
</script>

<style scoped>
.competitions-slider {
  overflow: visible;
  width: 100%;
}

.competitions-slider :deep(.swiper-slide) {
  height: auto;
  display: flex;
  flex-direction: column;
}

.competitions-slider :deep(.swiper-wrapper) {
  align-items: stretch;
}

/* Ensure all cards have equal height */
.competitions-slider :deep(.swiper-slide) > div {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Skeleton loading animation */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Card hover animation */
.competitions-slider .swiper-slide > div:hover {
  transform: translateY(-4px) scale(1.02);
  transition: all 0.3s ease;
}
</style>
