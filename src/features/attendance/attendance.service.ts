import { createToken } from 'src/libs/jwt'

export const generateQR = async (sessionId: string): Promise<any> => {
  //P: deberia pasarle tiempo de caducidad
  const sessionIdJWT = await createToken({
    sessionId,
  })

  return sessionIdJWT
}
