<template>
  <section class="bg-gradient-to-b from-secondary-50 via-white to-secondary-50  relative overflow-x-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #006ea5 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>

    <div class="w-full relative z-10 py-2 sm:py-3 lg:py-4">
      <!-- Swiper Slider -->
    <Swiper
      :modules="modules"
        :spaceBetween="15"
        :slidesPerView="1.15"
        :centeredSlides="true"
      :loop="slides.length >= 3"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :effect="'coverflow'"
        :coverflowEffect="{
          rotate: 0,
          stretch: 0,
          depth: 450,
          modifier: 1.3,
          slideShadows: false
        }"
      :navigation="{
        prevEl: '.custom-prev',
        nextEl: '.custom-next'
      }"
        :pagination="{ clickable: true }"
        :breakpoints="{
          480: { slidesPerView: 1.2, spaceBetween: 12 },
          640: { slidesPerView: 1.4, spaceBetween: 15 },
          768: { slidesPerView: 1.5, spaceBetween: 18 },
          1024: { slidesPerView: 1.7, spaceBetween: 20 },
          1280: { slidesPerView: 1.9, spaceBetween: 22 },
          1536: { slidesPerView: 2.1, spaceBetween: 25 },
          1920: { slidesPerView: 2.3, spaceBetween: 28 }
        }"
        :observer="true"
        :observeParents="true"
        :watchOverflow="true"
        :initialSlide="0"
        :speed="600"
        :class="['hero-slider', { 'slider-ready': sliderReady }]"
    >
      <SwiperSlide v-for="slide in slides" :key="slide.id">
          <div class="relative group cursor-pointer">
            <!-- Card Container -->
            <div class="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl transform" :class="sliderReady ? 'transition-all duration-500' : ''">
              <!-- Image -->
              <div class="relative h-[300px] xs:h-[320px] sm:h-[350px] md:h-[380px] lg:h-[410px] xl:h-[440px] 2xl:h-[470px]">
                <img
                  :src="getImageUrl(slide.image)"
                  :alt="slide.title[locale as 'ka' | 'en']"
                  class="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              <!-- Content Overlay -->
              <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7">
                <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1.5 sm:mb-2 font-headline leading-tight">
                {{ slide.title[locale as 'ka' | 'en'] }}
                </h2>
              
                <p class="text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-200 mb-3 sm:mb-4 leading-snug line-clamp-2">
                {{ slide.subtitle[locale as 'ka' | 'en'] }}
              </p>
              
                <!-- CTA Button - from API -->
                <a
                  v-if="getSlideLink(slide) && getSlideButtonText(slide)"
                  :href="getSlideLink(slide)"
                  class="inline-flex items-center px-3 py-1.5 sm:px-5 sm:py-2.5 bg-secondary-500 text-white rounded-full font-semibold hover:bg-secondary-600 transition-all duration-300 font-headline text-[11px] sm:text-xs shadow-lg"
                >
                  <span>{{ getSlideButtonText(slide) }}</span>
                  <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
            </div>

              <!-- Badge/Category -->
              <div class="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4">
                <span class="px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 bg-primary-500 text-white rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wide shadow-lg">
                  {{ slide.category[locale as 'ka' | 'en'] }}
                </span>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- Custom Navigation Buttons -->
      <button class="custom-prev absolute left-1 xs:left-2 sm:left-4 md:left-6 lg:left-8 xl:left-12 2xl:left-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-secondary-500 hover:bg-secondary-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
        <svg class="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>
    
      <button class="custom-next absolute right-1 xs:right-2 sm:right-4 md:right-6 lg:right-8 xl:right-12 2xl:right-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-secondary-500 hover:bg-secondary-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
        <svg class="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { getImageUrl } from '../../utils/imageUrl'
import api from '../../api/axios'

const { locale } = useI18n()
const modules = [Navigation, Pagination, Autoplay, EffectCoverflow]
const sliderReady = ref(false)
const slides = ref<any[]>([])
const loading = ref(true)

// Get button text from slide (supports translatable object or plain string)
const getSlideButtonText = (slide: any): string => {
  if (!slide.button_text) return ''
  if (typeof slide.button_text === 'object') {
    return slide.button_text[locale.value as 'ka' | 'en'] || slide.button_text['ka'] || ''
  }
  return slide.button_text
}

