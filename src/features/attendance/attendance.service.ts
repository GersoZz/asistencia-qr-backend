import jwt, { type VerifyErrors } from 'jsonwebtoken'
import config from 'src/config'

import { createToken } from 'src/libs/jwt'
import UserModel from '../users/models/User.model'
import AttendanceModel from '../info/models/Attendance.model'
import * as attendanceData from './attendance.data'
import { UpdateStudentAttendanceData } from './attendance.interface'

export const generateQR = async (sessionId: string): Promise<any> => {
  //P: deberia pasarle tiempo de caducidad
  const sessionIdJWT = await createToken({
    sessionId,
  })

  return sessionIdJWT
}

export const getAttendanceOfSession = async (sessionId: string): Promise<any> => {
  const attendances = await AttendanceModel.find({ session: sessionId }).populate('student')
  return attendances
}

export const registerQR = async (jwtQR: string, userId: string): Promise<any> => {
  try {
    const aux = jwt.verify(
      jwtQR as string,
      config.secretToken as string,
      async (error: VerifyErrors | null, payload: any) => {
        if (error !== null) throw { success: false, data: { message: 'invalid jwtQR' } }

        const sessionId = payload.sessionId

        const userFound = await UserModel.findById(userId)
        if (userFound === null) throw { success: false, data: { message: 'user not found' } }

        const savedAttendance = await attendanceData.createAttendance({
          sessionId,
          studentId: userFound._id.toString(),
          state: true,
        })

        console.log('🚀 ~ jwt.verify ~ savedAttendance:', savedAttendance)

        return savedAttendance
      }
    )
    console.log('🚀 ~ file: attendance.service.ts:46 ~ registerQR ~ aux:', aux)

    return aux
  } catch (error) {
    throw error
  }
}

export const setAttendanceOfStudent = async (inputData: UpdateStudentAttendanceData): Promise<any> => {
  if (inputData.state === false) {
    const removedAttendances = await attendanceData.removeAttendanceOfStudent(inputData)
    return removedAttendances
  }

  const updatedAttendances = await attendanceData.setAttendanceOfStudent(inputData)

  if (updatedAttendances.matchedCount === 0) {
    const newAttendance = await attendanceData.createAttendance(inputData)
    return newAttendance
  }

  return updatedAttendances
}
