<template>
  <div class="container-fluid py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('nav.competitions') }}</h1>
    <CompetitionsGrid />
  </div>
</template>

<script setup lang="ts">
import CompetitionsGrid from '../../components/competitions/CompetitionsGrid.vue'
</script>
