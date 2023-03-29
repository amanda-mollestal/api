
import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'
import { UserModel, IUser } from '../models/UserModel'

export class UserController {
  #service: UserService

  constructor(service: UserService) {
    this.#service = service
  }

  async test (req: Request, res: Response, next: NextFunction) {
    console.log('Hello from UserController')
    res.json({ message: 'Hello from UserController'})
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {

      const result: IUser = await this.#service.insert({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      } as IUser)

      //console.log(result)


      /*const result: IUser = await this.#service.insert({
        email: 'amanda@gmail.com',
        password: 'password123',
        username: 'amanda',
      } as IUser) */ 


      res.status(201).json(result)
    } catch (error) {
      console.log(error)
      /*const err = createError(
        error.name === 'ValidationError' ? 400 : 500
      )
      err.cause = error*/ 
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body.username)
      await this.#service.login(req.body.username, req.body.password)

    } catch (error) {
      console.log(error)
    }
  }
}