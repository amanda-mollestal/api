import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { HabitService } from '../services/HabitService'
import { IHabit } from '../models/HabitModel'
import { AuthenticatedUserRequest } from './IAuthenticatedUserRequest'
import { completeLinks, createLinks, deleteLinks, findAllLinks, findLinks, partiallyLinks, undoLinks, updateLinks } from './Links'

/**
 * Controller class for handling Habit-related HTTP requests.
 */
export class HabitController {
  #service: HabitService

  /**
  * Creates a new instance of the HabitController class.
  * @param {HabitService} service The Habit service used by the controller.
  */
  constructor(service: HabitService) {
    this.#service = service
  }


  /**
   * Handles the HTTP POST /habits request.
   *
   * @param {AuthenticatedUserRequest} req -  The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async create(req: AuthenticatedUserRequest, res: Response, next: NextFunction): Promise<void> {
    try {

      const habit: IHabit = {
        title: req.body.title,
        description: req.body.description,
        ownerId: req.user.id,
      } as IHabit

      if (req.body.completedDates) {
        habit.completedDates = req.body.completedDates
      }

      const result: IHabit = await this.#service.insert(habit)

      const habitTitle = result.title.replace(/ /g, '-')


      const links = createLinks(habitTitle)

      res.status(201).json({
        message: 'Habit created successfully.',
        habit: result,
        _links: links,
      })

    } catch (error) {
      console.log(error)

      if (error.name === 'ExistingHabitError') {
        next(createError(400, 'Habit with that title already exists'))
        return
      }

      if (error.code === 11000) {
        next(createError(400, 'Habit with that title already exists'))
        return
      }
      next(error)
    }
  }

  /**
   * Loads a habit from the database and attaches it to the request object.
   *
   * @param {AuthenticatedUserRequest} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   * @param {string} title - The title of the habit to load.
   */
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

  /**
   * Handles the HTTP GET /habits request.
   *
   * @param {AuthenticatedUserRequest} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async findAll(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {

      const filter = { ownerId: req.user.id }

      const habits = await this.#service.get(filter)

      res.status(200).json({ habits: habits, _links: findAllLinks })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handles the HTTP GET /habits/:title request.
   *
   * @param {AuthenticatedUserRequest} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async find(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {
      const habitTitle = req.habit.title.replace(/ /g, '-')

      const links = findLinks(habitTitle)

      res.status(200).json({ habit: req.habit, _links: links })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handles the HTTP POST /habits/:title/complete request.
   *
   * @param {AuthenticatedUserRequest} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async addCompletedDate(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {

    try {
      const updatedHabit = await this.#service.addCompletedDate(req.habit.id)
      req.habit = updatedHabit

      const habitTitle = req.habit.title.replace(/ /g, '-')

      const links = completeLinks(habitTitle)


      res.status(200).json({
        message: 'Habit completed successfully',
        habit: updatedHabit,
        _links: links
      }).end()
      return next()

    } catch (error) {
      if (error.name === 'ValidationError') {
        next(createError(400, 'This habit has already been completed today.'))
        return
      }
      next(error)
    }
  }

  /**
   * Handles the HTTP POST /habits/:title/revert request.
   *
   * @param {AuthenticatedUserRequest} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async undoCompletedDate(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {

    try {
      const updatedHabit = await this.#service.undoCompletedDate(req.habit.id)
      req.habit = updatedHabit

      const habitTitle = req.habit.title.replace(/ /g, '-')

      const links = undoLinks(habitTitle)

      res.status(200).json({
        message: 'Habit reverted successfully',
        habit: updatedHabit,
        _links: links
      }).end()
      return next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  // NOT IMPLEMENTED YET

  /*

  async removeCompletedDate(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
      
      try {
        const updatedHabit = await this.#service.removeCompletedDate(req.habit.id)
        console.log(updatedHabit)
  
        //res.json(updatedHabit)
        res.status(204)
  
      } catch (error) {
        console.log(error)
        /*if (error.name === 'ValidationError') {
          next(createError(400, 'You have already completed this habit today.'))
          return 
        }*/ /*
next(error)
}
}*/


  /**
   * Handles the HTTP PATCH /habits/:title request.
   *
   * @param {AuthenticatedUserRequest} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async partiallyUpdate(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {

    try {

      const updatedHabit = await this.#service.update(req.habit.id, req.body)
      req.habit = updatedHabit

      const habitTitle = req.habit.title.replace(/ /g, '-')

      const links = partiallyLinks(habitTitle)

      res.status(204).json({
        message: 'Habit updated successfully',
        habit: updatedHabit,
        _links: links
      }).end()
      return next()

    } catch (error) {
      console.log(error)
      if (error.name === 'ValidationError') {
        next(createError(400, error.message))
        return
      }
      next(error)
    }
  }

  /**
   * Handles the HTTP PUT /habits/:title request.
   *
   * @param {AuthenticatedUserRequest} req - The request object.
   * @param {Response} res  - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async update(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {

      const habit: IHabit = {
        title: req.body.title,
        description: req.body.description,
        ownerId: req.user.id,
      } as IHabit

      if (req.body.completedDates) {
        habit.completedDates = req.body.completedDates
      }

      const updatedHabit = await this.#service.replace(req.habit.id, habit)

      req.habit = updatedHabit


      const habitTitle = req.habit.title.replace(/ /g, '-')

      const links = updateLinks(habitTitle)
      res.json(
        {
          message: 'Habit updated successfully',
          habit: updatedHabit,
          _links: links
        }
      ).status(204).end()
      return next()
    } catch (error) {
      console.log(error)
      if (error.name === 'ValidationError') {
        next(createError(400, error.message))
        return
      }
      next(error)
    }
  }

  /**
   * Handles the HTTP DELETE /habits/:title request.
   *
   * @param {AuthenticatedUserRequest} req
   * @param {Response} res
   */
  async delete(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {
      await this.#service.delete(req.habit.id)
      const habitTitle = req.habit.title.replace(/ /g, '-')

      const links = deleteLinks(habitTitle)

      req.habit = null


      res.status(204).json({
        message: 'Habit deleted successfully',
        _links: links
      }).end()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

}