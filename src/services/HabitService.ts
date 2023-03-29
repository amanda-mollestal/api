import { MongooseServiceBase } from './MongooseServiceBase'
import { HabitRepository } from '../repositoires/HabitRepository'
import { IHabit } from '../models/HabitModel'
import { MongooseRepositoryBase } from '../repositoires/MongooseRepository'

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
}
