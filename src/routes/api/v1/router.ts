import express, { Request, Response, Router, NextFunction } from 'express'
import { router as habitsRouter } from './habitRouter'
import { router as userRouter } from './userRouter'

export const router: Router = express.Router();

const resolveUserController = (req: Request) => req.app.get('container').resolve('UserController')

router.get('/', (req: Request, res: Response) => res.json({ message: 'HELLOOOOOOO'}));

router.use('/user', userRouter)

router.use('/habits', (req: Request, res: Response, next: NextFunction) =>
  resolveUserController(req).validateJwt(req, res, next) , habitsRouter)

