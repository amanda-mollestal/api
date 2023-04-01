import express, { Request, Response, Router, NextFunction } from 'express'
import { router as habitsRouter } from './habitRouter'
import { router as userRouter } from './userRouter'

export const router: Router = express.Router()

const resolveUserController = (req: Request) => req.app.get('container').resolve('UserController')

router.get('/', (req: Request, res: Response) => {
  const links = {
    self: { href: '/', title: 'API entry point' },
    register: {
      href: '/user/register', method: 'POST', title: 'Register a new user',
      body: {
        username: { type: 'string', required: true, description: 'The username of the user' },
        password: { type: 'string', required: true, description: 'The password of the user' },
        email: { type: 'string', required: true, description: 'The email of the user' }
      }
    },
    login: {
      href: '/user/login', method: 'POST', title: 'Log in to the API',
      body: {
        username: { type: 'string', required: true, description: 'The username of the user' },
        password: { type: 'string', required: true, description: 'The password of the user' }
      }
    },
    getHabits: {
      href: '/habits', method: 'GET', title: 'Get all habits',
      headers: {
        'Authorization': { type: 'string', required: true, description: "The access token in the format 'Bearer {access_token}'." }
      }
    },
    create: {
      href: '/habits', title: 'Create a new habit', method: 'POST',
      headers: {
        "Authorization": { type: "string", required: true, description: "The access token in the format 'Bearer {access_token}'." }
      }
    },
    
  }


  res.json({
    message: 'WELCOME TO THE HABIT TRACKER API',
    _links: links
  })
})

router.use('/user', userRouter)

router.use('/habits', (req: Request, res: Response, next: NextFunction) =>
  resolveUserController(req).validateJwt(req, res, next), habitsRouter)

