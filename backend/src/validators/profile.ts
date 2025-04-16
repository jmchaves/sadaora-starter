import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  headline: z.string().max(100).optional(),
  bio: z.string().max(1000).optional(),
  photoUrl: z.string().url().optional(),
  interests: z.array(z.string()).max(50).optional(),
})

export const userIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Invalid user ID'),
})
