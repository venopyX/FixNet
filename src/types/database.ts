export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: UserInsert
        Update: UserUpdate
      }
      residents: {
        Row: Resident
        Insert: ResidentInsert
        Update: ResidentUpdate
      }
      reports: {
        Row: Report
        Insert: ReportInsert
        Update: ReportUpdate
      }
      status_updates: {
        Row: StatusUpdate
        Insert: StatusUpdateInsert
        Update: StatusUpdateUpdate
      }
      notifications: {
        Row: Notification
        Insert: NotificationInsert
        Update: NotificationUpdate
      }
      categories: {
        Row: Category
        Insert: CategoryInsert
        Update: CategoryUpdate
      }
      report_attachments: {
        Row: ReportAttachment
        Insert: ReportAttachmentInsert
        Update: ReportAttachmentUpdate
      }
      user_sessions: {
        Row: UserSession
        Insert: UserSessionInsert
        Update: UserSessionUpdate
      }
      audit_logs: {
        Row: AuditLog
        Insert: AuditLogInsert
        Update: AuditLogUpdate
      }
    }
    Views: {
      report_summary: {
        Row: ReportSummary
      }
      user_statistics: {
        Row: UserStatistics
      }
      agency_statistics: {
        Row: AgencyStatistics
      }
    }
    Functions: {
      get_assigned_reports: {
        Args: { user_uuid: string }
        Returns: AssignedReport[]
      }
      create_notification: {
        Args: {
          target_user_id: string
          notification_type: string
          notification_title: string
          notification_message: string
          report_id?: string
          notification_metadata?: object
        }
        Returns: string
      }
      update_report_status_with_notification: {
        Args: {
          report_uuid: string
          new_status: string
          admin_uuid: string
          comment?: string
        }
        Returns: boolean
      }
      find_nearby_reports: {
        Args: {
          target_lat: number
          target_lng: number
          radius_km?: number
          limit_count?: number
        }
        Returns: NearbyReport[]
      }
      get_user_role: {
        Args: { user_id?: string }
        Returns: string
      }
    }
  }
}

// Base interface for all models
export interface BaseModel {
  id: string
  created_at: string
  updated_at: string
}

/**
 * User entity representing system users with role-based access
 */
export interface User extends BaseModel {
  first_name: string
  last_name: string
  email: string
  password: string
  role: 'resident' | 'agency_staff' | 'admin' | 'super_admin'
  status: 'active' | 'inactive' | 'suspended'
  contact_enabled: boolean
  agency?: string
  assigned_categories?: string[]
  last_login?: string
  permissions?: string[]
}

export type UserInsert = Omit<User, 'id' | 'created_at' | 'updated_at'>
export type UserUpdate = Partial<Omit<User, 'id' | 'created_at'>>

/**
 * Resident profile with additional contact information
 */
export interface Resident {
  user_id: string
  address?: string
  phone?: string
}

export type ResidentInsert = Omit<Resident, 'id' | 'created_at' | 'updated_at'>
export type ResidentUpdate = Partial<Omit<Resident, 'id' | 'created_at'>>

/**
 * Report entity for community issue tracking
 */
export interface Report extends BaseModel {
  resident_id: string
  title: string
  description: string
  category: 'roads' | 'electricity' | 'water' | 'waste' | 'safety' | 'other'
  location: string
  photo_url?: string
  status: 'pending' | 'under_review' | 'resolved' | 'rejected'
  longitude?: number
  latitude?: number
  geom?: any // PostGIS geometry field
  priority: 'low' | 'medium' | 'high'
  assigned_to?: string
  resolution_comment?: string
  estimated_completion?: string
  actual_completion?: string
}

export type ReportInsert = Omit<Report, 'id' | 'created_at' | 'updated_at' | 'geom'>
export type ReportUpdate = Partial<Omit<Report, 'id' | 'created_at' | 'geom'>>

/**
 * Status update tracking for reports
 */
export interface StatusUpdate extends BaseModel {
  report_id: string
  admin_id?: string
  previous_status?: string
  new_status: string
  admin_comment?: string
  updated_by?: string
  is_public: boolean
  attachment_url?: string
}

