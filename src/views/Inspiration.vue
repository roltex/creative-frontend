<template>
  <div class="container-fluid py-8 lg:py-8">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-headline">
        {{ $t('inspiration.title') }}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {{ $t('inspiration.subtitle') }}
      </p>
    </div>

    <!-- Success Stories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      <RouterLink
        v-for="story in successStories" 
        :key="story.id" 
        :to="{ name: 'success-story-details', params: { slug: story.slug } }"
        class="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
      >
        <div class="relative h-64 overflow-hidden">
          <img :src="getImageUrl(story.image)" :alt="story.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <h3 class="text-2xl font-bold text-white mb-2 font-headline">{{ story.name }}</h3>
            <p class="text-white/90 text-sm line-clamp-2">{{ story.category }}</p>
          </div>
        </div>
        <div class="p-6">
          <p class="text-gray-700 leading-relaxed mb-4">{{ story.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">{{ story.year }}</span>
            <span class="text-primary-600 hover:text-primary-700 font-medium text-sm">
              {{ $t('successStory.moreInfo') }} →
            </span>
          </div>
        </div>
      </RouterLink>
    </div>

    <!-- Inspirational Quote -->
    <section class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 lg:p-16 text-white text-center mb-16">
      <svg class="w-16 h-16 mx-auto mb-6 opacity-80" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
      </svg>
      <p class="text-2xl lg:text-3xl font-medium mb-6 leading-relaxed font-headline">
        "{{ $t('inspiration.quote') }}"
      </p>
      <p class="text-lg opacity-90">{{ $t('inspiration.quoteAuthor') }}</p>
    </section>

    <!-- CTA Section -->
    <section class="bg-gray-50 rounded-3xl p-12 text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-4 font-headline">{{ $t('inspiration.readyToCreate') }}</h2>
      <p class="text-xl text-gray-600 mb-8">{{ $t('inspiration.joinCreative') }}</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink
          :to="{ name: 'competitions-current' }"
          class="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline"
        >
          {{ $t('inspiration.viewCompetitions') }}
        </RouterLink>
        <RouterLink
          to="/application"
          class="px-8 py-4 bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline"
        >
          {{ $t('inspiration.fillApplication') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getImageUrl } from '../utils/imageUrl'

const successStories = ref([
  {
    id: 1,
    slug: 'ana-javakhishvili',
    name: 'ანა ჯავახიშვილი',
    category: 'ვიზუალური ხელოვნება',
    description: 'გრანტის მიღების შემდეგ გახსნა თანამედროვე ხელოვნების გალერეა თბილისში, სადაც დღეს გამოფენილია ათობით მხატვრის ნამუშევარი.',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400'
  },
  {
    id: 2,
    slug: 'giorgi-maisuradze',
    name: 'გიორგი მაისურაძე',
    category: 'კინო და ვიდეო',
    description: 'დოკუმენტური ფილმით მოიგო საერთაშორისო კინოფესტივალზე ჯილდო და წარმოდგენილი იქნა Sundance-ზე.',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    id: 3,
    slug: 'nino-khutateladze',
    name: 'ნინო ქუთათელაძე',
    category: 'დიზაინი',
    description: 'ტრადიციული ქართული ხალიჩების თანამედროვე დიზაინით საერთაშორისო წარმატება და გაყიდვები მსოფლიო მაღაზიებში.',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  {
    id: 4,
    slug: 'davit-karkashadze',
    name: 'დავით ქარქაშაძე',
    category: 'მუსიკა',
    description: 'მუსიკალური ალბომით ევროპის ჯაზ ფესტივალებზე წარმატებული გასტროლები და კრიტიკული აღიარება.',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
  },
  {
    id: 5,
    slug: 'mariam-lortkipanidze',
    name: 'მარიამ ლორთქიფანიძე',
    category: 'ლიტერატურა',
    description: 'ლიტერატურული თარგმანით მოიგო საქართველოს ეროვნული ლიტერატურული ჯილდო და წარმატებით გაიყიდა.',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  },
  {
    id: 6,
    slug: 'luka-ghlonti',
    name: 'ლუკა ღლონტი',
    category: 'ფოტოგრაფია',
    description: 'ფოტოგრაფიული პროექტით წარმოდგენილი იქნა ნიუ-იორკის MoMA-ში და მიიღო საერთაშორისო აღიარება.',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
  }
])
</script>
