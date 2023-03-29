import { MongooseRepositoryBase } from './MongooseRepository';
import { IUser, UserModel, IUserModel } from '../models/UserModel';
import { Model } from 'mongoose';

export class UserRepository extends MongooseRepositoryBase<IUser> {
  model: IUserModel
  constructor(model: IUserModel = UserModel) {
    super(model)
    this.model = model
  }

  async verifyUser(username: string, password: string) {
    try {
     const user = await this.model.authentication(username, password)
     console.log(user)
    } catch (error) {
      console.log(error)
    }
  }
}