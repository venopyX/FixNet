import { supabase } from '@/lib/supabase'
import type {
  Database,
  User,
  UserInsert,
  UserUpdate,
  Report,
  ReportInsert,
  ReportUpdate,
  StatusUpdate,
  StatusUpdateInsert,
  Notification,
  NotificationInsert,
  Category,
  ReportAttachment,
  ReportAttachmentInsert,
  QueryParams,
  PaginatedResponse,
  DatabaseError,
  ReportSummary,
  UserStatistics,
  AgencyStatistics,
  AssignedReport,
  NearbyReport,
} from '@/types/database'

/**
 * Database service class for handling all database operations
 */
export class DatabaseService {
  /**
   * Generic method to handle database errors
   */
  private handleError(error: any): DatabaseError {
    return {
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message || 'An unknown error occurred',
      details: error.details,
      hint: error.hint,
    }
  }

  /**
   * Generic paginated query method
   */
  private async paginatedQuery<T>(
    query: any,
    params: QueryParams = {},
  ): Promise<{ data: PaginatedResponse<T> | null; error: DatabaseError | null }> {
    try {
      const { page = 1, pageSize = 10, search, sortBy, sortOrder = 'desc' } = params
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Apply search if provided
      if (search && sortBy) {
        query = query.ilike(sortBy, `%${search}%`)
      }

      // Apply sorting
      if (sortBy) {
        query = query.order(sortBy, { ascending: sortOrder === 'asc' })
      }

      // Get total count first
      const { count } = await query.select('*', { count: 'exact', head: true })

      // Get paginated data
      const { data, error } = await query.range(from, to)

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return {
        data: {
          data,
          total: count || 0,
          page,
          pageSize,
          totalPages: Math.ceil((count || 0) / pageSize),
        },
        error: null,
      }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  // =========================
  // USER OPERATIONS (unchanged)
  // =========================

  async getUsers(params?: QueryParams) {
    const query = supabase.from('users').select('*')
    return this.paginatedQuery<User>(query, params)
  }

  async getUserById(id: string) {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async getUserByEmail(email: string) {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('email', email).single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async createUser(user: UserInsert) {
    try {
      const { data, error } = await supabase.from('users').insert(user).select().single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async updateUser(id: string, updates: UserUpdate) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async deleteUser(id: string) {
    try {
      const { error } = await supabase.from('users').delete().eq('id', id)

      if (error) {
        return { success: false, error: this.handleError(error) }
      }

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: this.handleError(error) }
    }
  }

  async getUsersByRole(role: User['role']) {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('role', role)

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  // =========================
  // REPORT OPERATIONS (enhanced with spatial queries)
  // =========================

  async getReports(params?: QueryParams) {
    const query = supabase.from('reports').select(`
      *,
      users:resident_id (
        first_name,
        last_name,
        email
      ),
      assigned_user:assigned_to (
        first_name,
        last_name
      )
    `)
    return this.paginatedQuery<Report>(query, params)
  }

  async getReportById(id: string) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select(
          `
          *,
          users:resident_id (
            first_name,
            last_name,
            email
          ),
          assigned_user:assigned_to (
            first_name,
            last_name
          )
        `,
        )
        .eq('id', id)
        .single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async createReport(report: ReportInsert) {
    try {
      const { data, error } = await supabase.from('reports').insert(report).select().single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async updateReport(id: string, updates: ReportUpdate) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async deleteReport(id: string) {
    try {
      const { error } = await supabase.from('reports').delete().eq('id', id)

      if (error) {
        return { success: false, error: this.handleError(error) }
      }

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: this.handleError(error) }
    }
  }

  async getReportsByUser(userId: string, params?: QueryParams) {
    const query = supabase.from('reports').select('*').eq('resident_id', userId)

    return this.paginatedQuery<Report>(query, params)
  }

  async getReportsByCategory(category: string, params?: QueryParams) {
    const query = supabase.from('reports').select('*').eq('category', category)

    return this.paginatedQuery<Report>(query, params)
  }

  async getReportsByStatus(status: string, params?: QueryParams) {
    const query = supabase.from('reports').select('*').eq('status', status)

    return this.paginatedQuery<Report>(query, params)
  }

  async getAssignedReports(userId: string) {
    try {
      const { data, error } = await supabase.rpc('get_assigned_reports', { user_uuid: userId })

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  // NEW: Spatial query for nearby reports
  async getNearbyReports(
    latitude: number,
    longitude: number,
    radiusKm: number = 5.0,
    limitCount: number = 10,
  ) {
    try {
      const { data, error } = await supabase.rpc('find_nearby_reports', {
        target_lat: latitude,
        target_lng: longitude,
        radius_km: radiusKm,
        limit_count: limitCount,
      })

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  // =========================
  // STATUS UPDATE OPERATIONS (unchanged)
  // =========================

  async getStatusUpdates(reportId: string) {
    try {
      const { data, error } = await supabase
        .from('status_updates')
        .select(
          `
          *,
          users:admin_id (
            first_name,
            last_name
          )
        `,
        )
        .eq('report_id', reportId)
        .order('created_at', { ascending: false })

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async createStatusUpdate(statusUpdate: StatusUpdateInsert) {
    try {
      const { data, error } = await supabase
        .from('status_updates')
        .insert(statusUpdate)
        .select()
        .single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async updateReportStatusWithNotification(
    reportId: string,
    newStatus: string,
    adminId: string,
    comment?: string,
  ) {
    try {
      const { data, error } = await supabase.rpc('update_report_status_with_notification', {
        report_uuid: reportId,
        new_status: newStatus,
        admin_uuid: adminId,
        comment,
      })

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  // =========================
  // NOTIFICATION OPERATIONS (unchanged)
  // =========================

  async getNotifications(userId: string, params?: QueryParams) {
    const query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return this.paginatedQuery<Notification>(query, params)
  }

  async getUnreadNotifications(userId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .eq('is_read', false)
        .order('created_at', { ascending: false })

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async createNotification(notification: NotificationInsert) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert(notification)
        .select()
        .single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async markNotificationAsRead(id: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async markAllNotificationsAsRead(userId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false)

      if (error) {
        return { success: false, error: this.handleError(error) }
      }

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: this.handleError(error) }
    }
  }

  // =========================
  // CATEGORY OPERATIONS (unchanged)
  // =========================

  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async getCategoryByName(name: string) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('name', name)
        .single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  // =========================
  // ATTACHMENT OPERATIONS (unchanged)
  // =========================

  async getReportAttachments(reportId: string) {
    try {
      const { data, error } = await supabase
        .from('report_attachments')
        .select('*')
        .eq('report_id', reportId)
        .order('created_at', { ascending: false })

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async createReportAttachment(attachment: ReportAttachmentInsert) {
    try {
      const { data, error } = await supabase
        .from('report_attachments')
        .insert(attachment)
        .select()
        .single()

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async deleteReportAttachment(id: string) {
    try {
      const { error } = await supabase.from('report_attachments').delete().eq('id', id)

      if (error) {
        return { success: false, error: this.handleError(error) }
      }

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: this.handleError(error) }
    }
  }

  // =========================
  // VIEW OPERATIONS (unchanged)
  // =========================

  async getReportSummary(params?: QueryParams) {
    const query = supabase.from('report_summary').select('*')
    return this.paginatedQuery<ReportSummary>(query, params)
  }

  async getUserStatistics(params?: QueryParams) {
    const query = supabase.from('user_statistics').select('*')
    return this.paginatedQuery<UserStatistics>(query, params)
  }

  async getAgencyStatistics() {
    try {
      const { data, error } = await supabase.from('agency_statistics').select('*')

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  // =========================
  // FILE UPLOAD OPERATIONS (unchanged)
  // =========================

  async uploadFile(bucket: string, path: string, file: File) {
    try {
      const { data, error } = await supabase.storage.from(bucket).upload(path, file)

      if (error) {
        return { data: null, error: this.handleError(error) }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async getFileUrl(bucket: string, path: string) {
    try {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)

      return { data: data.publicUrl, error: null }
    } catch (error) {
      return { data: null, error: this.handleError(error) }
    }
  }

  async deleteFile(bucket: string, path: string) {
    try {
      const { error } = await supabase.storage.from(bucket).remove([path])

      if (error) {
        return { success: false, error: this.handleError(error) }
      }

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: this.handleError(error) }
    }
  }

  // =========================
  // REAL-TIME SUBSCRIPTIONS (unchanged)
  // =========================

  subscribeToReports(callback: (payload: any) => void) {
    return supabase
      .channel('reports')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, callback)
      .subscribe()
  }

  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        callback,
      )
      .subscribe()
  }

  subscribeToStatusUpdates(reportId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`status_updates:${reportId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'status_updates',
          filter: `report_id=eq.${reportId}`,
        },
        callback,
      )
      .subscribe()
  }

  unsubscribe(subscription: any) {
    return supabase.removeChannel(subscription)
  }
}

// Export singleton instance
export const databaseService = new DatabaseService()
