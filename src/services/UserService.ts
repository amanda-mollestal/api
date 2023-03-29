import { MongooseServiceBase } from './MongooseServiceBase'
import { UserRepository } from '../repositoires/UserRepository'
import { IUser } from '../models/UserModel'

export class UserService extends MongooseServiceBase<IUser> {
  repository: UserRepository
  constructor(repository: UserRepository) {
    super(repository)
    this.repository = repository
  }

  login(username: string, password: string) {
    try {
      this.repository.verifyUser(username, password)
    } catch (error) {
      console.log(error)
    }
  }


}