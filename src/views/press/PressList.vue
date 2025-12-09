<template>
  <div class="container-fluid py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('press.title') }}</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-8">{{ $t('press.subtitle') }}</p>
    <PressGrid />
  </div>
</template>

<script setup lang="ts">
import PressGrid from '../../components/press/PressGrid.vue'
</script>

