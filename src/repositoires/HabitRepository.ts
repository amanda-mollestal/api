import { MongooseRepositoryBase } from './MongooseRepository';
import { IHabit } from '../models/HabitModel';
import { Model } from 'mongoose';

export class HabitRepository extends MongooseRepositoryBase<IHabit> {
  constructor(model: Model<IHabit>) {
    super(model);
  }
}