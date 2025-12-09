import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useNotificationsStore } from '../stores/notifications'
import router from '../router'

// Enhanced axios instance with retry and caching
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Add custom retry configuration to axios config
declare module 'axios' {
  interface AxiosRequestConfig {
    retry?: number
    retryDelay?: number
  }
}

// Response cache
interface CacheEntry {
  data: any
  timestamp: number
  ttl: number
}

const responseCache = new Map<string, CacheEntry>()

// Request interceptor with caching
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    
    // Add auth token if available
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    
    // Add locale header
    const locale = localStorage.getItem('locale') || 'ka'
    config.headers['Accept-Language'] = locale

    // Add retry configuration to each request
    if (!config.retry) {
      config.retry = 3
    }
    if (!config.retryDelay) {
      config.retryDelay = 1000
    }

    // Check cache for GET requests
    if (config.method === 'get') {
      const cacheKey = `${config.baseURL}${config.url}${JSON.stringify(config.params || {})}`
      const cached = responseCache.get(cacheKey)
      
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        // Return cached response
        config.adapter = () => {
          return Promise.resolve({
            data: cached.data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
            request: {}
          })
        }
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Enhanced response interceptor with retry logic
api.interceptors.response.use(
  (response) => {
    // Cache successful GET responses
    if (response.config.method === 'get' && response.status === 200) {
      const cacheKey = `${response.config.baseURL}${response.config.url}${JSON.stringify(response.config.params || {})}`
      const ttl = 5 * 60 * 1000 // 5 minutes default
      
      responseCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
        ttl
      })
    }
    
    return response
  },
  async (error) => {
    const config = error.config
    
    // Retry logic for network errors and 5xx errors
    if (config && (config.retry ?? 0) > 0 && (
      !error.response || 
      error.response.status >= 500 || 
      error.code === 'NETWORK_ERROR' ||
      error.code === 'TIMEOUT'
    )) {
      config.retry = (config.retry ?? 0) - 1
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, config.retryDelay || 1000))
      
      console.log(`Retrying API request: ${config.url} (${config.retry} attempts left)`)
      return api(config)
    }

    // Continue with original error handling
    const authStore = useAuthStore()
    const notificationsStore = useNotificationsStore()
    
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        await authStore.logout()
        router.push({ name: 'login' })
        
        notificationsStore.addNotification({
          id: Date.now().toString(),
          userId: '',
          type: 'system',
          title: 'Session Expired',
          message: 'Please login again to continue',
          createdAt: new Date().toISOString()
        })
      }
      
      // Handle 403 Forbidden
      if (error.response.status === 403) {
        notificationsStore.addNotification({
          id: Date.now().toString(),
          userId: '',
          type: 'system',
          title: 'Access Denied',
          message: 'You do not have permission to perform this action',
          createdAt: new Date().toISOString()
        })
      }
      
      // Handle 422 Validation Error
      if (error.response.status === 422) {
        const validationErrors = error.response.data.errors
        if (validationErrors) {
          const firstError = Object.values(validationErrors)[0]
          if (Array.isArray(firstError) && firstError.length > 0) {
            error.message = firstError[0]
          }
        }
      }
      
      // Handle 500 Server Error
      if (error.response.status >= 500) {
        notificationsStore.addNotification({
          id: Date.now().toString(),
          userId: '',
          type: 'system',
          title: 'Server Error',
          message: 'Something went wrong. Please try again later.',
          createdAt: new Date().toISOString()
        })
      }
    } else if (error.request) {
      // Network error
      notificationsStore.addNotification({
        id: Date.now().toString(),
        userId: '',
        type: 'system',
        title: 'Network Error',
        message: 'Unable to connect to the server. Please check your internet connection.',
        createdAt: new Date().toISOString()
      })
    }
    
    return Promise.reject(error)
  }
)

export default api

// Cache management functions
export const clearApiCache = () => {
  responseCache.clear()
}

export const deleteCacheKey = (url: string, params?: any) => {
  const cacheKey = `${api.defaults.baseURL}${url}${JSON.stringify(params || {})}`
  responseCache.delete(cacheKey)
}

export const getCacheSize = () => {
  return responseCache.size
}

// Export specific API functions
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/login', credentials),
  
  register: (data: any) =>
    api.post('/register', data),
  
  logout: () =>
    api.post('/logout'),
  
  forgotPassword: (email: string) =>
    api.post('/forgot-password', { email }),
  
  resetPassword: (data: { token: string; password: string; password_confirmation: string }) =>
    api.post('/reset-password', data),
  
  getUser: () =>
    api.get('/user'),
  
  updateProfile: (data: any) =>
    api.put('/user', data),
  
  changePassword: (data: any) =>
    api.put('/user/password', data)
}

export const competitionsAPI = {
  getAll: (params?: any) =>
    api.get('/competitions', { params }),
  
  getBySlug: (slug: string) =>
    api.get(`/competitions/${slug}`),
  
  apply: (competitionId: string, data: any) =>
    api.post(`/competitions/${competitionId}/apply`, data)
}

export const applicationsAPI = {
  submit: (data: FormData) =>
    api.post('/applications', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  getUserApplications: () =>
    api.get('/applications/user'),
  
  getById: (id: string) =>
    api.get(`/applications/${id}`),
  
  uploadDocument: (file: FormData) =>
    api.post('/applications/upload', file, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const newsAPI = {
  getAll: (params?: any) =>
    api.get('/news', { params }),
  
  getBySlug: (slug: string) =>
    api.get(`/news/${slug}`),
  
  getCategories: () =>
    api.get('/news/categories')
}

export const eventsAPI = {
  getAll: (params?: any) =>
    api.get('/events', { params }),
  
  getById: (id: string) =>
    api.get(`/events/${id}`),
  
  register: (eventId: string, data?: any) =>
    api.post(`/events/${eventId}/register`, data)
}

export const partnersAPI = {
  getAll: (params?: any) =>
    api.get('/partners', { params })
}

export const contactAPI = {
  sendMessage: (data: any) =>
    api.post('/contact', data),
  
  subscribe: (email: string) =>
    api.post('/subscribe', { email })
}
