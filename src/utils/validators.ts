export interface ValidationResult {
  isValid: boolean
  error?: string
}

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: 'Email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }

  return { isValid: true }
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password is required' }
  }

  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' }
  }

  return { isValid: true }
}

export function validateName(name: string, fieldName: string): ValidationResult {
  if (!name) {
    return { isValid: false, error: `${fieldName} is required` }
  }

  if (name.length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` }
  }

  return { isValid: true }
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
): ValidationResult {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' }
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' }
  }

  return { isValid: true }
}
