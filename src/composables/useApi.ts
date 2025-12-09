import { ref, Ref } from 'vue'
import api from '../api/axios'

interface ApiState<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  refetch: () => Promise<T | null>
}

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresIn: number
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn: ttl
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > entry.expiresIn) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }
}

const cache = new ApiCache()

export function useApi<T>(
  url: string,
  options?: {
    immediate?: boolean
    cache?: boolean
    cacheTTL?: number
    retryAttempts?: number
    retryDelay?: number
  }
): ApiState<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<string | null>(null)

  const {
    immediate = true,
    cache: useCache = true,
    cacheTTL = 5 * 60 * 1000, // 5 minutes
    retryAttempts = 2,
    retryDelay = 1000
  } = options || {}

  const fetchData = async (attempt = 0): Promise<T | null> => {
    const cacheKey = `api_${url}`
    
    // Check cache first
    if (useCache) {
      const cachedData = cache.get<T>(cacheKey)
      if (cachedData) {
        data.value = cachedData
        return cachedData
      }
    }

    loading.value = true
    error.value = null

    try {
      const response = await api.get(url)
      
      if (response.data.success) {
        const responseData = response.data.data
        data.value = responseData

        // Cache the response
        if (useCache) {
          cache.set(cacheKey, responseData, cacheTTL)
        }

        return responseData
      } else {
        throw new Error(response.data.message || 'API request failed')
      }
    } catch (err: any) {
      console.error(`API request failed for ${url}:`, err)
      
      // Retry logic
      if (attempt < retryAttempts) {
        console.log(`Retrying request (${attempt + 1}/${retryAttempts}) after ${retryDelay}ms...`)
        await new Promise(resolve => setTimeout(resolve, retryDelay))
        return fetchData(attempt + 1)
      }

      error.value = err.response?.data?.message || err.message || 'Failed to fetch data'
      data.value = null
      return null
    } finally {
      loading.value = false
    }
  }

  const refetch = () => {
    // Clear cache for this endpoint
    if (useCache) {
      cache.delete(`api_${url}`)
    }
    return fetchData()
  }

  // Auto-fetch if immediate is true
  if (immediate) {
    fetchData()
  }

  return {
    data,
    loading,
    error,
    refetch
  }
}

export function useApiMutation<TData, TVariables = any>() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<TData | null>(null)

  const mutate = async (
    url: string,
    variables?: TVariables,
    method: 'POST' | 'PUT' | 'DELETE' = 'POST'
  ): Promise<TData | null> => {
    loading.value = true
    error.value = null

    try {
      let response
      switch (method) {
        case 'POST':
          response = await api.post(url, variables)
          break
        case 'PUT':
          response = await api.put(url, variables)
          break
        case 'DELETE':
          response = await api.delete(url)
          break
      }

      if (response.data.success) {
        data.value = response.data.data
        return response.data.data
      } else {
        throw new Error(response.data.message || 'Mutation failed')
      }
    } catch (err: any) {
      console.error(`API mutation failed for ${url}:`, err)
      error.value = err.response?.data?.message || err.message || 'Operation failed'
      return null
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    loading.value = false
    error.value = null
    data.value = null
  }

  return {
    data,
    loading,
    error,
    mutate,
    reset
  }
}

// Export cache instance for manual cache management
export { cache }
