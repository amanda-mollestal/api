import { MongooseServiceBase } from './MongooseServiceBase'
import { UserRepository } from '../repositoires/UserRepository'
import { IUser } from '../models/UserModel'

export class UserService extends MongooseServiceBase<IUser> {
  constructor(repository: UserRepository) {
    super(repository)
  }
}