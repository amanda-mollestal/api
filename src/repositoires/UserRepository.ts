import { MongooseRepositoryBase } from './MongooseRepository';
import { IUser, UserModel, IUserModel } from '../models/UserModel';


export class UserRepository extends MongooseRepositoryBase<IUser> {
  model: IUserModel
  constructor(model: IUserModel = UserModel) {
    super(model)
    this.model = model
  }

  async verifyUser(username: string, password: string) {
    try {
     const user = await this.model.authentication(username, password)
     return user
    } catch (error) {
      console.log(error)
    }
  }

}