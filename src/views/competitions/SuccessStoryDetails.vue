<template>
  <div class="container-fluid py-8 lg:py-8">
    <!-- Loading State -->
    <div v-if="!story" class="text-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
      <p class="text-gray-600">{{ $t('common.loading') }}</p>
    </div>

    <!-- Story Details -->
    <div v-else>
      <!-- Hero Section -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div class="relative h-96 lg:h-[500px]">
          <img
            :src="getImageUrl(story.image)"
            :alt="story.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <!-- Content Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
            <div class="max-w-4xl">
              <span class="px-4 py-2 bg-secondary-500 rounded-full text-sm font-semibold mb-4 inline-block">
                {{ story.category }}
              </span>
              <h1 class="text-4xl lg:text-5xl font-bold mb-4 font-headline">
                {{ story.name }}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Story Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12 mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-6 font-headline">{{ $t('successStory.story') }}</h2>
            <div class="prose prose-lg max-w-none text-gray-700">
              <p class="leading-relaxed mb-4">
                {{ story.description }}
              </p>
              <p v-if="story.fullDescription" class="leading-relaxed">
                {{ story.fullDescription }}
              </p>
            </div>
          </div>

          <!-- Achievements -->
          <div v-if="story.achievements && story.achievements.length > 0" class="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-6 font-headline">{{ $t('successStory.achievements') }}</h2>
            <ul class="space-y-4">
              <li v-for="(achievement, index) in story.achievements" :key="index" class="flex items-start">
                <CheckCircle class="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                <span class="text-gray-700 text-lg">{{ achievement }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Quick Info -->
          <div class="bg-white rounded-3xl shadow-lg p-6 mb-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4 font-headline">{{ $t('successStory.info') }}</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-600 mb-1">{{ $t('successStory.competitionName') }}</p>
                <p class="text-lg font-semibold text-gray-900">{{ story.competition }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 mb-1">{{ $t('successStory.year') }}</p>
                <p class="text-lg font-semibold text-gray-900">{{ story.year }}</p>
              </div>
              <div v-if="story.amount">
                <p class="text-sm text-gray-600 mb-1">{{ $t('successStory.amount') }}</p>
                <p class="text-lg font-semibold text-gray-900">₾{{ story.amount }}</p>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-6 text-white text-center">
            <Trophy class="w-12 h-12 mx-auto mb-4" />
            <h3 class="text-xl font-bold mb-2 font-headline">{{ $t('successStory.beNext') }}</h3>
            <p class="text-sm opacity-90 mb-4">{{ $t('resources.fillApplicationForm') }}</p>
            <RouterLink
              :to="{ name: 'application-step-1' }"
              class="inline-flex items-center px-6 py-3 bg-white text-primary-600 hover:bg-gray-100 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline text-sm"
            >
              <span>{{ $t('common.apply') }}</span>
              <ChevronRight class="w-4 h-4 ml-2" />
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Related Stories -->
      <div v-if="relatedStories.length > 0" class="mt-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 font-headline">{{ $t('successStory.related') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RouterLink
            v-for="relatedStory in relatedStories"
            :key="relatedStory.id"
            :to="{ name: 'success-story-details', params: { slug: relatedStory.slug } }"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div class="relative h-48 overflow-hidden">
              <img :src="getImageUrl(relatedStory.image)" :alt="relatedStory.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-xl font-bold text-white mb-1 font-headline">{{ relatedStory.name }}</h3>
                <p class="text-white/90 text-xs">{{ relatedStory.category }}</p>
              </div>
            </div>
            <div class="p-4">
              <p class="text-gray-700 text-sm line-clamp-2">{{ relatedStory.description }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronRight, CheckCircle, Trophy } from 'lucide-vue-next'
import { getImageUrl } from '../../utils/imageUrl'

interface SuccessStory {
  id: number
  name: string
  category: string
  competition: string
  description: string
  fullDescription?: string
  year: string
  amount?: number
  image: string
  achievements?: string[]
  slug: string
}

const route = useRoute()
const router = useRouter()

const story = ref<SuccessStory | null>(null)

const mockStories: SuccessStory[] = [
  {
    id: 1,
    name: 'ანა ჯავახიშვილი',
    category: 'ვიზუალური ხელოვნება',
    competition: 'თანამედროვე ხელოვნების განვითარების პროგრამა',
    description: 'გრანტის მიღების შემდეგ გახსნა თანამედროვე ხელოვნების გალერეა თბილისში, სადაც დღეს გამოფენილია ათობით მხატვრის ნამუშევარი.',
    fullDescription: 'ანა ჯავახიშვილმა შემოქმედებითი საქართველოს მხარდაჭერით დააარსა თანამედროვე ხელოვნების გალერეა თბილისში. პროექტმა საშუალება მისცა ათობით ახალგაზრდა მხატვარს თავისი ნამუშევრების გამოფენას. დღეს გალერეა აქტიურად მუშაობს და საერთაშორისო დონეზე არის აღიარებული.',
    year: '2023',
    amount: 50000,
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400',
    achievements: [
      'გალერეის გახსნა თბილისში',
      '100+ მხატვრის ნამუშევრის გამოფენა',
      'საერთაშორისო აღიარება',
      'კულტურული ღონისძიებების ორგანიზება'
    ],
    slug: 'ana-javakhishvili'
  },
  {
    id: 2,
    name: 'გიორგი მაისურაძე',
    category: 'კინო და ვიდეო',
    competition: 'კინემატოგრაფიის მხარდაჭერის პროგრამა',
    description: 'დოკუმენტური ფილმით მოიგო საერთაშორისო კინოფესტივალზე ჯილდო და წარმოდგენილი იქნა Sundance-ზე.',
    fullDescription: 'გიორგი მაისურაძე შემოქმედებითი საქართველოს გრანტით შექმნა დოკუმენტური ფილმი, რომელმაც საერთაშორისო აღიარება მოიპოვა. ფილმი წარმოდგენილი იქნა Sundance და Berlin კინოფესტივალებზე.',
    year: '2022',
    amount: 80000,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    achievements: [
      'საერთაშორისო კინოფესტივალზე ჯილდო',
      'Sundance-ზე წარმოდგენა',
      'Berlin კინოფესტივალზე წარმოდგენა',
      'მედიაში შეფასება'
    ],
    slug: 'giorgi-maisuradze'
  },
  {
    id: 3,
    name: 'ნინო ქუთათელაძე',
    category: 'დიზაინი',
    competition: 'დიზაინისა და გამოყენებითი ხელოვნების გრანტი',
    description: 'ტრადიციული ქართული ხალიჩების თანამედროვე დიზაინით საერთაშორისო წარმატება და გაყიდვები მსოფლიო მაღაზიებში.',
    fullDescription: 'ნინო ქუთათელაძემ ტრადიციული ქართული ხალიჩების თანამედროვე დიზაინით გამოაშკარავა ქართული კულტურა მსოფლიო თვალწინ. მისი ნამუშევრები გაიყიდა მსოფლიოს მრავალ ქვეყანაში.',
    year: '2024',
    amount: 60000,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    achievements: [
      'საერთაშორისო წარმატება',
      'მსოფლიო მაღაზიებში გაყიდვები',
      'ტრადიციული კულტურის პოპულარიზაცია',
      'დიზაინული ინოვაციების განვითარება'
    ],
    slug: 'nino-khutateladze'
  },
  {
    id: 4,
    name: 'დავით ქარქაშაძე',
    category: 'მუსიკა',
    competition: 'მუსიკალური პროექტების მხარდაჭერის პროგრამა',
    description: 'მუსიკალური ალბომით ევროპის ჯაზ ფესტივალებზე წარმატებული გასტროლები და კრიტიკული აღიარება.',
    fullDescription: 'დავით ქარქაშაძემ შემოქმედებითი საქართველოს გრანტით გამოუშვა მუსიკალური ალბომი, რომელმაც აღიარება მოიპოვა ევროპის ჯაზ ფესტივალებზე.',
    year: '2023',
    amount: 40000,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    achievements: [
      'ევროპის ჯაზ ფესტივალებზე გასტროლები',
      'კრიტიკული აღიარება',
      'ალბომის გამოშვება',
      'საერთაშორისო აღიარება'
    ],
    slug: 'davit-karkashadze'
  },
  {
    id: 5,
    name: 'მარიამ ლორთქიფანიძე',
    category: 'ლიტერატურა',
    competition: 'ლიტერატურული თარგმანისა და გამოცემების გრანტი',
    description: 'ლიტერატურული თარგმანით მოიგო საქართველოს ეროვნული ლიტერატურული ჯილდო და წარმატებით გაიყიდა.',
    fullDescription: 'მარიამ ლორთქიფანიძემ შემოქმედებითი საქართველოს მხარდაჭერით გამოიცა ლიტერატურული თარგმანი, რომელმაც ეროვნული ლიტერატურული ჯილდო მოიპოვა.',
    year: '2024',
    amount: 35000,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    achievements: [
      'ეროვნული ლიტერატურული ჯილდო',
      'წარმატებული გაყიდვა',
      'ლიტერატურული თარგმანების განვითარება',
      'კრიტიკული აღიარება'
    ],
    slug: 'mariam-lortkipanidze'
  },
  {
    id: 6,
    name: 'ლუკა ღლონტი',
    category: 'ფოტოგრაფია',
    competition: 'ვიზუალური ხელოვნების საერთაშორისო პროექტების გრანტი',
    description: 'ფოტოგრაფიული პროექტით წარმოდგენილი იქნა ნიუ-იორკის MoMA-ში და მიიღო საერთაშორისო აღიარება.',
    fullDescription: 'ლუკა ღლონტიმ შემოქმედებითი საქართველოს გრანტით შექმნა ფოტოგრაფიული პროექტი, რომელიც წარმოდგენილი იქნა ნიუ-იორკის MoMA-ში.',
    year: '2023',
    amount: 70000,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    achievements: [
      'MoMA-ში წარმოდგენა',
      'საერთაშორისო აღიარება',
      'ფოტოგრაფიული პროექტის განვითარება',
      'გალერეებში გამოფენა'
    ],
    slug: 'luka-ghlonti'
  }
]

const relatedStories = computed(() => {
  if (!story.value) return []
  return mockStories.filter(s => s.id !== story.value!.id && s.category === story.value!.category).slice(0, 3)
})

onMounted(() => {
  const slug = route.params.slug as string
  const foundStory = mockStories.find(s => s.slug === slug)
  
  if (foundStory) {
    story.value = foundStory
  } else {
    router.push({ name: 'competitions-success-stories' })
  }
})
</script>

