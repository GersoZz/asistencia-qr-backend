import { Request, Response } from 'express'
import * as authServices from './auth.service'

// Promise<Response>
export const googleOAuth = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { token } = req.headers
    console.log('🚀 ~ googleOAuth ~ token:', token)

    // valido el token
    if (token === undefined) {
      return res.status(400).send({ success: false, error: { message: 'no hay token' } })
    }

    // paso a la capa de servicios
    const userInfo = await authServices.googleOAuth(token)
    console.log('🚀 ~ googleOAuth ~ userInfo:', userInfo)

    return res.status(200).send({ success: true, data: userInfo })
  } catch (error: any) {
    const errorStatus = error?.status === undefined ? 500 : error.status
    return res.status(errorStatus as number).json({ success: false, data: { message: error?.message } })
  }
}
