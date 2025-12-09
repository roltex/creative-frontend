<template>
  <div class="container-fluid py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('news.title') }}</h1>
    <NewsGrid />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import NewsGrid from '../../components/news/NewsGrid.vue'
import { useNewsStore } from '../../stores/news'

const newsStore = useNewsStore()

onMounted(async () => {
  // Ensure news articles are fetched
  if (!newsStore.initialized) {
    await newsStore.fetchArticles()
  }
})
</script>
