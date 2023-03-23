import { IoCContainer } from '../util/IoCContainer'
import * as dotenv from 'dotenv'

const iocContainer = new IoCContainer()
dotenv.config()
console.log(process.env.DB_CONNECTION_STRING)
iocContainer.register('ConnectionString', process.env.DB_CONNECTION_STRING)
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
