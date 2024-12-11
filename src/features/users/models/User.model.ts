import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/User.interface'
import { ROLES } from '@utils/roles'

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String },
    pictureURL: { type: String },
    role: {
      type: String,
      enum: [ROLES.professor, ROLES.student],
      default: ROLES.student,
    },
  },
  {
    timestamps: true,
  }
)

export default model('User', UserSchema)
