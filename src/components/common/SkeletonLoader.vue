<template>
  <div>
    <!-- Card Skeleton -->
    <div v-if="type === 'card'" class="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div class="h-48 bg-gray-200"></div>
      <div class="p-6">
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-6 bg-gray-200 rounded mb-3"></div>
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>

    <!-- Article Skeleton -->
    <div v-else-if="type === 'article'" class="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
        <div class="flex-1">
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div class="h-6 bg-gray-200 rounded mb-3"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 rounded"></div>
        <div class="h-4 bg-gray-200 rounded"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>

    <!-- List Skeleton -->
    <div v-else-if="type === 'list'" class="space-y-4">
      <div v-for="i in count" :key="i" class="flex items-center space-x-4 p-4 bg-white rounded-lg shadow animate-pulse">
        <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
        <div class="flex-1">
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>

    <!-- Grid Skeleton -->
    <div v-else-if="type === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in count" :key="i" class="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div class="h-48 bg-gray-200"></div>
        <div class="p-6">
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-6 bg-gray-200 rounded mb-3"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>

    <!-- Text Skeleton -->
    <div v-else-if="type === 'text'" class="animate-pulse">
      <div class="space-y-3">
        <div v-for="i in count" :key="i" class="h-4 bg-gray-200 rounded" :class="i === count ? 'w-3/4' : 'w-full'"></div>
      </div>
    </div>

    <!-- Hero Skeleton -->
    <div v-else-if="type === 'hero'" class="animate-pulse">
      <div class="text-center mb-16">
        <div class="h-12 bg-gray-200 rounded-md mb-6 max-w-md mx-auto"></div>
        <div class="h-6 bg-gray-200 rounded-md max-w-3xl mx-auto"></div>
      </div>
    </div>

    <!-- Navigation Skeleton -->
    <div v-else-if="type === 'navigation'" class="animate-pulse">
      <div class="flex space-x-6">
        <div v-for="i in count" :key="i" class="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    </div>

    <!-- Table Skeleton -->
    <div v-else-if="type === 'table'" class="animate-pulse">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <!-- Header -->
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div class="flex space-x-4">
            <div v-for="i in 4" :key="i" class="h-4 bg-gray-200 rounded flex-1"></div>
          </div>
        </div>
        <!-- Rows -->
        <div class="divide-y divide-gray-200">
          <div v-for="i in count" :key="i" class="px-6 py-4">
            <div class="flex space-x-4">
              <div v-for="j in 4" :key="j" class="h-4 bg-gray-200 rounded flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Skeleton -->
    <div v-else class="animate-pulse">
      <slot name="custom">
        <div class="h-20 bg-gray-200 rounded"></div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'card' | 'article' | 'list' | 'grid' | 'text' | 'hero' | 'navigation' | 'table' | 'custom'
  count?: number
}

withDefaults(defineProps<Props>(), {
  type: 'card',
  count: 3
})
</script>
