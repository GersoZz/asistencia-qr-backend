import { Types } from 'mongoose'
import AttendanceModel from '../info/models/Attendance.model'
import { UpdateStudentAttendanceData } from './attendance.interface'

export const createAttendance = async (newStudentAttendance: UpdateStudentAttendanceData): Promise<any> => {
  try {
    const { sessionId, studentId, state } = newStudentAttendance

    const attendanceToCreate = {
      student: new Types.ObjectId(studentId),
      session: new Types.ObjectId(sessionId),
      registerDate: new Date(),
      state: state,
    }

    const newAttendance = new AttendanceModel(attendanceToCreate)
    const savedAttendance = await newAttendance.save()

    return savedAttendance
  } catch (error: any) {
    if (error.code === 11000) {
      throw {
        status: 400,
        message: 'Su asistencia para esta sesión ya fue registrada.',
      }
    }
    throw error
  }
}
