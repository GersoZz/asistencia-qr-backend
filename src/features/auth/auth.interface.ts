import { IUser } from '../users/interfaces/User.interface'

export type IGUserSignUp = Pick<IUser, 'fullName' | 'email' | 'role'>

export interface IGUserInfo {
  name: string
  email: string
  hd: string
}
