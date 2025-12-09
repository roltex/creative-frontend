<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <RouterLink :to="{ name: 'home' }" class="flex justify-center">
        <img
          :src="$i18n.locale === 'ka' ? geoLogo : engLogo"
          :alt="$t('app.name')"
          class="h-16"
        />
      </RouterLink>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-full sm:px-10">
        <RouterView />
      </div>
    </div>

    <!-- Language Switcher -->
    <div class="mt-6 flex justify-center">
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '../components/common/LanguageSwitcher.vue'
import geoLogo from '../assets/images/blue-geo-logo.png'
import engLogo from '../assets/images/blue-eng-logo.png'
</script>
