import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { HabitService } from '../services/HabitService'
import { HabitModel, IHabit } from '../models/HabitModel'
//import { TasksService } from '../services/TasksService'

export class HabitController {
  #service: HabitService

  constructor(service: HabitService) {
    this.#service = service
  }

  async test (req: Request, res: Response, next: NextFunction) {
    console.log('Hello from HabitController')
    res.json({ message: 'Hello from HabitController'})
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {

      const result: IHabit = await this.#service.insert({
        description: "Brush teeth",
        dailyLogs: [
          {
            date: new Date('2023-03-27'),
            done: true,
          },
        ],
      } as IHabit)
      res.status(201).json(result)
      /*
      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${task._id}`
      )

      res.location(location.href).status(201).json(task)*/

    } catch (error) {
      const err = createError(
        error.name === 'ValidationError' ? 400 : 500
      )
      err.cause = error
      next(err)
    }
  }

  /*
async loadTask(req: Request, res: Response, next: NextFunction, id: string) {
  try {
    const task = await this.#service.getById(id)

    if (!task) {
      next(createError(404, 'The requested resource was not found.'))
      return
    }

    req.task = task
    next()
  } catch (error) {
    next(error)
  }
}

async find(req: Request, res: Response, next: NextFunction) {
  res.json(req.task)
}

async findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const tasks = await this.#service.get()
    res.json(tasks)
  } catch (error) {
    next(error)
  }
}*/
}