import { Types } from 'mongoose'

import { IUser } from '@users/interfaces/User.interface'
import { IGUserInfo, IGUserSignUp } from '@auth/auth.interface'

import UserModel from '@users/models/User.model'

export const getUserInfoByGToken = async function (token: any): Promise<IGUserInfo> {
  const url = 'https://www.googleapis.com/userinfo/v2/me'

  try {
    const userInfoResponse = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })

    console.log('🚀 ~ file: auth.service.ts:18 ~ getUserInfoByGToken ~ userInfoResponse:', userInfoResponse)

    if (userInfoResponse.status !== 200) {
      const { error: errorJson } = await userInfoResponse.json()
      console.log(errorJson)
      throw {
        status: errorJson.code,
        message: errorJson.message,
      }
    }

    const userInfoJson = await userInfoResponse.json()
    console.log('🚀 ~ file: auth.service.ts:31 ~ getUserInfoByGToken ~ userInfoJson:', userInfoJson)

    const { name, email, hd } = userInfoJson as IGUserInfo

    return { name, email, hd }
  } catch (error: any) {
    console.log('error in data', error)

    throw {
      status: typeof error.status === 'number' ? error.status : 500,
      message: error?.message !== undefined ? error?.message : 'No se pudo obtener los datos',
    }
  }
}

export const userGoogleSignUp = async function ({
  fullName,
  email,
  role,
}: IGUserSignUp): Promise<IUser & { _id: Types.ObjectId }> {
  const newUser = new UserModel({
    fullName,
    email,
    role,
  })

  const createdUser = await newUser.save().catch((err: any) => {
    throw {
      status: 500,
      errorName: err.name,
      message: err.message,
    }
  })

  return createdUser
}
