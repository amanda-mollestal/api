import express, { Request, Response, Router } from 'express';

export const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => res.json({ message: 'HELLOOOOOOO'}));