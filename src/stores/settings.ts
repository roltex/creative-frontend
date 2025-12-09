import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'

interface SiteSettings {
  site: {
    name: { ka: string; en: string }
    tagline: { ka: string; en: string }
    description: { ka: string; en: string }
  }
  contact: {
    email: string
    phone: string
    address: { ka: string; en: string }
    working_hours: { ka: string; en: string }
  }
  social: {
    facebook: string
    instagram: string
    linkedin: string
    twitter: string
    youtube: string
  }
  theme: {
    primary_color: string
    secondary_color: string
    success_color: string
    warning_color: string
    error_color: string
  }
  features: {
    enable_registration: boolean
    enable_newsletter: boolean
    enable_file_uploads: boolean
    max_file_size: number
    allowed_file_types: string[]
  }
  statistics: {
    supported_projects: number
    successful_creators: number
    total_funding: number
  }
  map: {
    latitude: number
    longitude: number
    zoom: number
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<SiteSettings | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  async function fetchSettings() {
    if (loading.value) return settings.value
    
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/settings')
      
      if (response.data.success) {
        settings.value = response.data.data
        initialized.value = true
      } else {
        throw new Error(response.data.message || 'Failed to fetch settings')
      }
    } catch (err: any) {
      console.error('Failed to fetch settings:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch settings'
      settings.value = null
    } finally {
      loading.value = false
    }

    return settings.value
  }

  async function fetchSettingsGroup(group: string) {
    try {
      const response = await api.get(`/settings/${group}`)
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error(`Failed to fetch ${group} settings:`, err)
      return null
    }
  }

  // Helper getters
  const getSiteConfig = () => settings.value?.site
  const getContactInfo = () => settings.value?.contact
  const getSocialLinks = () => settings.value?.social
  const getThemeColors = () => settings.value?.theme
  const getFeatures = () => settings.value?.features
  const getStatistics = () => settings.value?.statistics
  const getMapConfig = () => settings.value?.map

  // Initialize data on store creation
  if (!initialized.value) {
    fetchSettings()
  }

  return {
    settings,
    loading,
    error,
    initialized,
    fetchSettings,
    fetchSettingsGroup,
    getSiteConfig,
    getContactInfo,
    getSocialLinks,
    getThemeColors,
    getFeatures,
    getStatistics,
    getMapConfig
  }
})
