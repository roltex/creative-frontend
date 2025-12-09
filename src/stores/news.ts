import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'
import type { NewsArticle } from '../types'

export const useNewsStore = defineStore('news', () => {
  const articles = ref<NewsArticle[]>([])
  const currentArticle = ref<NewsArticle | null>(null)
  const categories = ref<string[]>([])
  const tags = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)
  const filters = ref({
    category: 'all',
    tag: '',
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
      if (filters.value.category !== 'all') {
        params.category = filters.value.category
      }
      if (filters.value.tag) {
        params.tag = filters.value.tag
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

      const response = await api.get('/news', { params })
      
      if (response.data.success) {
        // Ensure data is an array
        articles.value = Array.isArray(response.data.data) ? response.data.data : []
        
        // Update pagination from response meta
        if (response.data.meta) {
          pagination.value = {
            currentPage: response.data.meta.current_page || 1,
            totalPages: response.data.meta.last_page || 1,
            perPage: response.data.meta.per_page || 12,
            total: response.data.meta.total || 0
          }

          // Update categories and tags if available
          if (response.data.meta.categories) {
            categories.value = response.data.meta.categories
          }
          if (response.data.meta.tags) {
            tags.value = response.data.meta.tags
          }
        }
        
        initialized.value = true
      } else {
        throw new Error(response.data.message || 'Failed to fetch articles')
      }
    } catch (err: any) {
      console.error('Failed to fetch articles:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch articles'
      articles.value = []
      initialized.value = true // Set to true even on error so component doesn't stay in loading state
    } finally {
      loading.value = false
    }

    return articles.value
  }

  async function fetchArticleBySlug(slug: string) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get(`/news/${slug}`)
      
      if (response.data.success) {
        currentArticle.value = response.data.data
        return currentArticle.value
      } else {
        throw new Error(response.data.message || 'Article not found')
      }
    } catch (err: any) {
      console.error('Failed to fetch article:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch article'
      currentArticle.value = null
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const response = await api.get('/news/categories')
      if (response.data.success) {
        categories.value = response.data.data
        return categories.value
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err)
      return []
    }
  }

  async function fetchTags() {
    try {
      const response = await api.get('/news/tags')
      if (response.data.success) {
        tags.value = response.data.data
        return tags.value
      }
    } catch (err) {
      console.error('Failed to fetch tags:', err)
      return []
    }
  }

  async function fetchFeatured(limit = 6) {
    try {
      const response = await api.get('/news/featured', { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch featured articles:', err)
      return []
    }
  }

  async function fetchLatest(limit = 6) {
    try {
      const response = await api.get('/news/latest', { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch latest articles:', err)
      return []
    }
  }

  async function fetchPopular(limit = 6) {
    try {
      const response = await api.get('/news/popular', { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch popular articles:', err)
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
      category: 'all',
      tag: '',
      search: '',
      featured: false,
      date_from: '',
      date_to: ''
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

  // Don't auto-initialize - let components trigger fetch when needed
  // This prevents race conditions and ensures proper loading states

  return {
    articles,
    currentArticle,
    categories,
    tags,
    loading,
    error,
    initialized,
    filters,
    pagination,
    fetchArticles,
    fetchArticleBySlug,
    fetchCategories,
    fetchTags,
    fetchFeatured,
    fetchLatest,
    fetchPopular,
    setFilters,
    clearFilters,
    loadMore
  }
})