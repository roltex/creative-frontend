<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="container-fluid">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <RouterLink :to="{ name: 'home' }" class="flex items-center space-x-3">
            <img
              :src="$i18n.locale === 'ka' ? geoLogo : engLogo"
              :alt="$t('app.name')"
              class="h-10"
            />
          </RouterLink>

          <!-- Right Actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button
              @click="showNotifications = !showNotifications"
              class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Bell class="w-6 h-6" />
              <span
                v-if="notificationsStore.unreadCount > 0"
                class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"
              ></span>
            </button>

            <!-- Language Switcher -->
            <LanguageSwitcher />

            <!-- User Menu -->
            <div class="relative">
              <button
                @click="userMenuOpen = !userMenuOpen"
                class="flex items-center space-x-2 text-gray-700 hover:text-primary-500 transition-colors"
              >
                <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User class="w-5 h-5" />
                </div>
                <span class="font-medium">{{ authStore.user?.firstName }}</span>
                <ChevronDown class="w-4 h-4" />
              </button>

              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="userMenuOpen"
                  class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div class="py-1">
                    <RouterLink
                      :to="{ name: 'home' }"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {{ $t('nav.home') }}
                    </RouterLink>
                    <hr class="my-1" />
                    <button
                      @click="handleLogout"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {{ $t('nav.logout') }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Mobile Menu Button -->
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden text-gray-700"
            >
              <Menu class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'w-64 bg-white shadow-sm min-h-screen transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'fixed lg:relative z-40'
        ]"
      >
        <nav class="p-4 space-y-1">
          <RouterLink
            v-for="item in sidebarItems"
            :key="item.name"
            :to="item.to"
            class="flex items-center space-x-3 px-3 py-2 rounded-full text-gray-700 hover:bg-gray-50 hover:text-primary-500 transition-colors"
            active-class="bg-primary-50 text-primary-600"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ $t(item.label) }}</span>
          </RouterLink>
        </nav>
      </aside>

      <!-- Sidebar Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="sidebarOpen"
          @click="sidebarOpen = false"
          class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      </Transition>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>

    <!-- Notifications Panel -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="showNotifications"
        class="fixed right-0 top-16 h-full w-80 bg-white shadow-lg z-50"
      >
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">{{ $t('dashboard.notifications') }}</h3>
            <button
              @click="showNotifications = false"
              class="text-gray-500 hover:text-gray-700"
            >
              <X class="w-5 h-5" />
            </button>
          </div>
        </div>
        <div class="p-4">
          <!-- Notifications content here -->
          <p class="text-gray-500 text-sm">{{ $t('common.noResults') }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotificationsStore } from '../stores/notifications'
import { 
  User, 
  ChevronDown, 
  Menu, 
  Bell,
  Home,
  FileText,
  UserCircle,
  Settings,
  X
} from 'lucide-vue-next'
import LanguageSwitcher from '../components/common/LanguageSwitcher.vue'
import geoLogo from '../assets/images/blue-geo-logo.png'
import engLogo from '../assets/images/blue-eng-logo.png'

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const userMenuOpen = ref(false)
const sidebarOpen = ref(false)
const showNotifications = ref(false)

const sidebarItems = [
  { name: 'overview', to: { name: 'dashboard' }, label: 'dashboard.overview', icon: Home },
  { name: 'applications', to: { name: 'dashboard-applications' }, label: 'dashboard.applications', icon: FileText },
  { name: 'profile', to: { name: 'dashboard-profile' }, label: 'dashboard.profile', icon: UserCircle },
  { name: 'settings', to: { name: 'dashboard-settings' }, label: 'dashboard.settings', icon: Settings }
]

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'home' })
}

onMounted(() => {
  // Fetch notifications when dashboard loads
  notificationsStore.fetchNotifications()
})
</script>
