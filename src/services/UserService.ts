import { MongooseServiceBase } from './MongooseServiceBase'
import { UserRepository } from '../repositoires/UserRepository'
import { IUser } from '../models/UserModel'
import jwt from 'jsonwebtoken'

/**
 * Service class for handling User-related business logic.
 * 
 */
export class UserService extends MongooseServiceBase<IUser> {
  repository: UserRepository

  /**
   * Creates a new instance of the UserService class.
   *
   * @param {UserRepository} repository - The User repository used by the service.
   */
  constructor(repository: UserRepository) {
    super(repository)
    this.repository = repository
  }

  /**
   * Authenticates a user and returns an access token.
   * 
   * @param {string} username - The username of the user to authenticate.
   * @param {string} password - The password of the user to authenticate.
   * @returns {string} - The access token.
   */
  async login(username: string, password: string): Promise<string> {
    try {
      const user = await this.repository.verifyUser(username, password)

      if (user) {
        const payload = {
          sub: user._id,
          username: user.username,
          email: user.email,
        }

        const accessToken = jwt.sign(payload, Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64'), {
          algorithm: 'RS256',
          expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

        return accessToken

      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Validates a JWT and returns the user.
   * 
   * @param {string} token - The JWT to validate.
   * @returns {IUser} - The user.
   * @throws {Error} - If the JWT is invalid.
   */
  async validateJwt(token: string): Promise<IUser> {
    try {
      const payload = jwt.verify(token, Buffer.from(process.env.ACCESS_TOKEN_PUBLIC, 'base64'))

      const user = await this.repository.getById(payload.sub as string)

      console.log(user)
      return user

    } catch (error) {
      throw error
    }
  }


}