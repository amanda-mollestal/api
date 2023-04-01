import { Request } from 'express'
import { IUser } from '../models/UserModel'
import { IHabit } from '../models/HabitModel'


export interface AuthenticatedUserRequest extends Request {
  user?: IUser;
  habit?: IHabit;
  body: any;
}