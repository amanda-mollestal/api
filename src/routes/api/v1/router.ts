import express, { Request, Response, Router } from 'express'
import { router as habitsRouter } from './habitRouter'

export const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => res.json({ message: 'HELLOOOOOOO'}));

router.use('/habits', habitsRouter)