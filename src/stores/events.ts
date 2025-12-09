import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'
import type { Event } from '../types'

export const useEventsStore = defineStore('events', () => {
  const events = ref<Event[]>([])
  const currentEvent = ref<Event | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)
  const filters = ref({
    status: 'all',
    date_from: '',
    date_to: '',
    search: '',
    featured: false
  })
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    perPage: 12,
    total: 0
  })

  async function fetchEvents(page = 1) {
    if (loading.value) return events.value
    
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

      const response = await api.get('/events', { params })
      
      if (response.data.success) {
        events.value = response.data.data
        
        // Update pagination from response meta
        if (response.data.meta) {
          pagination.value = {
            currentPage: response.data.meta.current_page,
            totalPages: response.data.meta.last_page,
            perPage: response.data.meta.per_page,
            total: response.data.meta.total
          }
        }
        
        initialized.value = true
      } else {
        throw new Error(response.data.message || 'Failed to fetch events')
      }
    } catch (err: any) {
      console.error('Failed to fetch events:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch events'
      events.value = []
    } finally {
      loading.value = false
    }

    return events.value
  }

  async function fetchEventBySlug(slug: string) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get(`/events/${slug}`)
      
      if (response.data.success) {
        currentEvent.value = response.data.data
        return currentEvent.value
      } else {
        throw new Error(response.data.message || 'Event not found')
      }
    } catch (err: any) {
      console.error('Failed to fetch event:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch event'
      currentEvent.value = null
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchUpcoming(limit = 6) {
    try {
      const response = await api.get('/events/upcoming', { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch upcoming events:', err)
      return []
    }
  }

  async function fetchOngoing(limit = 6) {
    try {
      const response = await api.get('/events/ongoing', { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch ongoing events:', err)
      return []
    }
  }

  async function fetchFeatured(limit = 6) {
    try {
      const response = await api.get('/events/featured', { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to fetch featured events:', err)
      return []
    }
  }

  async function fetchCalendar(month?: number, year?: number) {
    try {
      const params: any = {}
      if (month) params.month = month
      if (year) params.year = year

      const response = await api.get('/events/calendar', { params })
      if (response.data.success) {
        // Ensure events is an array and not empty
        const calendarEvents = Array.isArray(response.data.data) ? response.data.data : []
        return calendarEvents
      }
      return []
    } catch (err) {
      console.error('Failed to fetch calendar events:', err)
      return []
    }
  }

  async function registerForEvent(eventId: string, data?: any) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post(`/events/${eventId}/register`, data)
      return { success: true, registration: response.data }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to register for event'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  function setFilters(newFilters: Partial<typeof filters.value>) {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.currentPage = 1
    // Fetch events with new filters
    fetchEvents(1)
  }

  function clearFilters() {
    filters.value = {
      status: 'all',
      date_from: '',
      date_to: '',
      search: '',
      featured: false
    }
    pagination.value.currentPage = 1
    // Fetch events without filters
    fetchEvents(1)
  }

  async function loadMore() {
    if (pagination.value.currentPage < pagination.value.totalPages && !loading.value) {
      const nextPage = pagination.value.currentPage + 1
      const moreEvents = await fetchEvents(nextPage)
      
      if (moreEvents && moreEvents.length > 0) {
        // Append new events to existing ones
        events.value = [...events.value, ...moreEvents]
      }
    }
  }

  // Initialize data on store creation
  // if (!initialized.value) {
  //   fetchEvents()
  // }

  return {
    events,
    currentEvent,
    loading,
    error,
    initialized,
    filters,
    pagination,
    fetchEvents,
    fetchEventBySlug,
    fetchUpcoming,
    fetchOngoing,
    fetchFeatured,
    fetchCalendar,
    registerForEvent,
    setFilters,
    clearFilters,
    loadMore
  }
})