import { ROLES } from '../../../utils/roles'

export type role = (typeof ROLES)[keyof typeof ROLES]

export interface IUser {
  email: string
  fullName: string
  pictureURL: string
  role: role
}
