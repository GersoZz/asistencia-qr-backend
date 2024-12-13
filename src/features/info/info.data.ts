import { ICourse } from './info.interface'
import AttendanceModel from './models/Attendance.model'
import CourseModel from './models/Section.model'
import SessionModel from './models/Session.model'

export const createCourses = async (courses: ICourse[]): Promise<any> => {
  const createdCourses = await CourseModel.insertMany(courses)

  return createdCourses
}

export const getSessionStatesBySection = async (sectionId: string) => {
  try {
    const currentTime = new Date()

    // Ajustar la hora actual a UTC-5
    const currentTimeUTC5 = new Date(currentTime.getTime() - 5 * 60 * 60 * 1000)

    // Obtener todas las Sessions de la Section específica
    const sessions = await SessionModel.find({ id_seccion: sectionId })

    const results = await Promise.all(
      sessions.map(async (session) => {
        // Ajustar las horas de inicio y fin a UTC-5
        const startTimeUTC5 = new Date(session.fecha_y_hora.fechaHoraInicio.getTime() - 5 * 60 * 60 * 1000)
        const endTimeUTC5 = new Date(session.fecha_y_hora.fechaHoraFin.getTime() - 5 * 60 * 60 * 1000)

        // Verificar si existen Attendance relacionados con esta Session
        const attendanceExists = await AttendanceModel.exists({ session: session._id })

        let sessionState

        if (currentTimeUTC5 < startTimeUTC5) {
          // Sesión futura
          sessionState = 'futura'
        } else if (currentTimeUTC5 >= startTimeUTC5 && currentTimeUTC5 <= endTimeUTC5) {
          // Sesión en curso
          sessionState = 'en_curso'
        } else if (attendanceExists) {
          // Sesión registrada
          sessionState = 'registrada'
        } else {
          // Sesión perdida
          sessionState = 'perdida'
        }

        return {
          sessionId: session._id,
          sessionState,
          startTime: startTimeUTC5,
          endTime: endTimeUTC5,
          recoveryDate: session.fecha_de_recuperacion,
        }
      })
    )

    return results
  } catch (error) {
    console.error('Error fetching session states:', error)
    throw error
  }
}
