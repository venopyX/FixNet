export interface User {
    id: string
    first_name: string
    last_name: string
    email: string
    role: 'resident' | 'admin'
    created_at: string
    updated_at: string
  }
  
  export interface Report {
    id: string
    resident_id: string
    title: string
    description: string
    category: 'roads' | 'electricity' | 'water' | 'waste' | 'safety' | 'other'
    location: string
    photo_url?: string
    status: 'pending' | 'under_review' | 'resolved' | 'rejected'
    longitude?: number
    latitude?: number
    priority: 'low' | 'medium' | 'high'
    created_at: string
    updated_at: string
  }
  
  export interface StatusUpdate {
    id: string
    report_id: string
    admin_id?: string
    previous_status?: string
    new_status: string
    admin_comment?: string
    updated_by?: string
    created_at: string
    updated_at: string
  }
  
  // Mock Users
  export const mockUsers: User[] = [
    {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      role: 'resident',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    },
    {
      id: '2',
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      role: 'resident',
      created_at: '2025-01-02T00:00:00Z',
      updated_at: '2025-01-02T00:00:00Z'
    },
    {
      id: '3',
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@fixnet.com',
      role: 'admin',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }
  ]
  
  // Mock Reports
  export const mockReports: Report[] = [
    {
      id: '1',
      resident_id: '1',
      title: 'Large Pothole on Main Street',
      description: 'There is a dangerous pothole near the intersection of Main Street and Oak Avenue. It has been growing larger and is causing damage to vehicles.',
      category: 'roads',
      location: 'Main Street & Oak Avenue Intersection',
      photo_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      status: 'under_review',
      longitude: -74.0059,
      latitude: 40.7128,
      priority: 'high',
      created_at: '2025-01-05T10:30:00Z',
      updated_at: '2025-01-06T14:20:00Z'
    },
    {
      id: '2',
      resident_id: '2',
      title: 'Broken Streetlight',
      description: 'The streetlight at the corner of Pine Street is not working, making the area unsafe at night.',
      category: 'electricity',
      location: 'Pine Street Corner',
      status: 'resolved',
      longitude: -74.0089,
      latitude: 40.7150,
      priority: 'medium',
      created_at: '2025-01-03T16:45:00Z',
      updated_at: '2025-01-04T09:15:00Z'
    },
    {
      id: '3',
      resident_id: '1',
      title: 'Overflowing Garbage Bin',
      description: 'The public garbage bin near the park entrance has been overflowing for several days.',
      category: 'waste',
      location: 'Central Park Entrance',
      photo_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      status: 'pending',
      longitude: -74.0065,
      latitude: 40.7140,
      priority: 'medium',
      created_at: '2025-01-07T08:20:00Z',
      updated_at: '2025-01-07T08:20:00Z'
    }
  ]
  
  // Mock Status Updates
  export const mockStatusUpdates: StatusUpdate[] = [
    {
      id: '1',
      report_id: '1',
      admin_id: '3',
      previous_status: 'pending',
      new_status: 'under_review',
      admin_comment: 'Report received and assigned to road maintenance team. Inspection scheduled for tomorrow.',
      updated_by: 'Admin User',
      created_at: '2025-01-06T14:20:00Z',
      updated_at: '2025-01-06T14:20:00Z'
    },
    {
      id: '2',
      report_id: '2',
      admin_id: '3',
      previous_status: 'under_review',
      new_status: 'resolved',
      admin_comment: 'Streetlight has been repaired and is now working properly. Thank you for reporting this issue.',
      updated_by: 'Admin User',
      created_at: '2025-01-04T09:15:00Z',
      updated_at: '2025-01-04T09:15:00Z'
    }
  ]