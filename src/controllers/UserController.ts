
import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
  #service: UserService

  constructor(service: UserService) {
    this.#service = service
  }

  async test (req: Request, res: Response, next: NextFunction) {
    console.log('Hello from UserController')
    res.json({ message: 'Hello from UserController'})
  }
}