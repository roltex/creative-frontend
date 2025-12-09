import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'

export interface SocialLink {
  id: number
  platform: string
  url: string
  icon?: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const useSocialLinksStore = defineStore('socialLinks', () => {
  const links = ref<SocialLink[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  async function fetchSocialLinks() {
    if (loading.value) return links.value
    
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/social-links')
      
      if (response.data.success) {
        links.value = response.data.data || []
        initialized.value = true
      } else {
        throw new Error(response.data.message || 'Failed to fetch social links')
      }
    } catch (err: any) {
      console.error('Failed to fetch social links:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch social links'
      links.value = []
      initialized.value = true // Set to true even on error to prevent infinite loading
    } finally {
      loading.value = false
    }

    return links.value
  }

  return {
    links,
    loading,
    error,
    initialized,
    fetchSocialLinks
  }
})

