import express, { Request, Response, NextFunction } from 'express';

export const router = express.Router();

const resolveUserController = (req: Request) => req.app.get('container').resolve('UserController')

router.get('/', (req: Request, res: Response, next: NextFunction) => resolveUserController(req).test(req, res, next))

router.post('/register', (req: Request, res: Response, next: NextFunction) => resolveUserController(req).register(req, res, next))

router.post('/login', (req: Request, res: Response, next: NextFunction) => resolveUserController(req).login(req, res, next))