import { MongooseServiceBase } from './MongooseServiceBase'
import { UserRepository } from '../repositoires/UserRepository'
import { IUser } from '../models/UserModel'
import jwt from 'jsonwebtoken'

export class UserService extends MongooseServiceBase<IUser> {
  repository: UserRepository
  constructor(repository: UserRepository) {
    super(repository)
    this.repository = repository
  }

  async login(username: string, password: string) {
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
      console.log(error)
    }
  }

  async validateJwt(token: string) {
    try {
      const payload = jwt.verify(token, Buffer.from(process.env.ACCESS_TOKEN_PUBLIC, 'base64'))

      const user = await this.repository.getById(payload.sub as string)

      console.log(user)
      return user


    } catch (error) {
      console.log(error)
    }
  }


}