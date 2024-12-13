import { Request, Response } from 'express'
import * as attendanceServices from './attendance.service'

export const generateQR = async (req: Request, res: Response): Promise<Response> => {
  try {
    // const userId = req.user.id as string
    // const userRole = req.user.role as string

    const sessionId = req.params.sessionId as string

    // paso a la capa de servicios
    const sections = await attendanceServices.generateQR(sessionId)

    return res.status(200).send({ success: true, data: sections })
  } catch (error: any) {
    const errorStatus = error?.status === undefined ? 500 : error.status
    return res.status(errorStatus as number).json({ success: false, data: { message: error?.message } })
  }
}
