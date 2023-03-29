import { MongooseRepositoryBase } from './MongooseRepository'
import { IHabit } from '../models/HabitModel'
import { Model } from 'mongoose'

export class HabitRepository extends MongooseRepositoryBase<IHabit> {
  constructor(model: Model<IHabit>) {
    super(model)
  }

  async addCompletedDate(habitId: string): Promise<IHabit | null> {
    const habit = await this.getById(habitId)

    const date = new Date()
    const dateStr = date.toLocaleDateString()
   
    /*
    if (!habit) {
      return null // habit not found
    }*/ 

    habit.completedDates.push(dateStr)
    return habit.save()
  }

  async undoCompletedDate(habitId: string): Promise<IHabit | null> {
    const habit = await this.getById(habitId)

    const date = new Date()
    const dateStr = date.toLocaleDateString()

    //const removedDate = habit.completedDates.pop()

    habit.completedDates = habit.completedDates.filter(date => date !== dateStr);

    return habit.save()
    
  }
}