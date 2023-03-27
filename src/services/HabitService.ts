import { MongooseServiceBase } from './MongooseServiceBase'
import { HabitRepository } from '../repositoires/HabitRepository'
import { IHabit } from '../models/HabitModel'

export class HabitService extends MongooseServiceBase<IHabit> {
  constructor(repository: HabitRepository) {
    super(repository)
  }
}
