// User and Authentication Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: 'applicant' | 'reviewer' | 'admin'
  profileData?: Record<string, any>
  emailVerifiedAt?: string
  createdAt: string
  updatedAt: string
}

// Competition Types
export interface Competition {
  id: string | number
  slug: string
  title: TranslatableField
  description: TranslatableField
  status: 'current' | 'completed' | 'upcoming' | 'cancelled'
  startDate?: string
  endDate?: string
  start_date?: string
  end_date?: string
  criteria?: TranslatableField
  rules?: TranslatableField
  category?: string
  prize?: string
  image?: string
  maxParticipants?: number
  currentParticipants?: number
  createdAt?: string
  updatedAt?: string
  created_at?: string
  updated_at?: string
}

// Application Types
export interface Application {
  id: string
  applicationNumber: string
  userId: string
  competitionId?: string
  projectId?: string
  type: 'competition' | 'funding'
  status: 'draft' | 'submitted' | 'received' | 'reviewing' | 'approved' | 'rejected'
  data: ApplicationData
  submittedAt?: string
  createdAt: string
  updatedAt: string
  user?: User
  competition?: Competition
  project?: Project
}

export interface ApplicationForm {
  competitionId: string | null
  projectId: string | null
  type: 'competition' | 'funding'
  personalInfo: PersonalInfo
  projectInfo: ProjectInfo
  documents: File[]
  additionalInfo: Record<string, any>
}

export interface ApplicationData {
  personalInfo: PersonalInfo
  projectInfo: ProjectInfo
  documents: Document[]
  additionalInfo: Record<string, any>
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  postalCode: string
  organization?: string
  position?: string
}

export interface ProjectInfo {
  title: string
  description: string
  budget: number
  timeline: string
  objectives: string
  targetAudience: string
  teamMembers?: TeamMember[]
  previousWork?: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
}

export interface Document {
  id: string
  applicationId: string
  filePath: string
  originalName: string
  fileType: string
  uploadedAt: string
}

// Project Types (for funding)
export interface Project {
  id: string
  slug: string
  title: TranslatableField
  description: TranslatableField
  criteria: TranslatableField
  rules: TranslatableField
  maxBudget?: number
  createdAt: string
  updatedAt: string
}

// News Types
export interface NewsArticle {
  id: string
  slug: string
  title: TranslatableField
  content: TranslatableField
  excerpt?: TranslatableField
  image?: string
  gallery?: string[]
  publishedAt: string
  category: string
  authorId: string
  author?: User
  tags?: string[]
  viewCount?: number
  createdAt: string
  updatedAt: string
}

// Press Types
export interface PressArticle extends NewsArticle {
  mediaName?: string
  mediaLogo?: string
  externalUrl?: string
}

// Event Types
export interface Event {
  id: string
  slug?: string
  title: TranslatableField
  description: TranslatableField
  details?: TranslatableField
  startAt: string
  endAt: string
  location: string
  isPublic: boolean
  capacity?: number
  price?: number
  image?: string
  registrationRequired: boolean
  registrationDeadline?: string
  type: 'competition' | 'workshop' | 'exhibition' | 'conference' | 'other'
  createdAt: string
  updatedAt: string
}

// Partner Types
export interface Partner {
  id: string
  name: string
  logoPath: string
  websiteUrl?: string
  type: 'local' | 'international'
  description?: TranslatableField
  order: number
  createdAt: string
  updatedAt: string
}

// FAQ Types
export interface FAQ {
  id: string
  question: TranslatableField
  answer: TranslatableField
  order: number
  category?: string
  createdAt: string
  updatedAt: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'application_status' | 'competition_reminder' | 'event_reminder' | 'news' | 'system'
  title: string
  message: string
  data?: Record<string, any>
  readAt?: string
  createdAt: string
}

// Contact Message Types
export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
  phone?: string
}

// Subscription Types
export interface Subscription {
  email: string
}

// Utility Types
export interface TranslatableField {
  ka: string
  en: string
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  perPage: number
  total: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
  meta?: PaginationMeta
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
}
