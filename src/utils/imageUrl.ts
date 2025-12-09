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
    return imagePath
  }

  // Get backend base URL (without /api)
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
  const backendBaseUrl = apiBaseUrl.replace('/api', '')

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

