import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/services/auth', () => ({
  getUser: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
}))

import * as authService from '@/services/auth'
import { useAuth } from '@/composables/useAuth'

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sets user to null when getUser fails', async () => {
    authService.getUser.mockRejectedValueOnce(new Error('401'))
    const { init, user, booting } = useAuth()
    await init()
    expect(user.value).toBeNull()
    expect(booting.value).toBe(false)
  })

  it('sets user when getUser returns a user with id', async () => {
    authService.getUser.mockResolvedValueOnce({ id: 1, email: 'admin@test.com' })
    const { init, user } = useAuth()
    await init()
    expect(user.value).toEqual({ id: 1, email: 'admin@test.com' })
  })

  it('ignores getUser payloads without id', async () => {
    authService.getUser.mockResolvedValueOnce({ email: 'spoofed@test.com' })
    const { init, user } = useAuth()
    await init()
    expect(user.value).toBeNull()
  })
})