// Get link from slide
const getSlideLink = (slide: any): string => {
  return slide.link || ''
}

// Load dynamic slider content
const fetchSlides = async () => {
  try {
    const response = await api.get('/sliders/home')
    if (response.data.success && response.data.data.length > 0) {
      slides.value = response.data.data
    } else {
      // Use fallback slides
      slides.value = fallbackSlides
    }
  } catch (error) {
    console.error('Failed to fetch slides, using fallback:', error)
    slides.value = fallbackSlides
  } finally {
    loading.value = false
  }
}

// Fallback slides if API fails
const fallbackSlides = [
  {
    id: 1,
    title: {
      ka: 'შენი ნიჭი - ეროვნული ღირებულება',
      en: 'Your Talent - National Treasure'
    },
    subtitle: {
      ka: 'ჩვენ ვართ ხიდი, რომელიც შემოქმედებით იდეებს სახელმწიფო რესურსებთან აკავშირებს და ზრუნავს მათ განხორციელებაზე. შემოგვიერთდით და განახორციელეთ თქვენი კრეატიული ოცნებები',
      en: 'We are the bridge that connects creative ideas with state resources and ensures their implementation. Join us and realize your creative dreams'
    },
    category: {
      ka: 'შემოქმედებითი საქართველო',
      en: 'Creative Georgia'
    },
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=1600&fit=crop&crop=center'
  },
  {
    id: 2,
    title: {
      ka: 'კონკურსები და გრანტები',
      en: 'Competitions and Grants'
    },
    subtitle: {
      ka: 'იდეიდან განხორციელებამდე - ჩვენ გთავაზობთ სრულ მხარდაჭერას თქვენი შემოქმედებითი პროექტებისთვის. მიიღეთ დაფინანსება და პროფესიონალური დახმარება',
      en: 'From idea to implementation - we offer complete support for your creative projects. Get funding and professional assistance'
    },
    category: {
      ka: 'დაფინანსება',
      en: 'Funding'
    },
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=1600&fit=crop&crop=center'
  },
  {
    id: 3,
    title: {
      ka: 'შემოქმედთა საზოგადოება',
      en: 'Creators Community'
    },
    subtitle: {
      ka: '10,000+ შემოქმედი უკვე ნდობს ჩვენს პლატფორმას. გახდი ნაწილი ქართული კულტურის განვითარების მისიისა და იპოვე თავისუფლების თავისი იდეების რეალიზაციისთვის',
      en: '10,000+ creators already trust our platform. Become part of the mission to develop Georgian culture and find freedom to realize your ideas'
    },
    category: {
      ka: 'საზოგადოება',
      en: 'Community'
    },
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=1600&fit=crop&crop=center'
  },
  {
    id: 4,
    title: {
      ka: 'ციფრული ხელოვნება',
      en: 'Digital Art'
    },
    subtitle: {
      ka: 'თანამედროვე ტექნოლოგიები და ციფრული ხელოვნება - ვხმარობთ ინოვაციურ მეთოდებს კრეატიული ინდუსტრიების განვითარებისთვის. შექმენით ნამუშევრები 21-ე საუკუნის ინსტრუმენტებით',
      en: 'Modern technologies and digital art - we use innovative methods for creative industry development. Create masterpieces with 21st century tools'
    },
    category: {
      ka: 'ინოვაცია',
      en: 'Innovation'
    },
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=1600&fit=crop&crop=center'
  },
  {
    id: 5,
    title: {
      ka: 'წარმატების ისტორიები',
      en: 'Success Stories'
    },
    subtitle: {
      ka: 'აღმოაჩინეთ შთამბეჭდავი პროექტები და ნიჭიერი შემოქმედები, რომლებმაც წარმატებით განახორციელეს თავიანთი იდეები ჩვენი მხარდაჭერით. თქვენც შეგიძლიათ!',
      en: 'Discover impressive projects and talented creators who successfully implemented their ideas with our support. You can do it too!'
    },
    category: {
      ka: 'შთაგონება',
      en: 'Inspiration'
    },
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=1600&fit=crop&crop=center'
  }
]

// Initialize component
onMounted(async () => {
  // Load slides first
  await fetchSlides()
  
  // Wait for Swiper to initialize properly
  requestAnimationFrame(() => {
    setTimeout(() => {
      sliderReady.value = true
    }, 150)
  })
})
</script>

