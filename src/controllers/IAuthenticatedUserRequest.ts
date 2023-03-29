import { Request } from 'express'
import { IUser } from '../models/UserModel'
import { IHabit } from '../models/HabitModel'


export interface AuthenticatedUserRequest extends Request {
  req: IHabit[]
  user?: IUser;
  habit?: IHabit;
}