import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Notification } from '../types'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  const unreadCount = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchNotifications() {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get('/api/notifications')
      notifications.value = response.data.notifications
      unreadCount.value = response.data.unread_count
      
      return notifications.value
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch notifications'
      return []
    } finally {
      loading.value = false
    }
  }

  async function markAsRead(notificationId: string) {
    try {
      await axios.put(`/api/notifications/${notificationId}/read`)
      
      const notification = notifications.value.find(n => n.id === notificationId)
      if (notification && !notification.readAt) {
        notification.readAt = new Date().toISOString()
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
      
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message }
    }
  }

  async function markAllAsRead() {
    try {
      await axios.put('/api/notifications/read-all')
      
      notifications.value.forEach(notification => {
        if (!notification.readAt) {
          notification.readAt = new Date().toISOString()
        }
      })
      unreadCount.value = 0
      
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message }
    }
  }

  async function deleteNotification(notificationId: string) {
    try {
      await axios.delete(`/api/notifications/${notificationId}`)
      
      const index = notifications.value.findIndex(n => n.id === notificationId)
      if (index !== -1) {
        const notification = notifications.value[index]
        if (!notification.readAt) {
          unreadCount.value = Math.max(0, unreadCount.value - 1)
        }
        notifications.value.splice(index, 1)
      }
      
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message }
    }
  }

  function addNotification(notification: Notification) {
    notifications.value.unshift(notification)
    if (!notification.readAt) {
      unreadCount.value++
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification
  }
})
