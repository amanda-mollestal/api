import { Request } from 'express'
import { IUser } from '../models/UserModel'
import { IHabit } from '../models/HabitModel'

/**
 * Extends the Express Request interface to include:
 * The user property, which is set by the authentication middleware.
 * The habit property, which is set by the habit middleware.
 */
export interface AuthenticatedUserRequest extends Request {
  user?: IUser
  habit?: IHabit
  body: any
  headers: any
  url: any
}