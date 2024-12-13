import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import { generateQR } from '@attendance/attendance.controller'

const route = Router()

export default (app: Router): void => {
  app.use('/attendance', route)

  // @ts-ignore - overload
  route.get('/generate-qr/:sessionId', verifyToken, generateQR)
}
