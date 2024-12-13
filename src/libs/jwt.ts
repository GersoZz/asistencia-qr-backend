import jwt from 'jsonwebtoken'
import config from 'src/config'

export async function createToken(payload: string | object | Buffer): Promise<any> {
  return await new Promise((resolve, reject) => {
    jwt.sign(payload, config.secretToken as string, (err: any, token: any) => {
      if (err !== null) reject(err)
      resolve(token)
    })
  })
}
