import { Router } from 'express'
import type { Router as IRouter } from 'express'
import auth from './v1/routes/auth.route'
import etl from './v1/routes/etl.route'
import config from 'src/config'

export default (): IRouter => {
  const app = Router()
  app.use('/v1', app)

  auth(app)

  if (config.environment === 'development') {
    etl(app)
  }

  return app
}
