// Base interface for all models
export interface BaseModel {
  id: string
  created_at: string
  updated_at: string
}

// Enhanced User interface with all new fields
export interface User extends BaseModel {
  first_name: string
  last_name: string
  email: string
  password: string
  role: 'resident' | 'agency_staff' | 'admin' | 'super_admin'
  status: 'active' | 'inactive' | 'suspended'
  contact_enabled?: boolean
  agency?: string
  assigned_categories?: string[]
  last_login?: string
  permissions?: string[]
}

// Enhanced Report interface with all new fields
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
  priority: 'low' | 'medium' | 'high'
  assigned_to?: string
  resolution_comment?: string
  estimated_completion?: string
  actual_completion?: string
}

// Enhanced StatusUpdate interface
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

// New Notification interface
export interface Notification extends BaseModel {
  user_id: string
  type: 'new_report' | 'status_update' | 'assignment' | 'high_priority' | 'reminder'
  title: string
  message: string
  is_read: boolean
  related_report_id?: string
  metadata?: Record<string, any>
}

// New Category interface
export interface Category extends BaseModel {
  name: string
  display_name: string
  description: string
  icon: string
  color: string
  is_active: boolean
  assigned_agency?: string
  estimated_response_time: number
}

// Mock Users - Updated with enhanced fields
export const mockUsers: User[] = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    password: 'hashedpassword123',
    role: 'resident',
    status: 'active',
    contact_enabled: true,
    last_login: '2025-07-09T18:30:00Z',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane@example.com',
    password: 'hashedpassword456',
    role: 'resident',
    status: 'active',
    contact_enabled: false,
    last_login: '2025-07-09T16:45:00Z',
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z',
  },
  {
    id: '3',
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@fixnet.com',
    password: 'hashedpassword789',
    role: 'super_admin',
    status: 'active',
    contact_enabled: false,
    agency: 'Municipal Administration',
    last_login: '2025-07-09T19:15:00Z',
    permissions: ['manage_reports', 'update_status', 'view_analytics'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    first_name: 'Emily',
    last_name: 'Johnson',
    email: 'emily.johnson@email.com',
    password: 'hashedpassword101',
    role: 'resident',
    status: 'active',
    contact_enabled: true,
    last_login: '2025-07-09T14:20:00Z',
    created_at: '2024-03-05T00:00:00Z',
    updated_at: '2024-03-05T00:00:00Z',
  },
  {
    id: '5',
    first_name: 'Michael',
    last_name: 'Brown',
    email: 'michael.brown@email.com',
    password: 'hashedpassword202',
    role: 'resident',
    status: 'active',
    contact_enabled: true,
    last_login: '2025-07-08T22:10:00Z',
    created_at: '2024-02-20T00:00:00Z',
    updated_at: '2024-02-20T00:00:00Z',
  },
  {
    id: '6',
    first_name: 'Sarah',
    last_name: 'Wilson',
    email: 'sarah.wilson@email.com',
    password: 'hashedpassword303',
    role: 'agency_staff',
    status: 'active',
    contact_enabled: false,
    agency: 'Public Works Department',
    assigned_categories: ['roads', 'waste'],
    last_login: '2025-07-09T17:30:00Z',
    permissions: ['manage_reports', 'update_status'],
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  {
    id: '7',
    first_name: 'David',
    last_name: 'Garcia',
    email: 'david.garcia@email.com',
    password: 'hashedpassword404',
    role: 'resident',
    status: 'active',
    contact_enabled: false,
    last_login: '2025-07-09T12:45:00Z',
    created_at: '2024-04-12T00:00:00Z',
    updated_at: '2024-04-12T00:00:00Z',
  },
  {
    id: '8',
    first_name: 'Lisa',
    last_name: 'Martinez',
    email: 'lisa.martinez@email.com',
    password: 'hashedpassword505',
    role: 'resident',
    status: 'suspended',
    contact_enabled: true,
    last_login: '2025-07-05T09:20:00Z',
    created_at: '2024-03-28T00:00:00Z',
    updated_at: '2024-03-28T00:00:00Z',
  },
  {
    id: '9',
    first_name: 'Robert',
    last_name: 'Taylor',
    email: 'robert.taylor@utilities.gov',
    password: 'hashedpassword606',
    role: 'agency_staff',
    status: 'active',
    contact_enabled: false,
    agency: 'Public Utilities Department',
    assigned_categories: ['electricity', 'water'],
    last_login: '2025-07-09T15:20:00Z',
    permissions: ['manage_reports', 'update_status'],
    created_at: '2024-05-01T00:00:00Z',
    updated_at: '2024-05-01T00:00:00Z',
  },
  {
    id: '10',
    first_name: 'Amanda',
    last_name: 'Anderson',
    email: 'amanda.anderson@email.com',
    password: 'hashedpassword707',
    role: 'resident',
    status: 'active',
    contact_enabled: true,
    last_login: '2025-07-09T11:30:00Z',
    created_at: '2024-04-18T00:00:00Z',
    updated_at: '2024-04-18T00:00:00Z',
  },
  {
    id: '11',
    first_name: 'James',
    last_name: 'Thomas',
    email: 'james.thomas@admin.gov',
    password: 'hashedpassword808',
    role: 'super_admin',
    status: 'active',
    contact_enabled: false,
    agency: 'System Administration',
    last_login: '2025-07-09T20:15:00Z',
    permissions: ['full_access'],
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
  {
    id: '12',
    first_name: 'Jennifer',
    last_name: 'Jackson',
    email: 'jennifer.jackson@email.com',
    password: 'hashedpassword909',
    role: 'resident',
    status: 'active',
    contact_enabled: true,
    last_login: '2025-07-09T13:50:00Z',
    created_at: '2024-06-03T00:00:00Z',
    updated_at: '2024-06-03T00:00:00Z',
  },
  {
    id: '13',
    first_name: 'Christopher',
    last_name: 'White',
    email: 'christopher.white@email.com',
    password: 'hashedpassword010',
    role: 'resident',
    status: 'inactive',
    contact_enabled: false,
    last_login: '2025-06-28T19:30:00Z',
    created_at: '2024-05-15T00:00:00Z',
    updated_at: '2024-05-15T00:00:00Z',
  },
  {
    id: '14',
    first_name: 'Michelle',
    last_name: 'Harris',
    email: 'michelle.harris@safety.gov',
    password: 'hashedpassword111',
    role: 'agency_staff',
    status: 'active',
    contact_enabled: false,
    agency: 'Public Safety Department',
    assigned_categories: ['safety'],
    last_login: '2025-07-09T16:00:00Z',
    permissions: ['manage_reports', 'update_status'],
    created_at: '2024-06-20T00:00:00Z',
    updated_at: '2024-06-20T00:00:00Z',
  },
  {
    id: '15',
    first_name: 'Kevin',
    last_name: 'Clark',
    email: 'kevin.clark@email.com',
    password: 'hashedpassword212',
    role: 'resident',
    status: 'active',
    contact_enabled: true,
    last_login: '2025-07-09T10:20:00Z',
    created_at: '2024-04-08T00:00:00Z',
    updated_at: '2024-04-08T00:00:00Z',
  },
  {
    id: '16',
    first_name: 'Ashley',
    last_name: 'Lewis',
    email: 'ashley.lewis@email.com',
    password: 'hashedpassword313',
    role: 'resident',
    status: 'active',
    contact_enabled: false,
    last_login: '2025-07-08T21:15:00Z',
    created_at: '2024-03-14T00:00:00Z',
    updated_at: '2024-03-14T00:00:00Z',
  },
  {
    id: '17',
    first_name: 'Ryan',
    last_name: 'Walker',
    email: 'ryan.walker@email.com',
    password: 'hashedpassword414',
    role: 'resident',
    status: 'active',
    contact_enabled: true,
    last_login: '2025-07-09T19:45:00Z',
    created_at: '2024-06-10T00:00:00Z',
    updated_at: '2024-06-10T00:00:00Z',
  },
  {
    id: '18',
    first_name: 'Nicole',
    last_name: 'Hall',
    email: 'nicole.hall@admin.gov',
    password: 'hashedpassword515',
    role: 'admin',
    status: 'active',
    contact_enabled: false,
    agency: 'Municipal Administration',
    last_login: '2025-07-09T18:00:00Z',
    permissions: ['manage_reports', 'update_status', 'view_analytics'],
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: '19',
    first_name: 'Brandon',
    last_name: 'Allen',
    email: 'brandon.allen@email.com',
    password: 'hashedpassword616',
    role: 'resident',
    status: 'active',
    contact_enabled: true,
    last_login: '2025-07-09T08:30:00Z',
    created_at: '2024-05-22T00:00:00Z',
    updated_at: '2024-05-22T00:00:00Z',
  },
  {
    id: '20',
    first_name: 'Stephanie',
    last_name: 'Young',
    email: 'stephanie.young@email.com',
    password: 'hashedpassword717',
    role: 'resident',
    status: 'active',
    contact_enabled: true,
    last_login: '2025-07-09T15:10:00Z',
    created_at: '2024-07-01T00:00:00Z',
    updated_at: '2024-07-01T00:00:00Z',
  },
  {
    id: '21',
    first_name: 'Daniel',
    last_name: 'King',
    email: 'daniel.king@email.com',
    password: 'hashedpassword818',
    role: 'resident',
    status: 'active',
    contact_enabled: false,
    last_login: '2025-07-08T17:25:00Z',
    created_at: '2024-06-25T00:00:00Z',
    updated_at: '2024-06-25T00:00:00Z',
  },
  {
    id: '22',
    first_name: 'Megan',
    last_name: 'Wright',
    email: 'megan.wright@maintenance.gov',
    password: 'hashedpassword919',
    role: 'agency_staff',
    status: 'active',
    contact_enabled: false,
    agency: 'General Maintenance',
    assigned_categories: ['other'],
    last_login: '2025-07-09T14:40:00Z',
    permissions: ['manage_reports'],
    created_at: '2024-04-30T00:00:00Z',
    updated_at: '2024-04-30T00:00:00Z',
  },
]

// Mock Reports - Updated with enhanced fields and assignments
export const mockReports: Report[] = [
  {
    id: '1',
    resident_id: '1',
    title: 'Large Pothole on Main Street',
    description: 'There is a dangerous pothole near the intersection of Main Street and Oak Avenue. It has been growing larger and is causing damage to vehicles. The hole is approximately 3 feet wide and 8 inches deep.',
    category: 'roads',
    location: 'Main Street & Oak Avenue Intersection',
    photo_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    status: 'under_review',
    longitude: -74.0059,
    latitude: 40.7128,
    priority: 'high',
    assigned_to: '6',
    estimated_completion: '2025-07-15T00:00:00Z',
    created_at: '2025-01-05T10:30:00Z',
    updated_at: '2025-01-06T14:20:00Z',
  },
  {
    id: '2',
    resident_id: '2',
    title: 'Broken Streetlight',
    description: 'The streetlight at the corner of Pine Street is not working, making the area unsafe at night. This has been an issue for over a week.',
    category: 'electricity',
    location: 'Pine Street Corner',
    status: 'resolved',
    longitude: -74.0089,
    latitude: 40.715,
    priority: 'medium',
    assigned_to: '9',
    resolution_comment: 'Streetlight repaired and tested. New LED bulb installed.',
    actual_completion: '2025-01-04T09:15:00Z',
    created_at: '2025-01-03T16:45:00Z',
    updated_at: '2025-01-04T09:15:00Z',
  },
  {
    id: '3',
    resident_id: '1',
    title: 'Overflowing Garbage Bin',
    description: 'The public garbage bin near the park entrance has been overflowing for several days. This is attracting pests and creating an unpleasant smell.',
    category: 'waste',
    location: 'Central Park Entrance',
    photo_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    status: 'under_review',
    longitude: -74.0065,
    latitude: 40.714,
    priority: 'medium',
    assigned_to: '6',
    estimated_completion: '2025-07-12T00:00:00Z',
    created_at: '2025-01-07T08:20:00Z',
    updated_at: '2025-01-07T14:30:00Z',
  },
  {
    id: '4',
    resident_id: '4',
    title: 'Water Main Break on Elm Street',
    description: 'There appears to be a water main break causing flooding on Elm Street. Water is gushing from underground and affecting traffic flow.',
    category: 'water',
    location: 'Elm Street between 5th and 6th Avenue',
    photo_url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400',
    status: 'under_review',
    longitude: -74.0078,
    latitude: 40.7145,
    priority: 'high',
    assigned_to: '9',
    estimated_completion: '2025-07-11T00:00:00Z',
    created_at: '2025-01-08T14:30:00Z',
    updated_at: '2025-01-08T15:45:00Z',
  },
  {
    id: '5',
    resident_id: '5',
    title: 'Damaged Sidewalk Causing Trip Hazard',
    description: 'Large crack in sidewalk on Maple Avenue creating a serious trip hazard. Several people have already stumbled.',
    category: 'roads',
    location: 'Maple Avenue near Bus Stop 42',
    status: 'resolved',
    longitude: -74.0095,
    latitude: 40.7135,
    priority: 'medium',
    assigned_to: '6',
    resolution_comment: 'Sidewalk repaired with new concrete. Area is now safe.',
    actual_completion: '2025-01-02T16:30:00Z',
    created_at: '2024-12-28T11:15:00Z',
    updated_at: '2025-01-02T16:30:00Z',
  },
  {
    id: '6',
    resident_id: '7',
    title: 'Flickering Traffic Light',
    description: 'Traffic light at the intersection of Broadway and 2nd Street is flickering intermittently, creating confusion for drivers.',
    category: 'electricity',
    location: 'Broadway & 2nd Street Intersection',
    status: 'under_review',
    longitude: -74.0102,
    latitude: 40.7118,
    priority: 'high',
    assigned_to: '9',
    estimated_completion: '2025-07-12T00:00:00Z',
    created_at: '2025-01-06T09:45:00Z',
    updated_at: '2025-01-07T10:15:00Z',
  },
  {
    id: '7',
    resident_id: '8',
    title: 'Leaking Fire Hydrant',
    description: 'Fire hydrant on Cedar Street is leaking continuously, wasting water and creating icy conditions in winter.',
    category: 'water',
    location: 'Cedar Street near House #245',
    photo_url: 'https://images.unsplash.com/photo-1582656975064-04e36e4cd2cd?w=400',
    status: 'under_review',
    longitude: -74.0087,
    latitude: 40.7142,
    priority: 'medium',
    assigned_to: '9',
    estimated_completion: '2025-07-13T00:00:00Z',
    created_at: '2025-01-04T13:20:00Z',
    updated_at: '2025-01-05T10:15:00Z',
  },
  {
    id: '8',
    resident_id: '9',
    title: 'Fallen Tree Blocking Bike Path',
    description: "Large tree has fallen across the bike path in Riverside Park after yesterday's storm. Completely blocking access.",
    category: 'safety',
    location: 'Riverside Park Bike Path - Section C',
    photo_url: 'https://images.unsplash.com/photo-1574263867128-0945c85d6b6e?w=400',
    status: 'resolved',
    longitude: -74.0056,
    latitude: 40.7155,
    priority: 'high',
    assigned_to: '14',
    resolution_comment: 'Tree removed completely. Bike path cleared and safe.',
    actual_completion: '2025-01-03T14:45:00Z',
    created_at: '2025-01-02T07:30:00Z',
    updated_at: '2025-01-03T14:45:00Z',
  },
  {
    id: '9',
    resident_id: '10',
    title: 'Missing Stop Sign',
    description: 'Stop sign at the corner of Willow and Third Street has been knocked down and removed. This intersection is now very dangerous.',
    category: 'safety',
    location: 'Willow Street & Third Street',
    status: 'under_review',
    longitude: -74.0099,
    latitude: 40.7125,
    priority: 'high',
    assigned_to: '14',
    estimated_completion: '2025-07-11T00:00:00Z',
    created_at: '2025-01-05T16:20:00Z',
    updated_at: '2025-01-06T08:30:00Z',
  },
  {
    id: '10',
    resident_id: '12',
    title: 'Graffiti on Public Building',
    description: "Extensive graffiti has appeared on the side of the community center building. It's quite unsightly and should be cleaned.",
    category: 'other',
    location: 'Community Center - West Wall',
    photo_url: 'https://images.unsplash.com/photo-1578852207272-d2dd3b6b6724?w=400',
    status: 'pending',
    longitude: -74.0071,
    latitude: 40.7148,
    priority: 'low',
    created_at: '2025-01-07T12:10:00Z',
    updated_at: '2025-01-07T12:10:00Z',
  },
  // Continue with all other reports in similar fashion with assignments and enhanced fields...
  {
    id: '11',
    resident_id: '13',
    title: 'Overflowing Storm Drain',
    description: 'Storm drain on Oak Street is completely clogged and overflowing during rain, causing street flooding.',
    category: 'water',
    location: 'Oak Street near Intersection with Elm',
    status: 'resolved',
    longitude: -74.0083,
    latitude: 40.7139,
    priority: 'medium',
    assigned_to: '9',
    resolution_comment: 'Storm drain cleaned and cleared. Drainage working properly.',
    actual_completion: '2025-01-03T11:20:00Z',
    created_at: '2024-12-30T15:45:00Z',
    updated_at: '2025-01-03T11:20:00Z',
  },
  {
    id: '12',
    resident_id: '14',
    title: 'Broken Playground Equipment',
    description: "The swing set in Memorial Park has a broken chain on one of the swings. It's dangerous for children to use.",
    category: 'safety',
    location: 'Memorial Park Playground',
    photo_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    status: 'pending',
    longitude: -74.0067,
    latitude: 40.7152,
    priority: 'medium',
    created_at: '2025-01-06T14:30:00Z',
    updated_at: '2025-01-06T14:30:00Z',
  },
  // Additional reports with similar enhancements...
  {
    id: '32',
    resident_id: '19',
    title: 'Malfunctioning Security Light',
    description: 'The security light in the public parking garage on Level 2 keeps flickering on and off, creating safety concerns.',
    category: 'electricity',
    location: 'Public Parking Garage - Level 2, Section B',
    status: 'under_review',
    longitude: -74.0082,
    latitude: 40.7138,
    priority: 'medium',
    assigned_to: '9',
    estimated_completion: '2025-07-12T00:00:00Z',
    created_at: '2025-01-07T20:45:00Z',
    updated_at: '2025-01-08T11:45:00Z',
  },
]

// Mock Status Updates - Enhanced with new fields
export const mockStatusUpdates: StatusUpdate[] = [
  {
    id: '1',
    report_id: '1',
    admin_id: '6',
    previous_status: 'pending',
    new_status: 'under_review',
    admin_comment: 'Report received and assigned to road maintenance team. Inspection scheduled for tomorrow morning. This appears to be a priority issue due to the size and location.',
    updated_by: 'Sarah Wilson',
    is_public: true,
    created_at: '2025-01-06T14:20:00Z',
    updated_at: '2025-01-06T14:20:00Z',
  },
  {
    id: '2',
    report_id: '2',
    admin_id: '9',
    previous_status: 'under_review',
    new_status: 'resolved',
    admin_comment: 'Streetlight has been repaired and is now working properly. Our electrical team replaced the faulty bulb and checked the wiring. Thank you for reporting this safety issue.',
    updated_by: 'Robert Taylor',
    is_public: true,
    created_at: '2025-01-04T09:15:00Z',
    updated_at: '2025-01-04T09:15:00Z',
  },
  {
    id: '3',
    report_id: '3',
    admin_id: '6',
    previous_status: 'pending',
    new_status: 'under_review',
    admin_comment: 'Waste management team will address the overflowing garbage bin. Additional pickup has been scheduled.',
    updated_by: 'Sarah Wilson',
    is_public: true,
    created_at: '2025-01-07T14:30:00Z',
    updated_at: '2025-01-07T14:30:00Z',
  },
  // Continue with more status updates...
]

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'roads',
    display_name: 'Roads & Infrastructure',
    description: 'Road maintenance, potholes, traffic signs, sidewalks',
    icon: '🛣️',
    color: '#6B7280',
    is_active: true,
    assigned_agency: 'Public Works Department',
    estimated_response_time: 48,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'electricity',
    display_name: 'Electrical Systems',
    description: 'Power outages, streetlights, electrical hazards',
    icon: '⚡',
    color: '#F59E0B',
    is_active: true,
    assigned_agency: 'Public Utilities Department',
    estimated_response_time: 24,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'water',
    display_name: 'Water & Plumbing',
    description: 'Water leaks, pipe bursts, water quality issues',
    icon: '💧',
    color: '#3B82F6',
    is_active: true,
    assigned_agency: 'Public Utilities Department',
    estimated_response_time: 12,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'waste',
    display_name: 'Waste Management',
    description: 'Garbage collection, recycling, cleanup',
    icon: '🗑️',
    color: '#10B981',
    is_active: true,
    assigned_agency: 'Public Works Department',
    estimated_response_time: 72,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'safety',
    display_name: 'Public Safety',
    description: 'Safety hazards, security concerns, emergency situations',
    icon: '🛡️',
    color: '#EF4444',
    is_active: true,
    assigned_agency: 'Public Safety Department',
    estimated_response_time: 6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'other',
    display_name: 'Other Issues',
    description: 'General community issues and concerns',
    icon: '📋',
    color: '#8B5CF6',
    is_active: true,
    assigned_agency: 'General Maintenance',
    estimated_response_time: 96,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    user_id: '1',
    type: 'status_update',
    title: 'Report Status Updated',
    message: 'Your report "Large Pothole on Main Street" is now under review',
    is_read: false,
    related_report_id: '1',
    metadata: { old_status: 'pending', new_status: 'under_review' },
    created_at: '2025-01-06T14:20:00Z',
    updated_at: '2025-01-06T14:20:00Z',
  },
  {
    id: '2',
    user_id: '2',
    type: 'status_update',
    title: 'Report Resolved',
    message: 'Your report "Broken Streetlight" has been resolved',
    is_read: true,
    related_report_id: '2',
    metadata: { old_status: 'under_review', new_status: 'resolved' },
    created_at: '2025-01-04T09:15:00Z',
    updated_at: '2025-01-04T09:15:00Z',
  },
  {
    id: '3',
    user_id: '6',
    type: 'new_report',
    title: 'New Report Assigned',
    message: 'New road maintenance report assigned to your department',
    is_read: false,
    related_report_id: '1',
    metadata: { category: 'roads', priority: 'high' },
    created_at: '2025-01-05T10:30:00Z',
    updated_at: '2025-01-05T10:30:00Z',
  },
  {
    id: '4',
    user_id: '9',
    type: 'high_priority',
    title: 'High Priority Report',
    message: 'Urgent electrical issue requires immediate attention',
    is_read: false,
    related_report_id: '6',
    metadata: { category: 'electricity', priority: 'high' },
    created_at: '2025-01-06T09:45:00Z',
    updated_at: '2025-01-06T09:45:00Z',
  },
  {
    id: '5',
    user_id: '14',
    type: 'assignment',
    title: 'Report Assigned',
    message: 'Safety report assigned to your department',
    is_read: true,
    related_report_id: '8',
    metadata: { category: 'safety', priority: 'high' },
    created_at: '2025-01-02T07:30:00Z',
    updated_at: '2025-01-02T07:30:00Z',
  },
]

// Helper functions for data manipulation
export const getUsersByRole = (role: User['role']): User[] => {
  return mockUsers.filter(user => user.role === role)
}

export const getReportsByCategory = (category: Report['category']): Report[] => {
  return mockReports.filter(report => report.category === category)
}

export const getReportsByStatus = (status: Report['status']): Report[] => {
  return mockReports.filter(report => report.status === status)
}

export const getReportsAssignedToUser = (userId: string): Report[] => {
  return mockReports.filter(report => report.assigned_to === userId)
}

export const getUnreadNotifications = (userId: string): Notification[] => {
  return mockNotifications.filter(notification => 
    notification.user_id === userId && !notification.is_read
  )
}

export const getReportStatusHistory = (reportId: string): StatusUpdate[] => {
  return mockStatusUpdates
    .filter(update => update.report_id === reportId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
}

// Current user simulation (this would normally come from authentication)
export const getCurrentUser = (): User | null => {
  // For demo purposes, return the super admin user
  return mockUsers.find(user => user.id === '11') || null
}