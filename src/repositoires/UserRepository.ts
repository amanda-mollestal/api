import { MongooseRepositoryBase } from './MongooseRepository'
import { IUser, UserModel, IUserModel } from '../models/UserModel'

/**
 * Repository class for handling User-related database operations.
 * 
 */
export class UserRepository extends MongooseRepositoryBase<IUser> {
  model: IUserModel

  /**
   * Creates a new instance of the UserRepository class.
   * 
   * @param {IUserModel} model - The Mongoose model used by the repository.
  */
  constructor(model: IUserModel = UserModel) {
    super(model)
    this.model = model
  }

  /**
   * Authenticates a user.
   *  
   * @param {string} username - The username of the user to authenticate.
   * @param {string} password - The password of the user to authenticate.
   * @returns {IUser} - The authenticated user.
   */
  async verifyUser(username: string, password: string): Promise<IUser> {

    const user = await this.model.authentication(username, password)
    return user
  }

}