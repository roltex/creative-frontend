/**
 * Get the backend base URL dynamically based on environment
 */
function getBackendBaseUrl(): string {
  // Check for runtime configuration first (set by inline script in index.html)
  if (typeof window !== 'undefined' && (window as any).__API_BASE_URL__) {
    return (window as any).__API_BASE_URL__.replace('/api', '')
  }

  // Check build-time environment variable
  if (import.meta.env.VITE_API_BASE_URL) {
    return (import.meta.env.VITE_API_BASE_URL as string).replace('/api', '')
  }

  // Auto-detect based on current domain
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    if (origin.includes('creative.buildweb.dev') || origin.includes('creative-georgia.ge')) {
      return 'https://creative-api.buildweb.dev'
    }
  }

  // Fallback to localhost for development
  return 'http://localhost:8000'
}

/**
 * Utility function to convert image paths to full backend URLs
 * Handles both relative paths and full URLs
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return ''
  }

  // If it's already a full URL (http/https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // Replace localhost URLs with production URL in production environment
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      if (origin.includes('creative.buildweb.dev') || origin.includes('creative-georgia.ge')) {
        if (imagePath.includes('localhost:8000')) {
          return imagePath.replace('http://localhost:8000', 'https://creative-api.buildweb.dev')
        }
      }
    }
    return imagePath
  }

  // Get backend base URL
  const backendBaseUrl = getBackendBaseUrl()

  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath

  // Construct full URL
  return `${backendBaseUrl}/storage/${cleanPath}`
}

/**
 * Get multiple image URLs from an array
 */
export function getImageUrls(imagePaths: string[] | null | undefined): string[] {
  if (!imagePaths || !Array.isArray(imagePaths)) {
    return []
  }

  return imagePaths.map(path => getImageUrl(path)).filter(url => url !== '')
}

