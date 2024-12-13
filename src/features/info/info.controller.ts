import { Request, Response } from 'express'
import * as etlServices from './info.service'

// Promise<Response>
export const getSections = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user.id as string
    const userRole = req.user.role as string

    // paso a la capa de servicios
    const sections = await etlServices.getSections(userId, userRole)

    return res.status(200).send({ success: true, data: sections })
  } catch (error: any) {
    const errorStatus = error?.status === undefined ? 500 : error.status
    return res.status(errorStatus as number).json({ success: false, data: { message: error?.message } })
  }
}
