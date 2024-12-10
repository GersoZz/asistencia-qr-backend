import type { Express } from 'express'
import expressLoader from './express'

export default async (expressApp: Express): Promise<void> => {
  await expressLoader(expressApp).then(() => {
    console.log('Express Initialized')
  })
}
