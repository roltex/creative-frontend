<template>
  <footer class="bg-primary-500 text-white">
    <div class="container-fluid py-8 lg:py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.aboutUs') }}</h3>
          <p class="text-gray-400 text-sm mb-4">
            {{ siteConfig?.tagline ? ($i18n.locale === 'ka' ? siteConfig.tagline.ka : siteConfig.tagline.en) : $t('app.tagline') }}
          </p>
          <RouterLink 
            :to="{ name: 'home' }" 
            class="inline-block flex items-center justify-start transition-all duration-300 hover:opacity-90"
          >
            <img
              :src="whiteLogo"
              :alt="siteConfig?.name ? ($i18n.locale === 'ka' ? siteConfig.name.ka : siteConfig.name.en) : $t('app.name')"
              class="h-36 transition-all duration-300"
            />
          </RouterLink>
        </div>

        <!-- Dynamic Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.quickLinks') }}</h3>
          <ul class="space-y-2" v-if="footerMenu && footerMenu.items && footerMenu.items.length > 0">
            <li v-for="item in footerMenu.items" :key="item.id">
              <RouterLink
                :to="item.url"
                class="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {{ $i18n.locale === 'ka' ? item.title.ka : item.title.en }}
              </RouterLink>
            </li>
          </ul>
          <!-- Fallback links if footer menu not loaded -->
          <ul v-else class="space-y-2">
            <li><RouterLink :to="{ name: 'about-mission' }" class="text-gray-400 hover:text-white transition-colors text-sm">{{ $t('nav.about') }}</RouterLink></li>
            <li><RouterLink :to="{ name: 'competitions' }" class="text-gray-400 hover:text-white transition-colors text-sm">{{ $t('nav.competitions') }}</RouterLink></li>
            <li><RouterLink :to="{ name: 'news' }" class="text-gray-400 hover:text-white transition-colors text-sm">{{ $t('nav.news') }}</RouterLink></li>
            <li><RouterLink :to="{ name: 'events' }" class="text-gray-400 hover:text-white transition-colors text-sm">{{ $t('nav.events') }}</RouterLink></li>
            <li><RouterLink :to="{ name: 'faqs' }" class="text-gray-400 hover:text-white transition-colors text-sm">{{ $t('nav.faqs') }}</RouterLink></li>
            <li><RouterLink :to="{ name: 'contact' }" class="text-gray-400 hover:text-white transition-colors text-sm">{{ $t('nav.contact') }}</RouterLink></li>
          </ul>
        </div>

        <!-- Dynamic Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.contact') }}</h3>
          <ul v-if="contactInfo" class="space-y-3 text-gray-400 text-sm">
            <li v-if="contactInfo.address" class="flex items-start space-x-2">
              <MapPin class="w-5 h-5 text-gray-400 mt-0.5" />
              <span>{{ $i18n.locale === 'ka' ? contactInfo.address.ka : contactInfo.address.en }}</span>
            </li>
            <li v-if="contactInfo.phone" class="flex items-center space-x-2">
              <Phone class="w-5 h-5 text-gray-400" />
              <a :href="`tel:${contactInfo.phone}`" class="hover:text-white transition-colors">
                {{ contactInfo.phone }}
              </a>
            </li>
            <li v-if="contactInfo.email" class="flex items-center space-x-2">
              <Mail class="w-5 h-5 text-gray-400" />
              <a :href="`mailto:${contactInfo.email}`" class="hover:text-white transition-colors">
                {{ contactInfo.email }}
              </a>
            </li>
          </ul>

          <!-- Dynamic Social Links -->
          <div v-if="socialLinks && socialLinks.length > 0" class="mt-6">
            <h4 class="text-sm font-semibold mb-3">{{ $t('footer.followUs') }}</h4>
            <div class="flex space-x-3">
              <a
                v-for="link in socialLinks"
                :key="link.id"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <component :is="getSocialIcon(link.platform)" v-if="getSocialIcon(link.platform)" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.newsletter') }}</h3>
          <p class="text-gray-400 text-sm mb-4">
            {{ $t('footer.subscribeText') }}
          </p>
          <form @submit.prevent="handleSubscribe" class="space-y-3">
            <input
              v-model="email"
              type="email"
              :placeholder="$t('footer.emailPlaceholder')"
              class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              :disabled="subscribing"
              class="w-full bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
            >
              <span v-if="!subscribing">{{ $t('footer.subscribe') }}</span>
              <span v-else class="flex items-center justify-center">
                <Loader2 class="w-5 h-5 animate-spin" />
              </span>
            </button>
          </form>
          <p v-if="subscribeMessage" class="mt-2 text-sm" :class="subscribeSuccess ? 'text-green-400' : 'text-red-400'">
            {{ subscribeMessage }}
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-gray-400 text-sm">
            {{ $t('app.copyright') }}
          </p>
          <div class="flex space-x-6">
            <RouterLink to="/privacy" class="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </RouterLink>
            <RouterLink to="/terms" class="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { useMenusStore } from '../../stores/menus'
import { useSettingsStore } from '../../stores/settings'
import { useSocialLinksStore } from '../../stores/socialLinks'
import api from '../../api/axios'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  Loader2 
} from 'lucide-vue-next'
import whiteLogo from '../../assets/images/white-geo-logo.png'

const { t } = useI18n()
const menusStore = useMenusStore()
const settingsStore = useSettingsStore()
const socialLinksStore = useSocialLinksStore()

const email = ref('')
const subscribing = ref(false)
const subscribeMessage = ref('')
const subscribeSuccess = ref(false)

// Dynamic data from stores
const footerMenu = computed(() => menusStore.footerMenu)
const contactInfo = computed(() => settingsStore.getContactInfo())
const socialLinks = computed(() => socialLinksStore.links)
const siteConfig = computed(() => settingsStore.getSiteConfig())

// Map platform names to icons
const getSocialIcon = (platform: string) => {
  const platformLower = platform.toLowerCase()
  if (platformLower.includes('facebook')) return Facebook
  if (platformLower.includes('youtube')) return Youtube
  if (platformLower.includes('linkedin')) return Linkedin
  if (platformLower.includes('instagram')) return Instagram
  if (platformLower.includes('twitter') || platformLower.includes('x')) return Twitter
  return null
}

const handleSubscribe = async () => {
  subscribing.value = true
  subscribeMessage.value = ''
  
  try {
    await api.post('/subscribe', { email: email.value })
    subscribeSuccess.value = true
    subscribeMessage.value = t('messages.subscribed')
    email.value = ''
  } catch (error) {
    subscribeSuccess.value = false
    subscribeMessage.value = t('common.somethingWentWrong')
  } finally {
    subscribing.value = false
    setTimeout(() => {
      subscribeMessage.value = ''
    }, 5000)
  }
}

// Load menu, settings, and social links data on mount
onMounted(async () => {
  await Promise.all([
    menusStore.fetchFooterMenu(),
    settingsStore.fetchSettings(),
    socialLinksStore.fetchSocialLinks()
  ])
})
</script>

