import express, { Request, Response, Router } from 'express'
import { router as habitsRouter } from './habitRouter'
import { router as userRouter } from './userRouter'

export const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => res.json({ message: 'HELLOOOOOOO'}));

router.use('/user', userRouter)

router.use('/habits', habitsRouter)