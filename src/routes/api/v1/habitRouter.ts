import express, { Request, Response, NextFunction } from 'express';

export const router = express.Router();

/**
 * Resolves a HabitController object from the IoC container.
 *
 * @param {Request} req - Express request object.
 * @returns {Object} An object that can act as a HabitController object.
 */
const resolveHabitController = (req: Request) => req.app.get('container').resolve('HabitController');

// Provide req.habit to the route if :title is present in the route path.
router.param('title', (req: Request, res: Response, next: NextFunction, title: string) => resolveHabitController(req).loadHabit(req, res, next, title));

// GET 
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('Hello from habitRouter.ts');
  resolveHabitController(req).findAll(req, res, next) });

// POST habits
router.post('/', (req: Request, res: Response, next: NextFunction) => resolveHabitController(req).create(req, res, next));

// GET habits/:title
router.get('/:title', (req: Request, res: Response, next: NextFunction) => resolveHabitController(req).find(req, res, next));

router.post('/:title/complete', (req: Request, res: Response, next: NextFunction) => resolveHabitController(req).addCompletedDate(req, res, next));

// PATCH habits/:title
router.patch('/:title', (req: Request, res: Response, next: NextFunction) => resolveHabitController(req).partiallyUpdate(req, res, next))

// PUT habits/:title
router.put('/:title', (req: Request, res: Response, next: NextFunction) => resolveHabitController(req).update(req, res, next))

// DELETE habits/:title
router.delete('/:title', (req: Request, res: Response, next: NextFunction) => resolveHabitController(req).delete(req, res, next));
