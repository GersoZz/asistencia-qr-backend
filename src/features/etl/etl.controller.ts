import { Request, Response } from 'express'
import * as etlServices from './etl.service'

// Promise<Response>
export const createCourses = async (req: Request, res: Response): Promise<Response> => {
  try {
    // P: validacion

    const { courses } = req.body

    // paso a la capa de servicios
    const userInfo = await etlServices.createCourses(courses)

    return res.status(200).send({ success: true, data: userInfo })
  } catch (error: any) {
    const errorStatus = error?.status === undefined ? 500 : error.status
    return res.status(errorStatus as number).json({ success: false, data: { message: error?.message } })
  }
}
