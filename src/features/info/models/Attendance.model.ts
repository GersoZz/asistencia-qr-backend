import { Schema, model } from 'mongoose'
import { IAttendance } from '../info.interface'

const AttendanceSchema = new Schema<IAttendance>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User' },
    session: { type: Schema.Types.ObjectId, ref: 'Session' },
    registerDate: { type: Date },
    state: { type: Boolean },
  },
  {
    timestamps: true,
  }
)

export default model('Attendance', AttendanceSchema)
