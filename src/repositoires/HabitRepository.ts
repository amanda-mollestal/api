import { MongooseRepositoryBase } from './MongooseRepository';
import { HabitModel, IHabit } from '../models/HabitModel';
import { Model } from 'mongoose';

export class HabitRepository extends MongooseRepositoryBase<IHabit> {
  constructor(model: Model<IHabit> = HabitModel) {
    super(model);
  }
}