<style scoped>
/* Hero Slider Styling */
.hero-slider {
  width: 100%;
  padding: 15px 0 20px 0;
  overflow: visible;
  min-height: 400px;
}

/* Prevent layout shift during initialization */
.hero-slider :deep(.swiper) {
  overflow: visible;
}

/* Swiper Container */
.hero-slider :deep(.swiper-container) {
  overflow: visible;
}

/* Swiper Wrapper */
.hero-slider :deep(.swiper-wrapper) {
  padding: 8px 0;
  align-items: center;
}

/* Swiper 3D Coverflow Effect */
.hero-slider :deep(.swiper-slide) {
  transition: none;
  opacity: 0.25;
  transform: scale(0.6);
  will-change: transform, opacity;
}

/* Enable transitions after initialization */
.hero-slider.slider-ready :deep(.swiper-slide) {
  transition: all 0.6s ease;
}

/* Initialize slides with correct state - prevents flash */
.hero-slider :deep(.swiper-slide:first-child) {
  opacity: 1;
  transform: scale(1.12);
}

.hero-slider :deep(.swiper-slide-active) {
  opacity: 1 !important;
  transform: scale(1.12) !important;
  z-index: 10;
}

.hero-slider :deep(.swiper-slide-next),
.hero-slider :deep(.swiper-slide-prev) {
  opacity: 0.45;
  transform: scale(0.7);
}

/* Hide slides that are too far from center - ensure max 3 visible */
.hero-slider :deep(.swiper-slide:not(.swiper-slide-active):not(.swiper-slide-next):not(.swiper-slide-prev)) {
  opacity: 0 !important;
  transform: scale(0.5);
  pointer-events: none;
  visibility: hidden;
}

/* Hide default Swiper navigation buttons */
.hero-slider :deep(.swiper-button-prev),
.hero-slider :deep(.swiper-button-next) {
  display: none;
}

/* Custom navigation buttons styling */
.custom-prev,
.custom-next {
  backdrop-filter: blur(10px);
}

/* Pagination Styling */
.hero-slider :deep(.swiper-pagination) {
  bottom: 10px;
  text-align: center;
}

