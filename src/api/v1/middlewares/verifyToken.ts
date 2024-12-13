import jwt, { type VerifyErrors } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

import config from 'src/config'
import UserModel from '@users/models/User.model' // P

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { token } = req.headers

  if (token === undefined) return res.status(400).json({ success: false, data: { message: 'token not found' } })

  try {
    jwt.verify(token as string, config.secretToken as string, async (error: VerifyErrors | null, payload: any) => {
      if (error !== null) return res.status(400).json({ success: false, data: { message: 'invalid token' } })

      const userFound = await UserModel.findById(payload?.id)
      if (userFound === null) return res.status(400).json({ success: false, data: { message: 'user not found' } })

      req.user = payload
      next()
    })
  } catch (error) {
    return res.status(500).json({ success: false, data: { message: error } })
  }
}
