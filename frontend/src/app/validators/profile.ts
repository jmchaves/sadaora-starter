import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  headline: z.string().min(1, 'Headline is required').max(100),
  bio: z.string().max(1000).optional(),
  photoUrl: z.string().url().optional(),
  interests: z.array(z.string()).max(50).optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
