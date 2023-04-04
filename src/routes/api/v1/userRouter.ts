import express, { Request, Response, NextFunction } from 'express';

export const router = express.Router();

const resolveUserController = (req: Request) => req.app.get('container').resolve('UserController')

// GET root of user management
router.get('/', (req: Request, res: Response) => {
  const links = {
    self: { href: '/user', title: 'User management, including registration and login.' },
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
    }

  }

  res.json({
    message: 'Here you will find everything related to user management, including registration and login.',
    _links: links
  })

})

// POST /register 
router.post('/register', (req: Request, res: Response, next: NextFunction) => resolveUserController(req).register(req, res, next))

// POST /login
router.post('/login', (req: Request, res: Response, next: NextFunction) => resolveUserController(req).login(req, res, next))

