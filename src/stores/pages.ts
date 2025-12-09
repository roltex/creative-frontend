import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'

interface Page {
  id: number
  slug: string
  title: { ka: string; en: string }
  subtitle?: { ka: string; en: string }
  content?: { ka: string; en: string }
  template: string
  status: string
  order: number
  // Template-specific fields
  hero_subtitle?: { ka: string; en: string }
  mission_title?: { ka: string; en: string }
  mission_content?: { ka: string; en: string }
  mission_content_2?: { ka: string; en: string }
  goals_title?: { ka: string; en: string }
  goals_content?: { ka: string; en: string }
  goals_list?: Array<{ ka: string; en: string }>
  values_title?: { ka: string; en: string }
  values_list?: Array<{ ka: string; en: string; description?: { ka: string; en: string } }>
  stats_title?: { ka: string; en: string }
  stats_list?: Array<{ number: number; label: { ka: string; en: string } }>
  // Reports template fields
  annual_reports_title?: { ka: string; en: string }
  annual_reports_list?: Array<{ title: { ka: string; en: string }; file: string; year: number }>
  strategic_plans_title?: { ka: string; en: string }
  strategic_plans_list?: Array<{ title: { ka: string; en: string }; file: string; year: number }>
  financial_reports_title?: { ka: string; en: string }
  financial_reports_list?: Array<{ title: { ka: string; en: string }; file: string; year: number }>
  achievements_title?: { ka: string; en: string }
  achievements_list?: Array<{ title: { ka: string; en: string }; description: { ka: string; en: string }; year: number }>
  // Acts template fields
  legal_acts_title?: { ka: string; en: string }
  legal_acts_list?: Array<{ title: { ka: string; en: string }; file: string; date: string }>
  regulations_title?: { ka: string; en: string }
  regulations_list?: Array<{ title: { ka: string; en: string }; file: string; date: string }>
  additional_info_title?: { ka: string; en: string }
  additional_info_content?: { ka: string; en: string }
  additional_info_button_text?: { ka: string; en: string }
  additional_info_button_url?: string
  // Contact template fields
  contact_form_fields?: Array<{ name: string; label: { ka: string; en: string }; type: string; required: boolean }>
  contact_address?: { ka: string; en: string }
  contact_phone?: string
  contact_email?: string
  contact_office_hours?: { ka: string; en: string }
  social_media_links?: Array<{ platform: string; url: string; icon: string }>
  map_embed_url?: string
  map_latitude?: number
  map_longitude?: number
  map_zoom?: number
}

export const usePagesStore = defineStore('pages', () => {
  const pages = ref<Page[]>([])
  const currentPage = ref<Page | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)
  const templates = ref<string[]>(['mission', 'reports', 'acts', 'contact', 'default'])

  async function fetchPages() {
    if (loading.value) return pages.value
    
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/pages')
      
      if (response.data.success) {
        pages.value = response.data.data
        initialized.value = true
      } else {
        throw new Error(response.data.message || 'Failed to fetch pages')
      }
    } catch (err: any) {
      console.error('Failed to fetch pages:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch pages'
      pages.value = []
    } finally {
      loading.value = false
    }

    return pages.value
  }

  async function fetchPageBySlug(slug: string) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get(`/pages/${slug}`)
      
      if (response.data.success) {
        currentPage.value = response.data.data
        return currentPage.value
      } else {
        throw new Error(response.data.message || 'Page not found')
      }
    } catch (err: any) {
      console.error('Failed to fetch page:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch page'
      currentPage.value = null
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchPagesByTemplate(template: string) {
    try {
      const response = await api.get(`/pages/template/${template}`)
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error(`Failed to fetch ${template} pages:`, err)
      return []
    }
  }

  async function fetchHomepage() {
    try {
      const response = await api.get('/pages/homepage')
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch homepage:', err)
      return null
    }
  }

  // Helper function to get page by slug from cache
  function getPageBySlug(slug: string): Page | null {
    return pages.value.find(page => page.slug === slug) || null
  }

  // Helper function to get pages by template from cache
  function getPagesByTemplate(template: string): Page[] {
    return pages.value.filter(page => page.template === template)
  }

  // Initialize data on store creation
  if (!initialized.value) {
    fetchPages()
  }

  return {
    pages,
    currentPage,
    loading,
    error,
    initialized,
    templates,
    fetchPages,
    fetchPageBySlug,
    fetchPagesByTemplate,
    fetchHomepage,
    getPageBySlug,
    getPagesByTemplate
  }
})