.hero-slider :deep(.swiper-pagination-bullet) {
  background-color: #9ca3af;
  width: 7px;
  height: 7px;
  margin: 0 3px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.hero-slider :deep(.swiper-pagination-bullet:hover) {
  background-color: #6b7280;
  transform: scale(1.2);
  opacity: 0.8;
}

.hero-slider :deep(.swiper-pagination-bullet-active) {
  background-color: #006ea5;
  width: 24px;
  border-radius: 4px;
  opacity: 1;
}

/* Pagination responsive sizing */
@media (min-width: 640px) {
  .hero-slider :deep(.swiper-pagination) {
    bottom: 12px;
  }
  
  .hero-slider :deep(.swiper-pagination-bullet) {
    width: 8px;
    height: 8px;
    margin: 0 4px;
  }
  
  .hero-slider :deep(.swiper-pagination-bullet-active) {
    width: 26px;
  }
}

@media (min-width: 1024px) {
  .hero-slider :deep(.swiper-pagination) {
    bottom: 15px;
  }
  
  .hero-slider :deep(.swiper-pagination-bullet) {
    width: 9px;
    height: 9px;
    margin: 0 5px;
  }
  
  .hero-slider :deep(.swiper-pagination-bullet-active) {
    width: 30px;
  }
}

/* Responsive adjustments */

/* Extra Large Screens (1920px+) */
@media (min-width: 1920px) {
  .hero-slider {
    padding: 25px 0 30px 0;
    min-height: 540px;
  }
  
  .hero-slider :deep(.swiper-wrapper) {
    padding: 12px 0;
  }
  
  .hero-slider :deep(.swiper-slide-active) {
    transform: scale(1.15) !important;
  }
  
  .hero-slider :deep(.swiper-slide-next),
  .hero-slider :deep(.swiper-slide-prev) {
    opacity: 0.55;
    transform: scale(0.7);
  }
}

/* Large Desktop (1536px - 1919px) */
@media (min-width: 1536px) and (max-width: 1919px) {
  .hero-slider {
    padding: 23px 0 28px 0;
    min-height: 520px;
  }
  
  .hero-slider :deep(.swiper-wrapper) {
    padding: 11px 0;
  }
  
  .hero-slider :deep(.swiper-slide-active) {
    transform: scale(1.13) !important;
  }
  
  .hero-slider :deep(.swiper-slide-next),
  .hero-slider :deep(.swiper-slide-prev) {
    opacity: 0.52;
    transform: scale(0.71);
  }
}

/* Desktop (1280px - 1535px) */
@media (min-width: 1280px) and (max-width: 1535px) {
  .hero-slider {
    padding: 22px 0 27px 0;
    min-height: 500px;
  }
  
  .hero-slider :deep(.swiper-wrapper) {
    padding: 10px 0;
  }
  
  .hero-slider :deep(.swiper-slide-active) {
    transform: scale(1.12) !important;
  }
  
  .hero-slider :deep(.swiper-slide-next),
  .hero-slider :deep(.swiper-slide-prev) {
    opacity: 0.5;
    transform: scale(0.72);
  }
}

/* Laptop (1024px - 1279px) */
@media (min-width: 1024px) and (max-width: 1279px) {
  .hero-slider {
    padding: 20px 0 25px 0;
    min-height: 480px;
  }
  
  .hero-slider :deep(.swiper-wrapper) {
    padding: 10px 0;
  }
  
  .hero-slider :deep(.swiper-slide-active) {
    transform: scale(1.1) !important;
  }
  
  .hero-slider :deep(.swiper-slide-next),
  .hero-slider :deep(.swiper-slide-prev) {
    opacity: 0.48;
    transform: scale(0.73);
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .hero-slider {
    padding: 18px 0 23px 0;
    min-height: 460px;
  }
  
  .hero-slider :deep(.swiper-wrapper) {
    padding: 9px 0;
  }
  
  .hero-slider :deep(.swiper-slide) {
    transform: scale(0.68);
    opacity: 0.25;
  }
  
  .hero-slider :deep(.swiper-slide-active) {
    transform: scale(1.08) !important;
    opacity: 1 !important;
  }
  
  .hero-slider :deep(.swiper-slide-next),
  .hero-slider :deep(.swiper-slide-prev) {
    opacity: 0.45;
    transform: scale(0.75);
  }
}

/* Mobile Landscape / Small Tablet (640px - 767px) */
@media (min-width: 640px) and (max-width: 767px) {
  .hero-slider {
    padding: 16px 0 20px 0;
    min-height: 430px;
  }
  
  .hero-slider :deep(.swiper-wrapper) {
    padding: 8px 0;
  }
  
  .hero-slider :deep(.swiper-slide) {
    transform: scale(0.7);
    opacity: 0.25;
  }
  
  .hero-slider :deep(.swiper-slide-active) {
    transform: scale(1.05) !important;
    opacity: 1 !important;
  }
  
  .hero-slider :deep(.swiper-slide-next),
  .hero-slider :deep(.swiper-slide-prev) {
    opacity: 0.42;
    transform: scale(0.77);
  }
}

/* Mobile Portrait (480px - 639px) */
@media (min-width: 480px) and (max-width: 639px) {
  .hero-slider {
    padding: 14px 0 18px 0;
    min-height: 390px;
  }
  
  .hero-slider :deep(.swiper-wrapper) {
    padding: 7px 0;
  }
  
  .hero-slider :deep(.swiper-slide) {
    transform: scale(0.72);
    opacity: 0.22;
  }
  
  .hero-slider :deep(.swiper-slide-active) {
    transform: scale(1.03) !important;
    opacity: 1 !important;
  }
  
  .hero-slider :deep(.swiper-slide-next),
  .hero-slider :deep(.swiper-slide-prev) {
    opacity: 0.38;
    transform: scale(0.79);
  }
}

/* Small Mobile (< 480px) */
@media (max-width: 479px) {
  .hero-slider {
    padding: 12px 0 16px 0;
    min-height: 370px;
  }
  
  .hero-slider :deep(.swiper-wrapper) {
    padding: 6px 0;
  }
  
  .hero-slider :deep(.swiper-slide) {
    transform: scale(0.73);
    opacity: 0.2;
  }
  
  .hero-slider :deep(.swiper-slide-active) {
    transform: scale(1) !important;
    opacity: 1 !important;
  }
  
  .hero-slider :deep(.swiper-slide-next),
  .hero-slider :deep(.swiper-slide-prev) {
    opacity: 0.35;
    transform: scale(0.8);
  }
}
</style>
