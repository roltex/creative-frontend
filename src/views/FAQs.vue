<template>
  <div class="container-fluid py-8 lg:py-8">
    <FAQSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import FAQSection from '../components/common/FAQSection.vue'
import { useFaqsStore } from '../stores/faqs'

const faqsStore = useFaqsStore()

onMounted(async () => {
  if (!faqsStore.initialized) {
    await faqsStore.fetchFaqs()
  }
})
</script>

