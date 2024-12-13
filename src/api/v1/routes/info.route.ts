import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import { getSections, getSessions } from '@info/info.controller'

const route = Router()

export default (app: Router): void => {
  app.use('/info', route)

  // @ts-ignore - overload
  route.get('/get-sections', verifyToken, getSections)

  // @ts-ignore - overload
  route.get('/sections/:sectionId/sessions', verifyToken, getSessions)
}
