import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios'
import type { Application, ApplicationForm } from '../types'

export const useApplicationsStore = defineStore('applications', () => {
  const applications = ref<Application[]>([])
  const currentApplication = ref<Application | null>(null)
  const draft = reactive<ApplicationForm>({
    competitionId: null,
    projectId: null,
    type: 'competition',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      postalCode: ''
    },
    projectInfo: {
      title: '',
      description: '',
      budget: 0,
      timeline: '',
      objectives: '',
      targetAudience: ''
    },
    documents: [],
    additionalInfo: {}
  })
  const loading = ref(false)
  const error = ref<string | null>(null)
  const submitting = ref(false)

  async function fetchUserApplications() {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get('/api/applications/user')
      applications.value = response.data
      return applications.value
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch applications'
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchApplicationById(id: string) {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`/api/applications/${id}`)
      currentApplication.value = response.data
      return currentApplication.value
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch application'
      return null
    } finally {
      loading.value = false
    }
  }

  async function submitApplication(applicationData?: ApplicationForm) {
    submitting.value = true
    error.value = null
    
    const dataToSubmit = applicationData || draft
    
    try {
      const formData = new FormData()
      
      // Add form fields
      Object.entries(dataToSubmit).forEach(([key, value]) => {
        if (key === 'documents') {
          // Handle file uploads
          value.forEach((file: File) => {
            formData.append('documents[]', file)
          })
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      })
      
      const response = await axios.post('/api/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      // Clear draft after successful submission
      clearDraft()
      
      return { success: true, application: response.data }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to submit application'
      return { success: false, error: error.value }
    } finally {
      submitting.value = false
    }
  }

  function saveDraft(draftData: Partial<ApplicationForm>) {
    Object.assign(draft, draftData)
    // Save to localStorage for persistence
    localStorage.setItem('applicationDraft', JSON.stringify(draft))
  }

  function loadDraft() {
    const savedDraft = localStorage.getItem('applicationDraft')
    if (savedDraft) {
      try {
        Object.assign(draft, JSON.parse(savedDraft))
      } catch (e) {
        console.error('Failed to load draft:', e)
      }
    }
  }

  function clearDraft() {
    Object.assign(draft, {
      competitionId: null,
      projectId: null,
      type: 'competition',
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        city: '',
        postalCode: ''
      },
      projectInfo: {
        title: '',
        description: '',
        budget: 0,
        timeline: '',
        objectives: '',
        targetAudience: ''
      },
      documents: [],
      additionalInfo: {}
    })
    localStorage.removeItem('applicationDraft')
  }

  async function uploadDocument(file: File) {
    const formData = new FormData()
    formData.append('document', file)
    
    try {
      const response = await axios.post('/api/applications/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      return { success: true, fileUrl: response.data.url }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Upload failed' }
    }
  }

  return {
    applications,
    currentApplication,
    draft,
    loading,
    error,
    submitting,
    fetchUserApplications,
    fetchApplicationById,
    submitApplication,
    saveDraft,
    loadDraft,
    clearDraft,
    uploadDocument
  }
})
