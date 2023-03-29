
import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'
import { UserModel, IUser } from '../models/UserModel'
import { AuthenticatedUserRequest } from './IAuthenticatedUserRequest'

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
      const accessToken = await this.#service.login(req.body.username, req.body.password)
      res.status(200).json({ 'access-token': accessToken })
    } catch (error) {
      error.status = 401
      error.message = 'Credentials invalid or not provided.'
      next(error)
    }
  }

  async validateJwt(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {
      const [authenticationScheme, token] = req.headers.authorization?.split(' ')

      if (authenticationScheme !== 'Bearer') {
        throw new Error('Invalid authentication scheme.')
      }

      const user = await this.#service.validateJwt(token)
      
      req.user = user

      //console.log(req.params)
      next()

      /*const user = await this.#service.getById(req.params.id)
      if (!user) {
        next(createError(404, 'The requested resource was not found.'))
        return
      }
      res.status(200).json(user)*/ 
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        error.status = 401
        error.message = 'Access token invalid or not provided.'
        next(error)
      }
      //console.log(error)
      next(error)
    }

      
    
  }

  

  
}