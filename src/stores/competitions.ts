import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'
import type { Competition } from '../types'

export const useCompetitionsStore = defineStore('competitions', () => {
  const competitions = ref<Competition[]>([])
  const currentCompetition = ref<Competition | null>(null)
  const categories = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)
  const filters = ref({
    status: 'all',
    category: 'all',
    search: '',
    featured: false,
    date_from: '',
    date_to: ''
  })
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    perPage: 12,
    total: 0
  })

  async function fetchCompetitions(page = 1) {
    if (loading.value) return competitions.value
    
    loading.value = true
    error.value = null

    try {
      const params: any = {
        page,
        per_page: pagination.value.perPage
      }

      // Add filters to params
      if (filters.value.status !== 'all') {
        params.status = filters.value.status
      }
      if (filters.value.category !== 'all') {
        params.category = filters.value.category
      }
      if (filters.value.search) {
        params.search = filters.value.search
      }
      if (filters.value.featured) {
        params.featured = true
      }
      if (filters.value.date_from) {
        params.date_from = filters.value.date_from
      }
      if (filters.value.date_to) {
        params.date_to = filters.value.date_to
      }

      const response = await api.get('/competitions', { params })
      
      if (response.data.success) {
        competitions.value = response.data.data
        
        // Update pagination from response meta
        if (response.data.meta) {
          pagination.value = {
            currentPage: response.data.meta.current_page,
            totalPages: response.data.meta.last_page,
            perPage: response.data.meta.per_page,
            total: response.data.meta.total
          }

          // Update categories if available
          if (response.data.meta.categories) {
            categories.value = response.data.meta.categories
          }
        }
        
        initialized.value = true
      } else {
        throw new Error(response.data.message || 'Failed to fetch competitions')
      }
    } catch (err: any) {
      console.error('Failed to fetch competitions:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch competitions'
      competitions.value = []
    } finally {
      loading.value = false
    }

    return competitions.value
  }

  async function fetchCompetitionBySlug(slug: string) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get(`/competitions/${slug}`)
      
      if (response.data.success) {
        currentCompetition.value = response.data.data
        return currentCompetition.value
      } else {
        throw new Error(response.data.message || 'Competition not found')
      }
    } catch (err: any) {
      console.error('Failed to fetch competition:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch competition'
      currentCompetition.value = null
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const response = await api.get('/competitions/categories')
      if (response.data.success) {
        categories.value = response.data.data
        return categories.value
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err)
      return []
    }
  }

  async function fetchCurrent(limit = 12) {
    try {
      const response = await api.get('/competitions/current', { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch current competitions:', err)
      return []
    }
  }

  async function fetchCompleted(limit = 12) {
    try {
      const response = await api.get('/competitions/completed', { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch completed competitions:', err)
      return []
    }
  }

  async function fetchUpcoming(limit = 12) {
    try {
      const response = await api.get('/competitions/upcoming', { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch upcoming competitions:', err)
      return []
    }
  }

  async function fetchFeatured(limit = 6) {
    try {
      const response = await api.get('/competitions/featured', { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch featured competitions:', err)
      return []
    }
  }

  function setFilters(newFilters: Partial<typeof filters.value>) {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.currentPage = 1
    // Fetch competitions with new filters
    fetchCompetitions(1)
  }

  function clearFilters() {
    filters.value = {
      status: 'all',
      category: 'all',
      search: '',
      featured: false,
      date_from: '',
      date_to: ''
    }
    pagination.value.currentPage = 1
    // Fetch competitions without filters
    fetchCompetitions(1)
  }

  async function loadMore() {
    if (pagination.value.currentPage < pagination.value.totalPages && !loading.value) {
      const nextPage = pagination.value.currentPage + 1
      const moreCompetitions = await fetchCompetitions(nextPage)
      
      if (moreCompetitions && moreCompetitions.length > 0) {
        // Append new competitions to existing ones
        competitions.value = [...competitions.value, ...moreCompetitions]
      }
    }
  }

  // Initialize data on store creation
  if (!initialized.value) {
    fetchCompetitions()
    fetchCategories()
  }

  return {
    competitions,
    currentCompetition,
    categories,
    loading,
    error,
    initialized,
    filters,
    pagination,
    fetchCompetitions,
    fetchCompetitionBySlug,
    fetchCategories,
    fetchCurrent,
    fetchCompleted,
    fetchUpcoming,
    fetchFeatured,
    setFilters,
    clearFilters,
    loadMore
  }
})