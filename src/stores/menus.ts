import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'

interface MenuItem {
  id: number
  title: { ka: string; en: string }
  subtitle?: { ka: string; en: string }
  url: string
  type: string
  target: string
  order: number
  is_active: boolean
  children: MenuItem[]
}

interface Menu {
  id: number
  name: { ka: string; en: string }
  location: string
  items: MenuItem[]
}

export const useMenusStore = defineStore('menus', () => {
  const menus = ref<Menu[]>([])
  const headerMenu = ref<Menu | null>(null)
  const footerMenu = ref<Menu | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  async function fetchMenus() {
    if (loading.value) return menus.value
    
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/menus')
      
      if (response.data.success) {
        menus.value = response.data.data
        initialized.value = true
      } else {
        throw new Error(response.data.message || 'Failed to fetch menus')
      }
    } catch (err: any) {
      console.error('Failed to fetch menus:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to fetch menus'
      menus.value = []
    } finally {
      loading.value = false
    }

    return menus.value
  }

  async function fetchHeaderMenu() {
    try {
      const response = await api.get('/menus/header')
      
      if (response.data.success) {
        headerMenu.value = response.data.data
        return headerMenu.value
      } else {
        headerMenu.value = null
        return null
      }
    } catch (err: any) {
      console.error('Failed to fetch header menu:', err.message)
      headerMenu.value = null
      return null
    }
  }

  async function fetchFooterMenu() {
    try {
      const response = await api.get('/menus/footer')
      
      if (response.data.success) {
        footerMenu.value = response.data.data
        return footerMenu.value
      } else {
        footerMenu.value = null
        return null
      }
    } catch (err) {
      console.error('Failed to fetch footer menu:', err)
      footerMenu.value = null
      return null
    }
  }

  async function fetchMenuByLocation(location: string) {
    try {
      const response = await api.get(`/menus/location/${location}`)
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error(`Failed to fetch ${location} menu:`, err)
      return null
    }
  }

  async function generateBreadcrumbs(path: string) {
    try {
      const response = await api.get('/menus/breadcrumbs', { params: { path } })
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Failed to generate breadcrumbs:', err)
      return []
    }
  }

  // Helper function to find menu item by URL
  function findMenuItemByUrl(url: string, items: MenuItem[] = []): MenuItem | null {
    for (const item of items) {
      if (item.url === url) {
        return item
      }
      if (item.children && item.children.length > 0) {
        const found = findMenuItemByUrl(url, item.children)
        if (found) return found
      }
    }
    return null
  }

  // Helper function to get menu item hierarchy
  function getMenuItemHierarchy(url: string): MenuItem[] {
    const hierarchy: MenuItem[] = []
    
    const findInHierarchy = (items: MenuItem[], currentPath: MenuItem[] = []): boolean => {
      for (const item of items) {
        const newPath = [...currentPath, item]
        
        if (item.url === url) {
          hierarchy.push(...newPath)
          return true
        }
        
        if (item.children && item.children.length > 0) {
          if (findInHierarchy(item.children, newPath)) {
            return true
          }
        }
      }
      return false
    }

    if (headerMenu.value) {
      findInHierarchy(headerMenu.value.items)
    }
    
    return hierarchy
  }

  // Initialize data on store creation
  if (!initialized.value) {
    Promise.all([
      fetchMenus(),
      fetchHeaderMenu(),
      fetchFooterMenu()
    ])
  }

  return {
    menus,
    headerMenu,
    footerMenu,
    loading,
    error,
    initialized,
    fetchMenus,
    fetchHeaderMenu,
    fetchFooterMenu,
    fetchMenuByLocation,
    generateBreadcrumbs,
    findMenuItemByUrl,
    getMenuItemHierarchy
  }
})
