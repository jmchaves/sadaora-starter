import { safeFetch } from './safeFetch'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export interface AuthResponse {
  token: string
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  return safeFetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }, 'login')
}
