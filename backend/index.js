import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import globalErrorHandler from './controllers/errorHandler.js'
import AppError from './utils/AppError.js'
import handleProjectApi from './routes/project.js'
import handleStudents from './routes/students.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import projectGuideRouter from './routes/projectGuide.js'
import fileRoute from './routes/fileRoute.js'
import handleAdminRoutes from './routes/AdminRoute.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

app.use('/api/files', fileRoute)
app.use('/api/project', handleProjectApi)
app.use('/api/student', handleStudents)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/project-guide', projectGuideRouter)
app.use('/api/admin', handleAdminRoutes)


app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on the server!`)
  // err.statusCode = 404
  // err.status = 'fail'
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404))
})

app.use(globalErrorHandler)

app.listen(PORT, () => {
  console.log(`App is listening in port:${PORT}`)
})
