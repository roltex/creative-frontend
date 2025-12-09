<template>
  <div>
    <!-- Hero Banner -->
    <HeroBanner />
    
    <!-- CTA Section -->
    <section class="section bg-primary-500 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-24 h-24 bg-secondary-300 rounded-full blur-2xl"></div>
        <div class="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full blur-xl"></div>
      </div>
      
      <div class="container-fluid text-center relative z-10">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl lg:text-5xl font-bold text-white mb-6 font-headline leading-tight">
            მზად ხარ შემოქმედებითი მოგზაურობისთვის?
          </h2>
          <p class="text-lg lg:text-xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            შემოუერთდი ათასობით მხატვარს და შემოქმედს, რომლებმაც ჩვენი მხარდაჭერით თავიანთი იდეები რეალობად აქციეს
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <RouterLink
              :to="{ name: 'application-step-1' }"
              class="flex items-center space-x-3 px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-headline text-lg font-medium transform hover:scale-105"
            >
              <span>{{ $t('header.fillApplicationForm') }}</span>
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </RouterLink>
          </div>
          
          <!-- Dynamic Stats or Features -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10">
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2 font-headline">
                {{ statistics?.supported_projects ? `${Math.floor(statistics.supported_projects / 1000)}K+` : '1000+' }}
              </div>
              <div class="text-primary-200 text-sm">მხარდაჭერილი პროექტი</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2 font-headline">
                {{ statistics?.successful_creators ? `${statistics.successful_creators}+` : '500+' }}
              </div>
              <div class="text-primary-200 text-sm">წარმატებული შემოქმედი</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2 font-headline">
                {{ statistics?.total_funding ? `${Math.floor(statistics.total_funding / 1000000)}M+` : '50M+' }}
              </div>
              <div class="text-primary-200 text-sm">ლარი დაფინანსება</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Current Competitions -->
    <section class="section bg-gray-50 overflow-hidden">
      <div class="container-fluid">
        <CompetitionsSlider :limit="12" status="current" />
      </div>
    </section>

    <!-- Latest News -->
    <section class="section bg-white overflow-hidden">
      <div class="container-fluid">
        <NewsSlider :limit="4" />
      </div>
    </section>

    <!-- Upcoming Events -->
    <section class="section bg-gray-50">
      <div class="container-fluid">
        <SectionHeader
          :title="$t('sections.upcomingEvents')"
          :link="{ text: $t('common.viewAll'), to: { name: 'events' } }"
        />
        <EventsCalendarGrid :limit="4" />
      </div>
    </section>

    <!-- Success Stories -->
    <section class="section bg-white overflow-hidden">
        <SuccessStoriesSlider />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import HeroBanner from '../components/home/HeroBanner.vue'
import SectionHeader from '../components/common/SectionHeader.vue'
import CompetitionsSlider from '../components/competitions/CompetitionsSlider.vue'
import NewsSlider from '../components/news/NewsSlider.vue'
import SuccessStoriesSlider from '../components/home/SuccessStoriesSlider.vue'
import EventsCalendarGrid from '../components/events/EventsCalendarGrid.vue' // Calendar grid component
// import FAQSection from '../components/common/FAQSection.vue'
import { useCompetitionsStore } from '../stores/competitions'
import { useNewsStore } from '../stores/news'
import { useEventsStore } from '../stores/events'
import { useSettingsStore } from '../stores/settings'
// import { useFaqsStore } from '../stores/faqs'

// Initialize stores
const competitionsStore = useCompetitionsStore()
const newsStore = useNewsStore()
const eventsStore = useEventsStore()
const settingsStore = useSettingsStore()
// const faqsStore = useFaqsStore()

// Dynamic statistics
const statistics = computed(() => settingsStore.getStatistics())

onMounted(async () => {
  console.log('Home mounted, loading data...')
  // Load all homepage data in parallel
  await Promise.all([
    competitionsStore.fetchCompetitions(),
    newsStore.fetchArticles(),
    eventsStore.fetchEvents(),
    settingsStore.fetchSettings()
    // faqsStore.fetchFaqs()
  ])
  console.log('All data loaded')
})
</script>
