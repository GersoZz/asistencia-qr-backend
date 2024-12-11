import UserModel from '@users/models/User.model'
import { type IUser } from '@users/interfaces/User.interface'
import { type Types } from 'mongoose'

export const findUserByEmail = async function (email: string): Promise<(IUser & { _id: Types.ObjectId }) | null> {
  const user = await UserModel.findOne({ email }).catch((err) => {
    throw {
      status: 500,
      errorName: err.name,
      message: err.message,
    }
  })

  return user
}
