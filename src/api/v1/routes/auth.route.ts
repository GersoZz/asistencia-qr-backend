import { Router } from 'express'
import { googleOAuth } from '@auth/auth.controller'

const route = Router()

export default (app: Router): void => {
  app.use('/auth', route)

  // @ts-ignore - overload
  route.get('/g-oauth', googleOAuth)
}
