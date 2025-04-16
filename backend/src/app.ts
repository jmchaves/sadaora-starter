import express from 'express'
import cors from 'cors'
import profileRoutes from './routes/profile'
import authRoutes from './routes/auth'
import uploadRouter from './routes/upload'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

app.use('/api/profile', profileRoutes)
app.use('/api/auth', authRoutes)
app.use(uploadRouter)

export default app
