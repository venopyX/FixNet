import { supabase } from '@/lib/supabase'
import { databaseService } from './database'
import type {
  User,
  UserInsert,
  UserUpdate,
  Report,
  ReportInsert,
  ReportUpdate,
  StatusUpdateInsert,
  NotificationInsert,
  QueryParams,
  ApiResponse,
  PaginatedResponse,
  NearbyReport,
} from '@/types/database'

/**
 * API service class for handling high-level business logic
 */
export class ApiService {
  // =========================
  // AUTHENTICATION
  // =========================

  async signUp(
    email: string,
    password: string,
    userData: Partial<UserInsert>,
  ): Promise<ApiResponse<User>> {
    try {
      // Create auth user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        return { error: authError.message }
      }

      if (!authData.user) {
        return { error: 'Failed to create user account' }
      }

      // Create user profile
      const userProfile: UserInsert = {
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: email,
        password: password, // This will be hashed by the database
        role: userData.role || 'resident',
        status: 'active',
        contact_enabled: userData.contact_enabled || true,
        agency: userData.agency,
        assigned_categories: userData.assigned_categories,
        permissions: userData.permissions,
      }

      const { data: profileData, error: profileError } =
        await databaseService.createUser(userProfile)

      if (profileError) {
        // Clean up auth user if profile creation fails
        await supabase.auth.admin.deleteUser(authData.user.id)
        return { error: profileError.message }
      }

      return { data: profileData || undefined, message: 'User created successfully' }
    } catch (error: any) {
      return { error: error.message || 'Failed to create user' }
    }
  }

  async signIn(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        return { error: authError.message }
      }

      if (!authData.user) {
        return { error: 'Authentication failed' }
      }

      // Get user profile
      const { data: userData, error: userError } = await databaseService.getUserByEmail(email)

      if (userError || !userData) {
        return { error: 'User profile not found' }
      }

      // Update last login
      await databaseService.updateUser(userData.id, {
        last_login: new Date().toISOString(),
      })

      return { data: userData, message: 'Signed in successfully' }
    } catch (error: any) {
      return { error: error.message || 'Sign in failed' }
    }
  }

  async signOut(): Promise<ApiResponse<boolean>> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return { error: error.message }
      }

      return { data: true, message: 'Signed out successfully' }
    } catch (error: any) {
      return { error: error.message || 'Sign out failed' }
    }
  }

  async resetPassword(email: string): Promise<ApiResponse<boolean>> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) {
        return { error: error.message }
      }

      return { data: true, message: 'Password reset email sent' }
    } catch (error: any) {
      return { error: error.message || 'Password reset failed' }
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const { data: authUser, error: authError } = await supabase.auth.getUser()

      if (authError || !authUser.user) {
        return { error: 'Not authenticated' }
      }

      const { data: userData, error: userError } = await databaseService.getUserByEmail(
        authUser.user.email!,
      )

      if (userError || !userData) {
        return { error: 'User profile not found' }
      }

      return { data: userData }
    } catch (error: any) {
      return { error: error.message || 'Failed to get current user' }
    }
  }

  // =========================
  // USER MANAGEMENT
  // =========================

  async getUsers(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      const { data, error } = await databaseService.getUsers(params)

      if (error) {
        return { error: error.message }
      }

      return { data: data || undefined }
    } catch (error: any) {
      return { error: error.message || 'Failed to get users' }
    }
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await databaseService.getUserById(id)

      if (error) {
        return { error: error.message }
      }

      if (!data) {
        return { error: 'User not found' }
      }

      return { data }
    } catch (error: any) {
      return { error: error.message || 'Failed to get user' }
    }
  }

  async updateUser(id: string, updates: UserUpdate): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await databaseService.updateUser(id, updates)

      if (error) {
        return { error: error.message }
      }

      return { data: data || undefined, message: 'User updated successfully' }
    } catch (error: any) {
      return { error: error.message || 'Failed to update user' }
    }
  }

  async deleteUser(id: string): Promise<ApiResponse<boolean>> {
    try {
      const { success, error } = await databaseService.deleteUser(id)

      if (error) {
        return { error: error.message }
      }

      return { data: success, message: 'User deleted successfully' }
    } catch (error: any) {
      return { error: error.message || 'Failed to delete user' }
    }
  }

  // =========================
  // REPORT MANAGEMENT
  // =========================

  async getReports(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Report>>> {
    try {
      const { data, error } = await databaseService.getReports(params)

      if (error) {
        return { error: error.message }
      }

      return { data: data || undefined }
    } catch (error: any) {
      return { error: error.message || 'Failed to get reports' }
    }
  }

  async getReportById(id: string): Promise<ApiResponse<Report>> {
    try {
      const { data, error } = await databaseService.getReportById(id)

      if (error) {
        return { error: error.message }
      }

      if (!data) {
        return { error: 'Report not found' }
      }

      return { data }
    } catch (error: any) {
      return { error: error.message || 'Failed to get report' }
    }
  }

  async createReport(
    reportData: Omit<ReportInsert, 'resident_id'>,
    files?: File[],
  ): Promise<ApiResponse<Report>> {
    try {
      // Get current user
      const userResponse = await this.getCurrentUser()
      if (userResponse.error || !userResponse.data) {
        return { error: 'User not authenticated' }
      }

      // Create report
      const report: ReportInsert = {
        ...reportData,
        resident_id: userResponse.data.id,
      }

      const { data: reportData2, error: reportError } = await databaseService.createReport(report)

      if (reportError || !reportData2) {
        return { error: reportError?.message || 'Failed to create report' }
      }

      // Upload files if provided
      if (files && files.length > 0) {
        await this.uploadReportFiles(reportData2.id, files, userResponse.data.id)
      }

      // Create notification for relevant agency staff
      await this.notifyAgencyStaff(reportData2)

      return { data: reportData2, message: 'Report created successfully' }
    } catch (error: any) {
      return { error: error.message || 'Failed to create report' }
    }
  }

  async updateReport(id: string, updates: ReportUpdate): Promise<ApiResponse<Report>> {
    try {
      const { data, error } = await databaseService.updateReport(id, updates)

      if (error) {
        return { error: error.message }
      }

      return { data: data || undefined, message: 'Report updated successfully' }
    } catch (error: any) {
      return { error: error.message || 'Failed to update report' }
    }
  }

  async updateReportStatus(
    reportId: string,
    newStatus: string,
    comment?: string,
  ): Promise<ApiResponse<boolean>> {
    try {
      // Get current user
      const userResponse = await this.getCurrentUser()
      if (userResponse.error || !userResponse.data) {
        return { error: 'User not authenticated' }
      }

      const { data, error } = await databaseService.updateReportStatusWithNotification(
        reportId,
        newStatus,
        userResponse.data.id,
        comment,
      )

      if (error) {
        return { error: error.message }
      }

      return { data: true, message: 'Report status updated successfully' }
    } catch (error: any) {
      return { error: error.message || 'Failed to update report status' }
    }
  }

  async getUserReports(
    userId: string,
    params?: QueryParams,
  ): Promise<ApiResponse<PaginatedResponse<Report>>> {
    try {
      const { data, error } = await databaseService.getReportsByUser(userId, params)

      if (error) {
        return { error: error.message }
      }

      return { data: data || undefined }
    } catch (error: any) {
      return { error: error.message || 'Failed to get user reports' }
    }
  }

  async getAssignedReports(userId: string): Promise<ApiResponse<any[]>> {
    try {
      const { data, error } = await databaseService.getAssignedReports(userId)

      if (error) {
        return { error: error.message }
      }

      return { data: data || [] }
    } catch (error: any) {
      return { error: error.message || 'Failed to get assigned reports' }
    }
  }

  async getNearbyReports(
    latitude: number,
    longitude: number,
    radiusKm: number = 5.0,
    limitCount: number = 10,
  ): Promise<ApiResponse<NearbyReport[]>> {
    try {
      const { data, error } = await databaseService.getNearbyReports(
        latitude,
        longitude,
        radiusKm,
        limitCount,
      )

      if (error) {
        return { error: error.message }
      }

      return { data: data || [] }
    } catch (error: any) {
      return { error: error.message || 'Failed to get nearby reports' }
    }
  }

  // =========================
  // NOTIFICATION MANAGEMENT
  // =========================

  async getNotifications(
    userId: string,
    params?: QueryParams,
  ): Promise<ApiResponse<PaginatedResponse<any>>> {
    try {
      const { data, error } = await databaseService.getNotifications(userId, params)

      if (error) {
        return { error: error.message }
      }

      return { data: data || undefined }
    } catch (error: any) {
      return { error: error.message || 'Failed to get notifications' }
    }
  }

  async getUnreadNotifications(userId: string): Promise<ApiResponse<any[]>> {
    try {
      const { data, error } = await databaseService.getUnreadNotifications(userId)

      if (error) {
        return { error: error.message }
      }

      return { data: data || [] }
    } catch (error: any) {
      return { error: error.message || 'Failed to get unread notifications' }
    }
  }

  async markNotificationAsRead(id: string): Promise<ApiResponse<boolean>> {
    try {
      const { data, error } = await databaseService.markNotificationAsRead(id)

      if (error) {
        return { error: error.message }
      }

      return { data: true, message: 'Notification marked as read' }
    } catch (error: any) {
      return { error: error.message || 'Failed to mark notification as read' }
    }
  }

  async markAllNotificationsAsRead(userId: string): Promise<ApiResponse<boolean>> {
    try {
      const { success, error } = await databaseService.markAllNotificationsAsRead(userId)

      if (error) {
        return { error: error.message }
      }

      return { data: success, message: 'All notifications marked as read' }
    } catch (error: any) {
      return { error: error.message || 'Failed to mark notifications as read' }
    }
  }

  // =========================
  // FILE MANAGEMENT
  // =========================

  async uploadReportFiles(
    reportId: string,
    files: File[],
    uploadedBy: string,
  ): Promise<ApiResponse<string[]>> {
    try {
      const uploadedUrls: string[] = []

      for (const file of files) {
        const fileName = `${reportId}/${Date.now()}-${file.name}`

        // Upload file to storage
        const { data: uploadData, error: uploadError } = await databaseService.uploadFile(
          'report-attachments',
          fileName,
          file,
        )

        if (uploadError) {
          continue // Skip this file and continue with others
        }

        // Get public URL
        const { data: urlData } = await databaseService.getFileUrl('report-attachments', fileName)

        if (urlData) {
          uploadedUrls.push(urlData)

          // Create attachment record
          await databaseService.createReportAttachment({
            report_id: reportId,
            file_url: urlData,
            file_name: file.name,
            file_type: file.type,
            file_size: file.size,
            uploaded_by: uploadedBy,
            attachment_type: 'initial',
          })
        }
      }

      return { data: uploadedUrls, message: 'Files uploaded successfully' }
    } catch (error: any) {
      return { error: error.message || 'Failed to upload files' }
    }
  }

  // =========================
  // HELPER METHODS
  // =========================

  private async notifyAgencyStaff(report: Report): Promise<void> {
    try {
      // Get agency staff assigned to this category
      const { data: agencyStaff } = await databaseService.getUsersByRole('agency_staff')

      if (agencyStaff) {
        const relevantStaff = agencyStaff.filter((staff) =>
          staff.assigned_categories?.includes(report.category),
        )

        // Create notifications for relevant staff
        for (const staff of relevantStaff) {
          await databaseService.createNotification({
            user_id: staff.id,
            type: 'new_report',
            title: 'New Report Assigned',
            message: `New ${report.category} report: ${report.title}`,
            is_read: false,
            related_report_id: report.id,
            metadata: {
              category: report.category,
              priority: report.priority,
              location: report.location,
            },
          })
        }
      }
    } catch (error) {
      console.error('Failed to notify agency staff:', error)
    }
  }

  // =========================
  // REAL-TIME SUBSCRIPTIONS
  // =========================

  subscribeToReports(callback: (payload: any) => void) {
    return databaseService.subscribeToReports(callback)
  }

  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    return databaseService.subscribeToNotifications(userId, callback)
  }

  subscribeToStatusUpdates(reportId: string, callback: (payload: any) => void) {
    return databaseService.subscribeToStatusUpdates(reportId, callback)
  }

  unsubscribe(subscription: any) {
    return databaseService.unsubscribe(subscription)
  }
}

export type { StatusUpdateInsert, NotificationInsert }

// Export singleton instance
export const apiService = new ApiService()
