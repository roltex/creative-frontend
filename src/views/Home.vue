<template>
  <div>
    <!-- Hero Banner -->
    <HeroBanner v-if="sections.hero_banner !== false" />
    
    <!-- CTA Section -->
    <section v-if="sections.cta !== false" class="section bg-primary-500 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-24 h-24 bg-secondary-300 rounded-full blur-2xl"></div>
        <div class="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full blur-xl"></div>
      </div>
      
      <div class="container-fluid text-center relative z-10">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl lg:text-5xl font-bold text-white mb-6 font-headline leading-tight">
            {{ ctaTitle }}
          </h2>
          <p class="text-lg lg:text-xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            {{ ctaSubtitle }}
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <RouterLink
              :to="ctaButtonUrl"
              class="flex items-center space-x-3 px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-headline text-lg font-medium transform hover:scale-105"
            >
              <span>{{ ctaButtonText }}</span>
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </RouterLink>
          </div>
          
          <!-- Dynamic Stats -->
          <div
            v-if="ctaStats.length > 0"
            class="grid gap-8 mt-16 pt-16 border-t border-white/10"
            :class="`grid-cols-1 md:grid-cols-${ctaStats.length}`"
          >
            <div v-for="(stat, index) in ctaStats" :key="index" class="text-center">
              <div class="text-3xl font-bold text-white mb-2 font-headline">
                {{ stat.value }}{{ stat.suffix }}
              </div>
              <div class="text-primary-200 text-sm">{{ getLabel(stat.label) }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Current Competitions -->
    <section v-if="sections.competitions?.visible !== false" class="section bg-gray-50 overflow-hidden">
      <div class="container-fluid">
        <CompetitionsSlider :limit="12" status="current" :title="competitionsTitle" />
      </div>
    </section>

    <!-- Latest News -->
    <section v-if="sections.news?.visible !== false" class="section bg-white overflow-hidden">
      <div class="container-fluid">
        <NewsSlider :limit="4" :title="newsTitle" />
      </div>
    </section>

    <!-- Upcoming Events -->
    <section v-if="sections.events?.visible !== false" class="section bg-gray-50">
      <div class="container-fluid">
        <SectionHeader
          :title="eventsTitle"
          :link="{ text: $t('common.viewAll'), to: { name: 'events' } }"
        />
        <EventsCalendarGrid :limit="4" />
      </div>
    </section>

    <!-- Success Stories -->
    <section v-if="sections.success_stories?.visible" class="section bg-white overflow-hidden">
      <SuccessStoriesSlider />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroBanner from '../components/home/HeroBanner.vue'
import SectionHeader from '../components/common/SectionHeader.vue'
import CompetitionsSlider from '../components/competitions/CompetitionsSlider.vue'
import NewsSlider from '../components/news/NewsSlider.vue'
import SuccessStoriesSlider from '../components/home/SuccessStoriesSlider.vue'
import EventsCalendarGrid from '../components/events/EventsCalendarGrid.vue'
import { useCompetitionsStore } from '../stores/competitions'
import { useNewsStore } from '../stores/news'
import { useEventsStore } from '../stores/events'
import { useSettingsStore } from '../stores/settings'

const { locale } = useI18n()

const competitionsStore = useCompetitionsStore()
const newsStore = useNewsStore()
const eventsStore = useEventsStore()
const settingsStore = useSettingsStore()

const homepage = computed(() => settingsStore.getHomepageSettings())
const lang = computed(() => locale.value as 'ka' | 'en')

const sections = computed(() => homepage.value?.sections ?? {
  hero_banner: true,
  cta: true,
  competitions: { visible: true, title: { ka: 'მიმდინარე კონკურსები', en: 'Current Competitions' } },
  news: { visible: true, title: { ka: 'უახლესი სიახლეები', en: 'Latest News' } },
  events: { visible: true, title: { ka: 'მოახლოებული ღონისძიებები', en: 'Upcoming Events' } },
  success_stories: { visible: false, title: { ka: 'წარმატებული ისტორიები', en: 'Success Stories' } },
})

const cta = computed(() => homepage.value?.cta)

const ctaTitle = computed(() =>
  cta.value?.title?.[lang.value] || (lang.value === 'ka' ? 'მზად ხარ შემოქმედებითი მოგზაურობისთვის?' : 'Ready for a Creative Journey?')
)

const ctaSubtitle = computed(() =>
  cta.value?.subtitle?.[lang.value] || (lang.value === 'ka'
    ? 'შემოუერთდი ათასობით მხატვარს და შემოქმედს, რომლებმაც ჩვენი მხარდაჭერით თავიანთი იდეები რეალობად აქციეს'
    : 'Join thousands of artists and creators who turned their ideas into reality with our support')
)

const ctaButtonText = computed(() =>
  cta.value?.button_text?.[lang.value] || (lang.value === 'ka' ? 'შეავსე განაცხადის ფორმა' : 'Fill Application Form')
)

const ctaButtonUrl = computed(() => cta.value?.button_url || '/application/step-1')

const ctaStats = computed(() => cta.value?.stats ?? [
  { value: '1', suffix: 'K+', label: { ka: 'მხარდაჭერილი პროექტი', en: 'Supported Projects' } },
  { value: '500', suffix: '+', label: { ka: 'წარმატებული შემოქმედი', en: 'Successful Creators' } },
  { value: '50', suffix: 'M+', label: { ka: 'ლარი დაფინანსება', en: 'GEL Funding' } },
])

function getLabel(label: { ka: string; en: string } | string): string {
  if (typeof label === 'string') return label
  return label?.[lang.value as keyof typeof label] || label?.ka || ''
}

const competitionsTitle = computed(() => {
  const s = sections.value.competitions
  if (s && typeof s === 'object' && 'title' in s) {
    return s.title?.[lang.value] || (lang.value === 'ka' ? 'მიმდინარე კონკურსები' : 'Current Competitions')
  }
  return lang.value === 'ka' ? 'მიმდინარე კონკურსები' : 'Current Competitions'
})

const newsTitle = computed(() => {
  const s = sections.value.news
  if (s && typeof s === 'object' && 'title' in s) {
    return s.title?.[lang.value] || (lang.value === 'ka' ? 'უახლესი სიახლეები' : 'Latest News')
  }
  return lang.value === 'ka' ? 'უახლესი სიახლეები' : 'Latest News'
})

const eventsTitle = computed(() => {
  const s = sections.value.events
  if (s && typeof s === 'object' && 'title' in s) {
    return s.title?.[lang.value] || (lang.value === 'ka' ? 'მოახლოებული ღონისძიებები' : 'Upcoming Events')
  }
  return lang.value === 'ka' ? 'მოახლოებული ღონისძიებები' : 'Upcoming Events'
})

onMounted(async () => {
  await Promise.all([
    competitionsStore.fetchCompetitions(),
    newsStore.fetchArticles(),
    eventsStore.fetchEvents(),
    settingsStore.fetchSettings()
  ])
})
</script>
