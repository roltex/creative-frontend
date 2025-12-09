<template>
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-2xl lg:text-3xl font-bold text-gray-900">
      {{ title }}
    </h2>
    <RouterLink
      v-if="link"
      :to="link.to"
      class="flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors"
    >
      {{ link.text }}
      <ArrowRight class="w-5 h-5 ml-1" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  title: string
  link?: {
    text: string
    to: RouteLocationRaw
  }
}

defineProps<Props>()
</script>
