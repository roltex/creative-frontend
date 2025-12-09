<template>
  <div class="relative">
    <!-- Header -->
    <div class="text-center mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-4 font-headline">
        {{ $t('faq.title') }}
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        {{ $t('faq.subtitle') }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="!initialized" class="space-y-4">
      <div v-for="i in 6" :key="i" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6">
          <div class="skeleton h-6 w-3/4 mb-3"></div>
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-2/3"></div>
        </div>
      </div>
    </div>

    <!-- FAQ Accordion -->
    <div v-else-if="faqs && faqs.length > 0" class="space-y-4">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
      >
        <button
          @click="toggleFaq(faq.id)"
          class="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
        >
          <h3 class="text-lg font-semibold text-gray-900 pr-4 font-headline">
            {{ faq.question[$i18n.locale as 'ka' | 'en'] }}
          </h3>
          <div
            class="flex-shrink-0 w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center transition-all duration-300"
            :class="{ 'rotate-45': openFaqs.includes(faq.id) }"
          >
            <Plus class="w-5 h-5" />
          </div>
        </button>
        
        <Transition
          name="faq-content"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div
            v-if="openFaqs.includes(faq.id)"
            class="px-6 pb-6 border-t border-gray-100"
          >
            <div class="pt-4 text-gray-700 leading-relaxed">
              {{ faq.answer[$i18n.locale as 'ka' | 'en'] }}
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
      <HelpCircle class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('common.noResults') }}</h3>
      <p class="text-gray-600">{{ $t('faq.noFaqsAvailable') }}</p>
    </div>

    <!-- Contact CTA -->
    <div class="mt-12 text-center">
      <div class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
        <h3 class="text-xl font-semibold text-gray-900 mb-3 font-headline">
          {{ $t('faq.noAnswer') }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{ $t('faq.contactTeam') }}
        </p>
        <RouterLink
          :to="{ name: 'contact' }"
          class="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline"
        >
          <Mail class="w-5 h-5" />
          <span>{{ $t('faq.contact') }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Plus, HelpCircle, Mail } from 'lucide-vue-next'
import { useFaqsStore } from '../../stores/faqs'

const { } = useI18n()
const faqsStore = useFaqsStore()

const faqs = computed(() => faqsStore.faqs)
const initialized = computed(() => faqsStore.initialized)
const openFaqs = ref<string[]>([])

const toggleFaq = (faqId: string) => {
  const index = openFaqs.value.indexOf(faqId)
  if (index > -1) {
    openFaqs.value.splice(index, 1)
  } else {
    openFaqs.value.push(faqId)
  }
}

onMounted(async () => {
  if (!initialized.value) {
    await faqsStore.fetchFaqs()
  }
})
</script>

<style scoped>
/* Skeleton loading animation */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 0.375rem;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* FAQ Content Animation */
.faq-content-enter-active,
.faq-content-leave-active {
  overflow: hidden;
}

.faq-content-enter-from,
.faq-content-leave-to {
  max-height: 0;
  opacity: 0;
}

.faq-content-enter-to,
.faq-content-leave-from {
  max-height: 24rem; /* Adjust based on content */
  opacity: 1;
}
</style>
