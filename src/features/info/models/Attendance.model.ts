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

// Add a unique compound index to prevent duplicate student-session pairs
AttendanceSchema.index({ student: 1, session: 1 }, { unique: true })

export default model('Attendance', AttendanceSchema)
