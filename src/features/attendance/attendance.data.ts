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

export const setAttendanceOfStudent = async (newStudentAttendance: UpdateStudentAttendanceData): Promise<any> => {
  const { sessionId, studentId, state } = newStudentAttendance

  const attendanceToUpdate = {
    student: new Types.ObjectId(studentId),
    session: new Types.ObjectId(sessionId),
    state: state,
    registerDate: new Date(),
  }

  const updatedAttendances = await AttendanceModel.updateMany(
    { student: studentId, session: sessionId },
    { $set: attendanceToUpdate }
  )

  return updatedAttendances
}

export const removeAttendanceOfStudent = async (newStudentAttendance: UpdateStudentAttendanceData): Promise<any> => {
  const { sessionId, studentId } = newStudentAttendance

  // const attendanceToRemove = {
  //   student: new Types.ObjectId(studentId),
  //   session: new Types.ObjectId(sessionId),
  // }

  const removedAttendances = await AttendanceModel.deleteMany({
    $and: [{ student: studentId }, { session: sessionId }],
  })
  console.log('🚀 ~ file: attendance.data.ts:60 ~ removeAttendanceOfStudent ~ removedAttendances:', removedAttendances)

  return removedAttendances
}
