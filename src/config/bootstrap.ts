import { IoCContainer } from '../util/IoCContainer'
import * as dotenv from 'dotenv'
import { HabitModel, IHabitModel } from '../models/HabitModel'
import { HabitRepository } from '../repositoires/HabitRepository'
import { HabitService } from '../services/HabitService'
import { HabitController } from '../controllers/HabitController'

const iocContainer = new IoCContainer()
dotenv.config()
console.log(process.env.DB_CONNECTION_STRING)
iocContainer.register('ConnectionString', process.env.DB_CONNECTION_STRING)

iocContainer.register('HabitModelType', HabitModel, { type: true });

iocContainer.register('HabitRepositorySingleton', HabitRepository, {
  dependencies: ['HabitModelType'],
  singleton: true,
});

iocContainer.register('HabitServiceSingleton', HabitService, {
  dependencies: ['HabitRepositorySingleton'],
  singleton: true,
});

iocContainer.register('HabitController', HabitController, {
  dependencies: ['HabitServiceSingleton'],
});

/*
iocContainer.register<TaskModel>('TaskModelType', TaskModel, { type: true });

iocContainer.register<TaskRepository>('TaskRepositorySingleton', TaskRepository, {
  dependencies: ['TaskModelType'],
  singleton: true,
});

iocContainer.register<TasksService>('TasksServiceSingleton', TasksService, {
  dependencies: ['TaskRepositorySingleton'],
  singleton: true,
});

iocContainer.register<TasksController>('TasksController', TasksController, {
  dependencies: ['TasksServiceSingleton'],
});
*/

export const container = Object.freeze(iocContainer)
