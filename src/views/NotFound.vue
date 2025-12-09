<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-200">404</h1>
      <h2 class="text-3xl font-semibold text-gray-900 mt-4">{{ $t('notFound.title') }}</h2>
      <p class="text-gray-600 mt-2 mb-8">{{ $t('notFound.description') }}</p>
      <RouterLink :to="{ name: 'home' }" class="btn-primary">
        {{ $t('notFound.goHome') }}
      </RouterLink>
    </div>
  </div>
</template>
