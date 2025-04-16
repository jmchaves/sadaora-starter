import { safeFetch } from './safeFetch'
import type { Profile } from '@/app/types/profile'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function fetchProfiles(token?: string): Promise<Profile[]> {
  return safeFetch(`${API_BASE_URL}/api/profile`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  }, 'fetchProfiles')
}

export async function followProfile(id: number, token: string) {
  return safeFetch(`${API_BASE_URL}/api/profile/${id}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }, `followProfile (id=${id})`)
}

export async function unfollowProfile(id: number, token: string) {
  return safeFetch(`${API_BASE_URL}/api/profile/${id}/follow`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }, `unfollowProfile (id=${id})`)
}

export async function getMyProfile(token: string): Promise<Profile> {
  return safeFetch(`${API_BASE_URL}/api/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }, 'getMyProfile')
}

export async function updateMyProfile(data: object, token: string) {
  return safeFetch(`${API_BASE_URL}/api/profile/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }, 'updateMyProfile')
}
