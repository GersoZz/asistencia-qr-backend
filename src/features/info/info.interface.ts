import { Types } from 'mongoose'

export interface ICourse {
  name: string
  slug?: string
  faculty: string
  courseCode: string
}

export interface ISection {
  students: Types.ObjectId[]
  id_course: Types.ObjectId
  professors: Types.ObjectId[]
  cod_section: string
  classroom: string
}
export interface IAttendance {
  student: Types.ObjectId
  session: Types.ObjectId
  registerDate: Date
  state: boolean
}
