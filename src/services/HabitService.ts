import { MongooseServiceBase } from './MongooseServiceBase'
import { HabitRepository } from '../repositoires/HabitRepository'
import { IHabit } from '../models/HabitModel'


export class HabitService extends MongooseServiceBase<IHabit> {
  repository: HabitRepository
  constructor(repository: HabitRepository) {
    super(repository)
    this.repository = repository
    
  }

  async addCompletedDate(habitId: string) {
    const habit = await this.repository.addCompletedDate(habitId)
    return habit
  }

  async undoCompletedDate(habitId: string) {
    const habit = await this.repository.undoCompletedDate(habitId)
    return habit
  }

  async removeCompletedDate(habitId: string, date: string) {

  }


}
