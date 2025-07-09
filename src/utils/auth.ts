import { ref } from 'vue'
import { mockUsers, type User } from '@/data/mockData'

// Mock authentication state
export const currentUser = ref<User | null>(null)
export const isAuthenticated = ref(false)

// Mock authentication functions
export const authService = {
  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Find user by email
    const user = mockUsers.find((u) => u.email === email)

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    // In real app, you'd check hashed password
    // For demo purposes, any password works except 'wrong'
    if (password === 'wrong') {
      return { success: false, error: 'Invalid password' }
    }

    // Set authenticated state
    currentUser.value = user
    isAuthenticated.value = true

    // Store in localStorage for persistence
    localStorage.setItem('fixnet_user', JSON.stringify(user))
    localStorage.setItem('fixnet_authenticated', 'true')

    return { success: true, user }
  },

  async register(userData: {
    first_name: string
    last_name: string
    email: string
    password: string
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      return { success: false, error: 'Email already registered' }
    }

    // Create new user with all required properties
    const newUser: User = {
      id: String(mockUsers.length + 1),
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: 'hashedpassword', // In real app, this would be properly hashed
      role: 'resident',
      status: 'active', // Default status for new users
      contact_enabled: true, // Default to enabled
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Add to mock users array
    mockUsers.push(newUser)

    // Set authenticated state
    currentUser.value = newUser
    isAuthenticated.value = true

    // Store in localStorage
    localStorage.setItem('fixnet_user', JSON.stringify(newUser))
    localStorage.setItem('fixnet_authenticated', 'true')

    return { success: true, user: newUser }
  },

  async forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Check if user exists
    const user = mockUsers.find((u) => u.email === email)
    if (!user) {
      return { success: false, error: 'Email not found' }
    }

    // In real app, send reset email
    console.log(`Password reset email sent to ${email}`)

    return { success: true }
  },

  logout() {
    currentUser.value = null
    isAuthenticated.value = false
    localStorage.removeItem('fixnet_user')
    localStorage.removeItem('fixnet_authenticated')
  },

  // Check for existing session on app load
  initializeAuth() {
    const storedUser = localStorage.getItem('fixnet_user')
    const storedAuth = localStorage.getItem('fixnet_authenticated')

    if (storedUser && storedAuth === 'true') {
      currentUser.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  },
}

// Demo credentials for easy testing
export const demoCredentials = {
  resident: {
    email: 'john@example.com',
    password: 'demo123',
  },
  admin: {
    email: 'admin@fixnet.com',
    password: 'admin123',
  },
}
