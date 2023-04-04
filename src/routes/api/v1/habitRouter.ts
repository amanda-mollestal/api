import express, { Request, Response, NextFunction } from 'express'
import { WebhookEvent } from '../../../models/WebhookModel'

export const router = express.Router()

/**
 * Resolves a HabitController object from the IoC container.
 *
 * @param {Request} req - Express request object.
 * @returns {Object} An object that can act as a HabitController object.
 */
const resolveHabitController = (req: Request) => req.app.get('container').resolve('HabitController')

const resolveWebhookController = (req: Request) => req.app.get('container').resolve('WebhookController')

// Provide req.habit to the route if :title is present in the route path.
router.param('title', (req: Request, res: Response, next: NextFunction, title: string) => resolveHabitController(req).loadHabit(req, res, next, title))

// GET habits
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  resolveHabitController(req).findAll(req, res, next)
})

// POST habits
router.post('/', (req: Request, res: Response, next: NextFunction) => resolveHabitController(req).create(req, res, next))

// GET habits/:title
router.get('/:title', (req: Request, res: Response, next: NextFunction) => resolveHabitController(req).find(req, res, next))

// POST habits/:title/complete
router.post('/:title/complete', 
  (req: Request, res: Response, next: NextFunction) => {
    resolveHabitController(req).addCompletedDate(req, res, next)
  },
  (req: Request, res: Response, next: NextFunction) => {
    resolveWebhookController(req).fireWebhook(req, res, next, WebhookEvent.COMPLETED)
  }
)

// POST habits/:title/revert  
router.post('/:title/revert', 
  (req: Request, res: Response, next: NextFunction) => {
    resolveHabitController(req).undoCompletedDate(req, res, next)
  },
  (req: Request, res: Response, next: NextFunction) => {
    resolveWebhookController(req).fireWebhook(req, res, next, WebhookEvent.REVERTED)
  }
)

// PATCH habits/:title
router.patch('/:title', 
  (req: Request, res: Response, next: NextFunction) => {
    resolveHabitController(req).partiallyUpdate(req, res, next)
  },
  (req: Request, res: Response, next: NextFunction) => {
    resolveWebhookController(req).fireWebhook(req, res, next, WebhookEvent.UPDATED)
  }
)

// PUT habits/:title
router.put('/:title', 
  (req: Request, res: Response, next: NextFunction) => {
    resolveHabitController(req).update(req, res, next)
  },
  (req: Request, res: Response, next: NextFunction) => {
    resolveWebhookController(req).fireWebhook(req, res, next, WebhookEvent.UPDATED)
  }
)

// DELETE habits/:title
router.delete('/:title', (req: Request, res: Response, next: NextFunction) => resolveHabitController(req).delete(req, res, next))

// POST /webhook/register
router.post('/webhook/register', (req: Request, res: Response, next: NextFunction) => resolveWebhookController(req).registerWebhook(req, res, next))

// POST /webhook/unregister
router.post('/webhook/unregister', (req: Request, res: Response, next: NextFunction) => resolveWebhookController(req).unregisterWebhook(req, res, next));
