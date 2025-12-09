import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'
import type { PressArticle } from '../types'

export const usePressStore = defineStore('press', () => {
  const articles = ref<PressArticle[]>([])
  const currentArticle = ref<PressArticle | null>(null)
  const mediaOutlets = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)
  const filters = ref({
    media: 'all',
    search: ''
  })
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    perPage: 12,
    total: 0
  })

  async function fetchArticles(page = 1) {
    if (loading.value) return articles.value
    
    loading.value = true
    error.value = null

    try {
      const params: any = {
        page,
        per_page: pagination.value.perPage
      }

      // Add filters to params
      if (filters.value.media !== 'all') {
        params.media = filters.value.media
      }
      if (filters.value.search) {
        params.search = filters.value.search
      }

      const response = await api.get('/press', { params })
      
      if (response.data.success) {
        articles.value = response.data.data || []
        
        // Update pagination from response meta
        if (response.data.meta) {
          pagination.value = {
            currentPage: response.data.meta.current_page || 1,
            totalPages: response.data.meta.last_page || 1,
            perPage: response.data.meta.per_page || 12,
            total: response.data.meta.total || 0
          }
        }
        
        initialized.value = true
      } else {
        throw new Error(response.data.message || 'Failed to fetch press articles')
      }
    } catch (err: any) {
      console.error('Failed to fetch press articles:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch press articles'
      articles.value = []
      initialized.value = true // Set to true even on error to prevent infinite loading
    } finally {
      loading.value = false
    }

    return articles.value
  }

  async function fetchMediaOutlets() {
    try {
      const response = await api.get('/press/media/outlets')
      if (response.data.success) {
        mediaOutlets.value = response.data.data
        return mediaOutlets.value
      }
    } catch (err) {
      console.error('Failed to fetch media outlets:', err)
      return []
    }
  }

  function setFilters(newFilters: Partial<typeof filters.value>) {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.currentPage = 1
    // Fetch articles with new filters
    fetchArticles(1)
  }

  function clearFilters() {
    filters.value = {
      media: 'all',
      search: ''
    }
    pagination.value.currentPage = 1
    // Fetch articles without filters
    fetchArticles(1)
  }

  async function loadMore() {
    if (pagination.value.currentPage < pagination.value.totalPages && !loading.value) {
      const nextPage = pagination.value.currentPage + 1
      const moreArticles = await fetchArticles(nextPage)
      
      if (moreArticles && moreArticles.length > 0) {
        // Append new articles to existing ones
        articles.value = [...articles.value, ...moreArticles]
      }
    }
  }

  return {
    articles,
    currentArticle,
    mediaOutlets,
    loading,
    error,
    initialized,
    filters,
    pagination,
    fetchArticles,
    fetchMediaOutlets,
    setFilters,
    clearFilters,
    loadMore
  }
})