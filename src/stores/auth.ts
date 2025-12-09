import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { User } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  async function login(credentials: { email: string; password: string }) {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.post('/api/login', credentials)
      const { token: newToken, user: userData } = response.data
      
      token.value = newToken
      user.value = userData
      
      localStorage.setItem('token', newToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function register(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
  }) {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.post('/api/register', userData)
      const { token: newToken, user: newUser } = response.data
      
      token.value = newToken
      user.value = newUser
      
      localStorage.setItem('token', newToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await axios.post('/api/logout')
    } catch (err) {
      // Ignore logout errors
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }

  async function fetchUser() {
    if (!token.value) return
    
    loading.value = true
    error.value = null
    
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      const response = await axios.get('/api/user')
      user.value = response.data
    } catch (err) {
      token.value = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    } finally {
      loading.value = false
    }
  }

  async function updateProfile(profileData: Partial<User>) {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.put('/api/user', profileData)
      user.value = response.data
      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update profile'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function changePassword(passwords: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }) {
    loading.value = true
    error.value = null
    
    try {
      await axios.put('/api/user/password', passwords)
      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to change password'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
    changePassword
  }
})
