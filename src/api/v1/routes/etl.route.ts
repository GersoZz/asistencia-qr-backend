import { Router } from 'express'
import { createCourses } from '@etl/etl.controller'

const route = Router()

export default (app: Router): void => {
  app.use('/etl', route)

  // @ts-ignore - overload
  route.post('/create-courses', createCourses)
}
