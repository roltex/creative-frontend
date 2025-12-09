<template>
  <div class="container-fluid py-8 lg:py-8">
    <SectionHeader
      :title="$t('competitions.currentTitle')"
      :link="{ text: $t('common.viewAll'), to: { name: 'competitions' } }"
    />
    <CompetitionsGrid :status="'current'" />
  </div>
</template>

<script setup lang="ts">
import CompetitionsGrid from '../../components/competitions/CompetitionsGrid.vue'
import SectionHeader from '../../components/common/SectionHeader.vue'
</script>

