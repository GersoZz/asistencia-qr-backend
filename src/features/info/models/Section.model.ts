import { Schema, model } from 'mongoose'
import { ISection } from '../info.interface'

const SectionSchema = new Schema<ISection>(
  {
    classroom: { type: String, required: true },
    id_course: { type: Schema.Types.ObjectId, ref: 'Course' },
    cod_section: { type: String, required: true },
    professors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
)

export default model('Section', SectionSchema)
