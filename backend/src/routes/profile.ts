import express from 'express'
import { PrismaClient } from '@prisma/client'
import { requireAuth } from '../middleware/auth'
import { getUserIdFromToken } from '../utils/getUserIdFromToken'
import { updateProfileSchema, userIdParamSchema } from '../validators/profile'

const prisma = new PrismaClient()
const router = express.Router()

// Public access — supports optional auth to know who follows who
router.get('/', async (req, res) => {
  const currentUserId = getUserIdFromToken(req.headers.authorization)

  const users = await prisma.user.findMany({
    where: currentUserId ? { id: { not: currentUserId } } : undefined,
    select: {
      id: true,
      email: true,
      profile: true,
      followers: {
        where: currentUserId ? { followerId: currentUserId } : undefined,
        select: { id: true }, // doesn't leak other info
      },
    },
  })

  const result = users.map((user: any) => ({
    ...user,
    isFollowedByMe: user.followers.length > 0,
  }))

  res.json(result)
})

// Get current user's profile
router.get('/me', requireAuth, async (req, res) => {
  const userId = (req as any).userId
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile' })
  }
})

// Update current user's profile
router.put('/me', requireAuth, async (req, res) => {
  const userId = (req as any).userId

  const result = updateProfileSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ error: 'Validation failed', details: result.error.flatten() })
  }

  const { name, headline, bio, photoUrl, interests } = result.data

  try {
    const profile = await prisma.profile.update({
      where: { userId },
      data: { name, headline, bio, photoUrl, interests },
    })
    res.json(profile)
  } catch (error) {
    res.status(500).json({ error: 'Update failed' })
  }
})


// Delete current user's profile
router.delete('/me', requireAuth, async (req, res) => {
  const userId = (req as any).userId
  try {
    await prisma.profile.delete({
      where: { userId },
    })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' })
  }
})

router.post('/:id/follow', requireAuth, async (req, res) => {
  const check = userIdParamSchema.safeParse(req.params)
  if (!check.success) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  const followerId = (req as any).userId
  const followingId = Number(req.params.id)

  if (followerId === followingId) {
    return res.status(400).json({ error: "You can't follow yourself" })
  }

  try {
    await prisma.follow.create({
      data: { followerId, followingId }
    })
    res.status(200).json({ message: 'Followed successfully' })
  } catch {
    res.status(500).json({ error: 'Follow failed' })
  }
})

router.delete('/:id/follow', requireAuth, async (req, res) => {
  const followerId = (req as any).userId
  const followingId = Number(req.params.id)

  if (followerId === followingId) {
    return res.status(400).json({ error: "You can't unfollow yourself" })
  }

  try {
    await prisma.follow.deleteMany({
      where: {
        followerId,
        followingId,
      },
    })
    res.status(200).json({ message: 'Unfollowed successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Unfollow failed' })
  }
})

export default router
