import { Schema, model } from 'mongoose'
import { ISession } from '../../etl/etl.interface'

const SesionSchema = new Schema<ISession>(
  {
    id_seccion: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    fecha_y_hora: {
      type: {
        fechaHoraInicio: { type: Date, required: true },
        fechaHoraFin: { type: Date, required: true },
      },
      required: true,
    },
    fecha_de_recuperacion: { type: Date },
  },
  {
    timestamps: true,
  }
)

export default model('Sesion', SesionSchema)
