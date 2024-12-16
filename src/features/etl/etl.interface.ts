import { Types } from 'mongoose'

export interface ICourse {
  name: string
  slug?: string
  faculty: string
  courseCode: string
}

export interface ISession {
  id_seccion: Types.ObjectId
  fecha_y_hora: {
    fechaHoraInicio: Date
    fechaHoraFin: Date
  }
  fecha_de_recuperacion: Date
}
