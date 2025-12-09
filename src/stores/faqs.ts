import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'
import type { FAQ } from '../types'

export const useFaqsStore = defineStore('faqs', () => {
  const faqs = ref<FAQ[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  const fetchFaqs = async () => {
    if (loading.value) return faqs.value
    
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/faqs')
      
      if (response.data.success) {
        faqs.value = response.data.data || []
        initialized.value = true
      } else {
        throw new Error(response.data.message || 'Failed to fetch FAQs')
      }
    } catch (err: any) {
      console.error('Failed to fetch FAQs:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch FAQs'
      faqs.value = []
      initialized.value = true // Set to true even on error to prevent infinite loading
    } finally {
      loading.value = false
    }

    return faqs.value
  }

  return {
    faqs,
    loading,
    error,
    initialized,
    fetchFaqs
  }
})
