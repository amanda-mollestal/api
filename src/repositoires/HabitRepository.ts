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
    const newDailyLog = {
      date: dateStr
    }
    /*
    if (!habit) {
      return null // habit not found
    }*/ 

    habit.completedDates.push(dateStr)
    return habit.save()
  }
}