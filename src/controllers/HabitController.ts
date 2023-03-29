import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { HabitService } from '../services/HabitService'
import { HabitModel, IHabit } from '../models/HabitModel'
import { AuthenticatedUserRequest } from './IAuthenticatedUserRequest'
//import { TasksService } from '../services/TasksService'

export class HabitController {
  #service: HabitService

  constructor(service: HabitService) {
    this.#service = service
  }

  async test(req: Request, res: Response, next: NextFunction) {
    console.log('Hello from HabitController')
    res.json({ message: 'Hello from HabitController' })
  }

  async create(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {


      console.log(req.body)

      const result: IHabit = await this.#service.insert({
        title: req.body.title,
        description: req.body.description,
        ownerId: req.user.id,
      } as IHabit)
      console.log(result)
      res.status(201).json(result)

      //console.log(date.toLocaleDateString())

      /*const result: IHabit = await this.#service.insert({
        description: "Brush teeth",
        ownerId: req.user.id,
        dailyLogs: [
          {
            date: date.toLocaleDateString(),
            done: true,
          },
        ],
      } as IHabit)
      res.status(201).json(result)*/
      /*
      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${task._id}`
      )

      res.location(location.href).status(201).json(task)*/

    } catch (error) {
      console.log(error)
      console.log(error.name)
      console.log(error.code)

      // Send correct error code and message

      if (error.code === 11000) {
        next(createError(400, 'Duplicate key error'))
        return
      }
      next(error)
    }
  }


  async loadHabit(req: AuthenticatedUserRequest, res: Response, next: NextFunction, title: string) {
    try {
      const searchTitle = title.replace(/-/g, ' ')

      const filter = { title: searchTitle, ownerId: req.user.id }

      const habit = await this.#service.getOne(filter)

      if (!habit) {
        next(createError(404, 'The requested resource was not found.'))
        return
      }

      req.habit = habit
      next()
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {
      console.log(req.user)

      const filter = { ownerId: req.user.id }

      const habits = await this.#service.get(filter)
      res.json(habits)
    } catch (error) {
      next(error)
    }
  }

  async find(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {
      res.json(req.habit)
    } catch (error) {
      next(error)
    }
  }

  async addCompletedDate(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {

    try {
      

      const updatedHabit = await this.#service.addCompletedDate(req.habit.id)
      console.log(updatedHabit)

      //res.json(updatedHabit)
      res.status(204)

    } catch (error) {
      if (error.name === 'ValidationError') {
        next(createError(400, 'You have already completed this habit today.'))
        return 
      }
      next(error)
    }
  }

  


}