import { MongooseRepositoryBase } from './MongooseRepository';
import { IUser } from '../models/UserModel';
import { Model } from 'mongoose';

export class UserRepository extends MongooseRepositoryBase<IUser> {
  constructor(model: Model<IUser>) {
    super(model);
  }
}