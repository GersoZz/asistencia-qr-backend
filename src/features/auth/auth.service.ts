import * as usersData from '@users/users.data'
import * as authData from '@auth/auth.data'

import { createAccessToken } from '../../libs/jwt'
import { ROLES } from 'src/utils/roles'

export const googleOAuth = async (token: any): Promise<any> => {
  try {
    const userGoogleInfo = await authData.getUserInfoByGToken(token)
    console.log('🚀 ~ googleOAuth ~ userGoogleInfo:', userGoogleInfo)

    const { name, email, hd } = userGoogleInfo

    // validates that the user is not registered
    const userInfo = await usersData.findUserByEmail(email)
    console.log('🚀 ~ file: auth.service.ts:61 ~ googleOAuth ~ userInfo:', userInfo)

    if (userInfo !== null) {
      const tokenGenerated = await createAccessToken({ id: userInfo._id, role: userInfo.role })
      return { token: tokenGenerated, userInfo }
    }

    // registramos al usuario
    if (hd !== 'uni.pe' && hd !== 'uni.edu.pe') {
      throw {
        status: 400,
        message: 'No se puede registrar correos fuera del dominio de la universidad',
      }
    }

    const role = hd === 'uni.edu.pe' ? ROLES.professor : ROLES.student

    const userRegistered = await authData.userGoogleSignUp({ fullName: name, email, role })
    console.log('🚀 ~ file: auth.service.ts:70 ~ googleOAuth ~ userRegistered:', userRegistered)

    // generamos el JWT
    const tokenGenerated = await createAccessToken({ id: userRegistered._id, role: userRegistered.role })

    return { token: tokenGenerated, userInfo: userRegistered }
  } catch (error) {
    console.log('errorService', error)
    throw error
  }
}
