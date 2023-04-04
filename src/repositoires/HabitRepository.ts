import { MongooseRepositoryBase } from './MongooseRepository'
import { IHabit } from '../models/HabitModel'
import { Model } from 'mongoose'

/**
 * Repository class for handling Habit-related database operations.
 */
export class HabitRepository extends MongooseRepositoryBase<IHabit> {

  /**
   * Creates a new instance of the HabitRepository class.
   * 
   * @param {Model<IHabit>} model - The Mongoose model used by the repository.
   */
  constructor(model: Model<IHabit>) {
    super(model)
  }

  /**
   * Adds todays date to the completedDates array of a habit.
   * 
   * @param {string} habitId - The id of the habit to add the completed date to.
   * @returns {IHabit} - The habit with the completed date added.
   */
  async addCompletedDate(habitId: string): Promise<IHabit> {
    const habit = await this.getById(habitId)

    const date = new Date()
    const dateStr = date.toLocaleDateString()
    console.log(dateStr)
    habit.completedDates.push(dateStr)
    return habit.save()
  }

  /**
   * Removes todays date from the completedDates array of a habit.
   *  
   * @param {string} habitId - The id of the habit to remove the completed date from.
   * @returns {IHabit} - The habit with the completed date removed.
   */
  async undoCompletedDate(habitId: string): Promise<IHabit> {
    const habit = await this.getById(habitId)

    const date = new Date()
    const dateStr = date.toLocaleDateString()

    habit.completedDates = habit.completedDates.filter(date => date !== dateStr);

    return habit.save()
    
  }
}