export type StatusUpdateInsert = Omit<StatusUpdate, 'id' | 'created_at' | 'updated_at'>
export type StatusUpdateUpdate = Partial<Omit<StatusUpdate, 'id' | 'created_at'>>

/**
 * User notification system
 */
export interface Notification extends BaseModel {
  user_id: string
  type: 'new_report' | 'status_update' | 'assignment' | 'high_priority' | 'reminder'
  title: string
  message: string
  is_read: boolean
  related_report_id?: string
  metadata?: object
}

export type NotificationInsert = Omit<Notification, 'id' | 'created_at' | 'updated_at'>
export type NotificationUpdate = Partial<Omit<Notification, 'id' | 'created_at'>>

/**
 * Report category management
 */
export interface Category extends BaseModel {
  name: string
  display_name: string
  description?: string
  icon?: string
  color?: string
  is_active: boolean
  assigned_agency?: string
  estimated_response_time: number
}

export type CategoryInsert = Omit<Category, 'id' | 'created_at' | 'updated_at'>
export type CategoryUpdate = Partial<Omit<Category, 'id' | 'created_at'>>

/**
 * File attachments for reports
 */
export interface ReportAttachment extends BaseModel {
  report_id: string
  file_url: string
  file_name: string
  file_type?: string
  file_size?: number
  uploaded_by?: string
  attachment_type: 'initial' | 'progress' | 'completion'
}

export type ReportAttachmentInsert = Omit<ReportAttachment, 'id' | 'created_at' | 'updated_at'>
export type ReportAttachmentUpdate = Partial<Omit<ReportAttachment, 'id' | 'created_at'>>

/**
 * User session tracking
 */
export interface UserSession extends BaseModel {
  user_id: string
  session_token: string
  expires_at: string
  ip_address?: string
  user_agent?: string
  is_active: boolean
}

export type UserSessionInsert = Omit<UserSession, 'id' | 'created_at' | 'updated_at'>
export type UserSessionUpdate = Partial<Omit<UserSession, 'id' | 'created_at'>>

/**
 * System audit logging
 */
export interface AuditLog extends BaseModel {
  user_id?: string
  action: string
  table_name: string
  record_id?: string
  old_values?: object
  new_values?: object
  ip_address?: string
  user_agent?: string
}

export type AuditLogInsert = Omit<AuditLog, 'id' | 'created_at' | 'updated_at'>
export type AuditLogUpdate = Partial<Omit<AuditLog, 'id' | 'created_at'>>

/**
 * Report summary view with joined data
 */
export interface ReportSummary {
  id: string
  title: string
  description: string
  category: string
  location: string
  status: string
  priority: string
  latitude?: number
  longitude?: number
  created_at: string
  updated_at: string
  reporter_name: string
  reporter_email: string
  assigned_to_name?: string
  category_display_name: string
  category_color?: string
  estimated_response_time: number
}

/**
 * User statistics aggregation
 */
export interface UserStatistics {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
  status: string
  agency?: string
  created_at: string
  last_login?: string
  total_reports: number
  resolved_reports: number
  pending_reports: number
}

/**
 * Agency performance metrics
 */
export interface AgencyStatistics {
  agency: string
  staff_count: number
  all_categories: string[]
  total_reports: number
  resolved_reports: number
  pending_reports: number
  under_review_reports: number
  high_priority_reports: number
}

/**
 * Assigned reports for staff members
 */
export interface AssignedReport {
  id: string
  title: string
  category: string
  status: string
  priority: string
  created_at: string
}

/**
 * Nearby reports for location-based queries
 */
export interface NearbyReport {
  id: string
  title: string
  category: string
  status: string
  distance_km: number
}

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * Query parameters for database operations
 */
export interface QueryParams {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, any>
}

/**
 * Database error structure
 */
export interface DatabaseError {
  code: string
  message: string
  details?: string
  hint?: string
}

/**
 * Database service response types
 */
export interface DatabaseResponse<T> {
  data: T | null
  error: DatabaseError | null
}

export interface DatabasePaginatedResponse<T> {
  data: PaginatedResponse<T> | null
  error: DatabaseError | null
}
