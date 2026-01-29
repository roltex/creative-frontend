<template>
  <div class="relative bg-white">
    <!-- Header -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">
        {{ $t('successStory.title') }}
      </h2>
      <p class="text-lg text-gray-600">
        {{ $t('slider.viewAll') }}
      </p>
    </div>

    <!-- Slider Container -->
    <div class="w-full px-4 relative">
      <!-- Navigation Arrows -->
      <button 
        @click="slideLeft"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all duration-200 shadow-md border border-gray-200"
      >
        <ChevronLeft class="w-6 h-6 text-gray-600" />
      </button>
      
      <button 
        @click="slideRight"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all duration-200 shadow-md border border-gray-200"
      >
        <ChevronRight class="w-6 h-6 text-gray-600" />
      </button>

      <!-- Slider -->
      <Swiper
        :modules="modules"
        :spaceBetween="8"
        :slidesPerView="1.8"
        :centeredSlides="false"
        :loop="true"
        :navigation="false"
        :pagination="false"
        :autoplay="false"
        :allowTouchMove="true"
        :breakpoints="{
          480: { slidesPerView: 2.2, spaceBetween: 8 },
          640: { slidesPerView: 2.8, spaceBetween: 10 },
          768: { slidesPerView: 3.2, spaceBetween: 10 },
          1024: { slidesPerView: 3.8, spaceBetween: 10 },
          1280: { slidesPerView: 4.2, spaceBetween: 10 }
        }"
        class="success-stories-slider"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="story in stories" :key="story.id">
          <RouterLink 
            :to="{ name: 'success-story-details', params: { slug: story.slug } }"
            class="block bg-white rounded-3xl shadow-sm overflow-hidden w-full mx-auto hover:shadow-lg transition-all duration-300"
          >
            <!-- Profile Picture Section -->
            <div class="relative pt-12 pb-8 flex justify-center">
              <div class="w-24 h-24 relative">
                <img
                  :src="getImageUrl(story.image)"
                  :alt="story.name"
                  class="w-full h-full object-cover rounded-full"
                />
                <!-- Decorative Elements -->
                <div 
                  class="absolute w-8 h-8 rounded-full"
                  :class="story.decorativeColor"
                  :style="story.decorativePosition1"
                ></div>
                <div 
                  class="absolute w-6 h-6 rounded-full"
                  :class="story.decorativeColor2"
                  :style="story.decorativePosition2"
                ></div>
                <div 
                  class="absolute w-4 h-4 rounded-full"
                  :class="story.decorativeColor3"
                  :style="story.decorativePosition3"
                ></div>
              </div>
            </div>
            
            <!-- Content Section -->
            <div class="px-8 pb-8 text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">{{ story.name }}</h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-8 px-2">{{ story.description }}</p>
              
              <!-- Read More Button -->
              <span class="text-secondary-500 hover:text-secondary-600 font-medium text-sm transition-colors duration-200">
                {{ $t('successStory.moreInfo') }}
              </span>
            </div>
          </RouterLink>
        </SwiperSlide>
      </Swiper>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <RouterLink :to="{ name: 'competitions-success-stories' }" class="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors duration-200 text-sm font-headline">
          {{ $t('slider.viewAll') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { getImageUrl } from '../../utils/imageUrl'

const swiper = ref<SwiperType | null>(null)

const modules = [Autoplay]

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

// Creative Georgia Success Stories - Real creative achievements
const stories = [
  {
    id: '1',
    slug: 'ana-javakhishvili',
    name: 'ანა ჯავახიშვილი',
    description: 'გრანტის მიღების შემდეგ გახსნა თანამედროვე ხელოვნების გალერეა თბილისში',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop',
    decorativeColor: 'bg-purple-400',
    decorativeColor2: 'bg-purple-300', 
    decorativeColor3: 'bg-purple-200',
    decorativePosition1: 'top: -8px; right: -8px;',
    decorativePosition2: 'top: 8px; right: -12px;',
    decorativePosition3: 'bottom: -4px; right: -8px;'
  },
  {
    id: '2',
    slug: 'giorgi-maisuradze',
    name: 'გიორგი მაისურაძე',
    description: 'დოკუმენტური ფილმით მოიგო საერთაშორისო კინოფესტივალზე ჯილდო',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    decorativeColor: 'bg-primary-400',
    decorativeColor2: 'bg-primary-300',
    decorativeColor3: 'bg-primary-200',
    decorativePosition1: 'top: -8px; right: -8px;',
    decorativePosition2: 'top: 8px; right: -12px;',
    decorativePosition3: 'bottom: -4px; right: -8px;'
  },
  {
    id: '3',
    slug: 'nino-khutateladze',
    name: 'ნინო ქუთათელაძე',
    description: 'ტრადიციული ქართული ხალიჩების თანამედროვე დიზაინით საერთაშორისო წარმატება',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    decorativeColor: 'bg-secondary-400',
    decorativeColor2: 'bg-secondary-300',
    decorativeColor3: 'bg-secondary-200',
    decorativePosition1: 'top: -8px; right: -8px;',
    decorativePosition2: 'top: 8px; right: -12px;',
    decorativePosition3: 'bottom: -4px; right: -8px;'
  },
  {
    id: '4',
    slug: 'davit-karkashadze',
    name: 'დავით ქარქაშაძე',
    description: 'მუსიკალური ალბომით ევროპის ჯაზ ფესტივალებზე წარმატებული გასტროლები',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    decorativeColor: 'bg-green-400',
    decorativeColor2: 'bg-green-300',
    decorativeColor3: 'bg-green-200',
    decorativePosition1: 'top: -8px; right: -8px;',
    decorativePosition2: 'top: 8px; right: -12px;',
    decorativePosition3: 'bottom: -4px; right: -8px;'
  },
  {
    id: '5',
    slug: 'mariam-lortkipanidze',
    name: 'მარიამ ლორთქიფანიძე',
    description: 'ლიტერატურული თარგმანით მოიგო საქართველოს ეროვნული ლიტერატურული ჯილდო',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    decorativeColor: 'bg-red-400',
    decorativeColor2: 'bg-red-300',
    decorativeColor3: 'bg-red-200',
    decorativePosition1: 'top: -8px; right: -8px;',
    decorativePosition2: 'top: 8px; right: -12px;',
    decorativePosition3: 'bottom: -4px; right: -8px;'
  },
  {
    id: '6',
    slug: 'luka-ghlonti',
    name: 'ლუკა ღლონტი',
    description: 'ფოტოგრაფიული პროექტით წარმოდგენილი იქნა ნიუ-იორკის MoMA-ში',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    decorativeColor: 'bg-yellow-400',
    decorativeColor2: 'bg-yellow-300',
    decorativeColor3: 'bg-yellow-200',
    decorativePosition1: 'top: -8px; right: -8px;',
    decorativePosition2: 'top: 8px; right: -12px;',
    decorativePosition3: 'bottom: -4px; right: -8px;'
  },
  {
    id: '7',
    slug: 'tamar-beridze',
    name: 'თამარ ბერიძე',
    description: 'თეატრალური სპექტაკლით მოიგო ბათუმის საერთაშორისო ფესტივალის გრან-პრი',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    decorativeColor: 'bg-pink-400',
    decorativeColor2: 'bg-pink-300',
    decorativeColor3: 'bg-pink-200',
    decorativePosition1: 'top: -8px; right: -8px;',
    decorativePosition2: 'top: 8px; right: -12px;',
    decorativePosition3: 'bottom: -4px; right: -8px;'
  },
  {
    id: '8',
    slug: 'nikoloz-bakradze',
    name: 'ნიკოლოზ ბაქრაძე',
    description: 'ციფრული ხელოვნების პროექტით გამოფენა გაიმართა ლონდონის Tate Modern-ში',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    decorativeColor: 'bg-indigo-400',
    decorativeColor2: 'bg-indigo-300',
    decorativeColor3: 'bg-indigo-200',
    decorativePosition1: 'top: -8px; right: -8px;',
    decorativePosition2: 'top: 8px; right: -12px;',
    decorativePosition3: 'bottom: -4px; right: -8px;'
  }
]
</script>

<style scoped>
.success-stories-slider {
  overflow: visible;
  padding: 0 60px;
  width: 100%;
}

.success-stories-slider :deep(.swiper-slide) {
  height: auto;
  display: flex;
  justify-content: center;
  width: auto;
}

.success-stories-slider :deep(.swiper-wrapper) {
  align-items: stretch;
}

/* Ensure cards fill available space properly */
.success-stories-slider :deep(.swiper-slide) > div {
  width: 100%;
}

/* Smooth hover animation for cards */
.success-stories-slider .swiper-slide > div:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}
</style>
