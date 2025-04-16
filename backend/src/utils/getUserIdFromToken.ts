import jwt from 'jsonwebtoken'

export function getUserIdFromToken(authorization?: string): number | null {
  if (!authorization) return null
  const token = authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
    return decoded.userId
  } catch {
    return null
  }
}
