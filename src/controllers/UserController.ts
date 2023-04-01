
import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'
import { UserModel, IUser } from '../models/UserModel'
import { AuthenticatedUserRequest } from './IAuthenticatedUserRequest'
import { registerLinks, loginLinks } from './Links'

/**
 * Controller class for handling User-related HTTP requests.
 */
export class UserController {
  #service: UserService

  /**
   * Creates a new instance of the UserController class.
   * @param {UserService} service The User service used by the controller.
   */
  constructor(service: UserService) {
    this.#service = service
  }

  /**
   * Handles the HTTP POST /users request.
   * @param {Request} req -  The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result: IUser = await this.#service.insert({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      } as IUser)

      res.status(201).json({
        message: 'User registration successful.',
        user: result,
        _links: registerLinks,
      })
    } catch (error) {
      if (error.name === 'ValidationError') {
        error.status = 400
        error.message = 'Invalid data provided. Make sure to provide a valid email, username and password.'
        next(error)
      }
      next(error)
    }
  }

  /**
   * Handles the HTTP POST /users/login request.
   * @param {Request} req -  The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = await this.#service.login(req.body.username, req.body.password)

      res.status(200).json({
        message: 'User login successful.',
        'access_token': accessToken,
        _links: loginLinks
      })

    } catch (error) {
      error.status = 401
      error.message = 'Credentials invalid or not provided.'
      next(error)
    }
  }

  /**
   *  Validates the JWT token in the request header and attaches the user to the request object.
   * 
   * @param {AuthenticatedUserRequest} req -  The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async validateJwt(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {
      const [authenticationScheme, token] = req.headers.authorization?.split(' ')

      if (authenticationScheme !== 'Bearer') {
        throw new Error('Invalid authentication scheme.')
      }

      const user = await this.#service.validateJwt(token)

      req.user = user
      next()
    } catch (error) {

      if (error.name === 'JsonWebTokenError' || error.name === 'TypeError') {
        error.status = 401
        error.message = 'Access token invalid or not provided.'
        next(error)
      }

      if (error.name === 'TokenExpiredError') {
        error.status = 401
        error.message = 'Access token invalid or not provided.'
        next(error)
      }
      next(error)
    }



  }




}