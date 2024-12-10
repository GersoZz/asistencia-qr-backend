import type { Express } from 'express'
import expressLoader from './express'
import mongooseLoader from './mongoose'

export default async (expressApp: Express): Promise<void> => {
  await mongooseLoader().then(() => {
    console.log('Database Conexion Ready')
  })

  await expressLoader(expressApp).then(() => {
    console.log('Express Initialized')
  })
}
