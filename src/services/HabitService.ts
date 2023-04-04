import { MongooseServiceBase } from './MongooseServiceBase'
import { HabitRepository } from '../repositoires/HabitRepository'
import { IHabit } from '../models/HabitModel'


/**
 * Service class for handling Habit-related business logic.
 * 
 */
export class HabitService extends MongooseServiceBase<IHabit> {
  repository: HabitRepository

  /**
    *  Creates a new instance of the HabitService class.
    * 
    * @param {HabitRepository} repository - The Habit repository used by the service.
    */
  constructor(repository: HabitRepository) {
    super(repository)
    this.repository = repository

  }

  /**
   * Adds todays date to the completedDates array of a habit.
   * 
   * @param {string} habitId - The id of the habit to add the completed date to.
   * @returns {IHabit} - The habit with the completed date added.
   */
  async addCompletedDate(habitId: string): Promise<IHabit> {
    const habit = await this.repository.addCompletedDate(habitId)
    return habit
  }

  /**
   * Removes todays date from the completedDates array of a habit.
   * 
   * @param {string} habitId - The id of the habit to remove the completed date from.
   * @returns {IHabit} - The habit with the completed date removed.
   */
  async undoCompletedDate(habitId: string): Promise<IHabit> {
    const habit = await this.repository.undoCompletedDate(habitId)
    return habit
  }


}
