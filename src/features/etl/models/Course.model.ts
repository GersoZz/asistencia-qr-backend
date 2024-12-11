import { Schema, model } from 'mongoose'
import { ICourse } from '../etl.interface'

const CourseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    faculty: { type: String, required: true },
    courseCode: { type: String, required: true },
    slug: { type: String },
  },
  {
    timestamps: true,
  }
)

export default model('Course', CourseSchema)
