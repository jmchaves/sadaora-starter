import express from 'express'
import multer from 'multer'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { requireAuth } from '../middleware/auth'
import { randomUUID } from 'crypto'

const router = express.Router()
const upload = multer()

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

router.post('/upload', requireAuth, upload.single('file'), async (req, res) => {
  const file = req.file
  if (!file) return res.status(400).json({ error: 'No file uploaded' })

  const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!validTypes.includes(file.mimetype)) {
    return res.status(400).json({ error: 'Only JPG, JPEG, and PNG files are allowed' })
  }

  const key = `avatars/${randomUUID()}-${file.originalname}`

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    )

    const url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    res.json({ url })
  } catch (err) {
    console.error('S3 Upload Error:', err)
    res.status(500).json({ error: 'Failed to upload image to S3' })
  }
})

export default router
