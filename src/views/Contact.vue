<template>
  <div v-if="loading" class="container-fluid py-8 lg:py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Hero Section Skeleton -->
      <div class="text-center mb-16">
        <div class="skeleton h-12 w-64 mx-auto mb-6"></div>
        <div class="skeleton h-6 w-3/4 max-w-3xl mx-auto"></div>
      </div>

      <!-- Main Content Skeleton -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Contact Form Skeleton -->
      <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
        <div class="skeleton h-8 w-48 mb-6"></div>
        <div class="space-y-4">
          <div class="skeleton h-4 w-24"></div>
          <div class="skeleton h-12 w-full"></div>
          <div class="skeleton h-4 w-24"></div>
          <div class="skeleton h-12 w-full"></div>
          <div class="skeleton h-4 w-24"></div>
          <div class="skeleton h-32 w-full"></div>
          <div class="skeleton h-12 w-full mt-6"></div>
        </div>
      </div>

      <!-- Contact Info & Social Media Skeleton -->
      <div class="space-y-8">
        <!-- Contact Info Skeleton -->
        <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 border border-primary-200">
          <div class="skeleton h-8 w-40 mb-6"></div>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="skeleton w-12 h-12 rounded-full mr-4 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="skeleton h-5 w-24 mb-2"></div>
                <div class="skeleton h-4 w-full"></div>
              </div>
            </div>
            <div class="flex items-start">
              <div class="skeleton w-12 h-12 rounded-full mr-4 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="skeleton h-5 w-24 mb-2"></div>
                <div class="skeleton h-4 w-40"></div>
              </div>
            </div>
            <div class="flex items-start">
              <div class="skeleton w-12 h-12 rounded-full mr-4 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="skeleton h-5 w-24 mb-2"></div>
                <div class="skeleton h-4 w-48"></div>
              </div>
            </div>
            <div class="flex items-start">
              <div class="skeleton w-12 h-12 rounded-full mr-4 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="skeleton h-5 w-32 mb-2"></div>
                <div class="skeleton h-4 w-full"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media Skeleton -->
        <div class="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div class="skeleton h-8 w-40 mb-6"></div>
          <div class="flex flex-wrap gap-4">
            <div class="skeleton w-12 h-12 rounded-full"></div>
            <div class="skeleton w-12 h-12 rounded-full"></div>
            <div class="skeleton w-12 h-12 rounded-full"></div>
            <div class="skeleton w-12 h-12 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

      <!-- Map Skeleton -->
      <div class="mt-12">
        <div class="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          <div class="skeleton h-8 w-32 p-8 pb-6"></div>
          <div class="skeleton h-[500px] w-full"></div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container-fluid py-8 lg:py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Dynamic Hero Section -->
      <div class="text-center mb-16">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-headline">
        {{ pageData?.title ? ($i18n.locale === 'ka' ? pageData.title.ka : pageData.title.en) : $t('contact.title') }}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {{ pageData?.subtitle ? ($i18n.locale === 'ka' ? pageData.subtitle.ka : pageData.subtitle.en) : $t('contact.subtitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Dynamic Contact Form -->
      <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 font-headline">
            {{ pageData?.contactFormTitle ? (pageData.contactFormTitle[$i18n.locale as 'ka' | 'en'] || pageData.contactFormTitle.ka || pageData.contactFormTitle.en || '') : $t('contact.sendMessage') }}
          </h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Dynamic Form Fields -->
          <template v-if="pageData?.contactFormFields && pageData.contactFormFields.length > 0">
            <div v-for="field in pageData.contactFormFields" :key="field.name">
              <label :for="field.name" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $i18n.locale === 'ka' ? field.label.ka : field.label.en }}
                <span v-if="field.required" class="text-red-500">*</span>
              </label>
              
              <!-- Text Input -->
              <input
                v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
                :id="field.name"
                v-model="form[field.name]"
                :type="field.type"
                :required="field.required"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              
              <!-- Textarea -->
              <textarea
                v-else-if="field.type === 'textarea'"
                :id="field.name"
                v-model="form[field.name]"
                :required="field.required"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              ></textarea>
              
              <!-- Select -->
              <select
                v-else-if="field.type === 'select' && field.options"
                :id="field.name"
                v-model="form[field.name]"
                :required="field.required"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                <option value="">{{ $t('contact.form.select') }}</option>
                <option v-for="option in field.options" :key="option.value" :value="option.value">
                  {{ $i18n.locale === 'ka' ? option.label.ka : option.label.en }}
                </option>
              </select>
            </div>
          </template>

          <!-- Fallback Form Fields -->
          <template v-else>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">{{ $t('contact.form.name') }}</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              :placeholder="$t('contact.form.namePlaceholder')"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">{{ $t('contact.form.email') }}</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">{{ $t('contact.form.message') }}</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              :placeholder="$t('contact.form.messagePlaceholder')"
            ></textarea>
          </div>
          </template>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-headline"
          >
            <span v-if="!submitting">{{ $t('contact.form.send') }}</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ $t('contact.form.sending') }}
            </span>
          </button>

          <div v-if="submitMessage" class="!mt-4 p-4 rounded-xl" :class="submitSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
            {{ submitMessage }}
          </div>
        </form>
      </div>

      <!-- Dynamic Contact Information -->
      <div class="space-y-8">
        <!-- Office Info -->
        <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 border border-primary-200">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 font-headline">
            {{ pageData?.contactInfoTitle ? (pageData.contactInfoTitle[$i18n.locale as 'ka' | 'en'] || pageData.contactInfoTitle.ka || pageData.contactInfoTitle.en || '') : $t('contact.contactInfo') }}
          </h2>
          
          <div class="space-y-4">
            <div v-if="pageData?.contactAddress || contactInfo?.address" class="flex items-start">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">{{ $t('contact.address') }}</h3>
                <p class="text-gray-700">
                  {{ pageData?.contactAddress 
                    ? (pageData.contactAddress[$i18n.locale as 'ka' | 'en'] || pageData.contactAddress.ka || pageData.contactAddress.en || '')
                    : (contactInfo?.address ? ($i18n.locale === 'ka' ? contactInfo.address.ka : contactInfo.address.en) : '')
                  }}
                </p>
              </div>
            </div>

            <div v-if="pageData?.contactPhone || contactInfo?.phone" class="flex items-start">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">{{ $t('contact.phone') }}</h3>
                <a :href="`tel:${pageData?.contactPhone || contactInfo?.phone}`" class="text-primary-700 hover:text-primary-800">
                  {{ pageData?.contactPhone || contactInfo?.phone }}
                </a>
              </div>
            </div>

            <div v-if="pageData?.contactEmail || contactInfo?.email" class="flex items-start">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">{{ $t('contact.email') }}</h3>
                <a :href="`mailto:${pageData?.contactEmail || contactInfo?.email}`" class="text-primary-700 hover:text-primary-800">
                  {{ pageData?.contactEmail || contactInfo?.email }}
                </a>
              </div>
            </div>

            <div v-if="pageData?.officeHoursText || contactInfo?.working_hours" class="flex items-start">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">
                  {{ pageData?.officeHoursTitle 
                    ? (pageData.officeHoursTitle[$i18n.locale as 'ka' | 'en'] || pageData.officeHoursTitle.ka || pageData.officeHoursTitle.en || $t('contact.officeHours'))
                    : $t('contact.officeHours')
                  }}
                </h3>
                <p class="text-gray-700">
                  {{ pageData?.officeHoursText 
                    ? (pageData.officeHoursText[$i18n.locale as 'ka' | 'en'] || pageData.officeHoursText.ka || pageData.officeHoursText.en || '')
                    : (contactInfo?.working_hours 
                      ? ($i18n.locale === 'ka' ? contactInfo.working_hours.ka : contactInfo.working_hours.en)
                      : 'ორშაბათი-პარასკევი: 09:00-18:00')
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Dynamic Social Media -->
        <div class="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 font-headline">
            {{ pageData?.socialMediaTitle ? (pageData.socialMediaTitle[$i18n.locale as 'ka' | 'en'] || pageData.socialMediaTitle.ka || pageData.socialMediaTitle.en || '') : $t('contact.followUs') }}
          </h2>
          <div class="flex flex-wrap gap-4">
            <!-- Dynamic Social Links -->
            <template v-if="pageData?.socialMediaLinks && pageData.socialMediaLinks.length > 0">
              <a v-for="social in pageData.socialMediaLinks" :key="social.platform" 
                 :href="social.url" target="_blank" 
                 class="w-12 h-12 bg-gray-100 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <!-- Facebook -->
                  <path v-if="social.platform === 'facebook'" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  <!-- Instagram -->
                  <path v-else-if="social.platform === 'instagram'" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.219.562-.477.96-.896 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.219-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.233-.421 1.266-.045 1.646-.06 4.85-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  <!-- LinkedIn -->
                  <path v-else-if="social.platform === 'linkedin'" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  <!-- YouTube -->
                  <path v-else-if="social.platform === 'youtube'" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            </template>

            <!-- Fallback Social Links from API -->
            <template v-else-if="socialLinks && socialLinks.length > 0">
              <a v-for="link in socialLinks" :key="link.id" 
                 :href="link.url" target="_blank" 
                 rel="noopener noreferrer"
                 class="w-12 h-12 bg-gray-100 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all hover:text-white">
                <component :is="getSocialIcon(link.platform)" v-if="getSocialIcon(link.platform)" class="w-6 h-6" />
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Map -->
    <div class="mt-12">
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-900 p-8 pb-6 font-headline">
          {{ pageData?.mapTitle ? (pageData.mapTitle[$i18n.locale as 'ka' | 'en'] || pageData.mapTitle.ka || pageData.mapTitle.en || '') : $t('contact.location') }}
        </h2>
        <div class="w-full h-[500px]">
          <iframe
            v-if="pageData?.mapEmbedUrl"
            :src="pageData.mapEmbedUrl"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <iframe
            v-else-if="pageData?.mapLatitude && pageData?.mapLongitude"
            :src="`https://maps.google.com/maps?q=${pageData.mapLatitude},${pageData.mapLongitude}&t=&z=${pageData.mapZoom || 16}&ie=UTF8&iwloc=&output=embed`"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <!-- Fallback map -->
          <iframe
            v-else-if="mapConfig"
            :src="`https://maps.google.com/maps?q=${mapConfig.latitude},${mapConfig.longitude}&t=&z=${mapConfig.zoom}&ie=UTF8&iwloc=&output=embed`"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <iframe
            v-else
            src="https://maps.google.com/maps?q=4+Sanapiro+Street,+Tbilisi,+Georgia&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube 
} from 'lucide-vue-next'
import { usePagesStore } from '../stores/pages'
import { useSettingsStore } from '../stores/settings'
import { useSocialLinksStore } from '../stores/socialLinks'
import api from '../api/axios'

const { } = useI18n()
const pagesStore = usePagesStore()
const settingsStore = useSettingsStore()
const socialLinksStore = useSocialLinksStore()

const pageData = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const form = ref<Record<string, any>>({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

// Dynamic data
const contactInfo = computed(() => settingsStore.getContactInfo())
const socialLinks = computed(() => socialLinksStore.links)
const mapConfig = computed(() => settingsStore.getMapConfig())

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

const handleSubmit = async () => {
  submitting.value = true
  submitMessage.value = ''
  
  try {
    const response = await api.post('/contact', form.value)
    
    if (response.data.success) {
    submitSuccess.value = true
    submitMessage.value = 'თქვენი შეტყობინება წარმატებით გაიგზავნა!'
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
      
      // Reset dynamic fields
      if (pageData.value?.contactFormFields) {
        pageData.value.contactFormFields.forEach((field: any) => {
          form.value[field.name] = ''
        })
      }
    } else {
      throw new Error(response.data.message || 'Failed to send message')
    }
  } catch (err: any) {
    submitSuccess.value = false
    submitMessage.value = err.response?.data?.message || err.message || 'შეცდომა მოხდა. გთხოვთ სცადოთ თავიდან.'
  } finally {
    submitting.value = false
    
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  }
}

onMounted(async () => {
  try {
    // Load data in parallel
    const [pageResponse] = await Promise.all([
      pagesStore.fetchPageBySlug('contact'),
      settingsStore.fetchSettings(),
      socialLinksStore.fetchSocialLinks()
    ])
    
    // Set page data
    if (pageResponse) {
      pageData.value = pageResponse
      
      // Initialize dynamic form fields
      if (pageData.value.contactFormFields) {
        pageData.value.contactFormFields.forEach((field: any) => {
          form.value[field.name] = ''
        })
      }
    }
  } catch (err: any) {
    console.error('Failed to load contact page:', err)
    error.value = err.message || 'Failed to load page'
  } finally {
    loading.value = false
  }
})
</script>