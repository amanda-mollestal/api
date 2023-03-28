import { IoCContainer } from '../util/IoCContainer'
import * as dotenv from 'dotenv'
import { HabitModel, IHabitModel } from '../models/HabitModel'
import { HabitRepository } from '../repositoires/HabitRepository'
import { HabitService } from '../services/HabitService'
import { HabitController } from '../controllers/HabitController'
import { UserModel } from '../models/UserModel'
import { UserRepository } from '../repositoires/UserRepository'
import { UserService } from '../services/UserService'
import { UserController } from '../controllers/UserController'


const iocContainer = new IoCContainer()

dotenv.config()

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

iocContainer.register('UserModelType', UserModel, { type: true });

iocContainer.register('UserRepositorySingleton', UserRepository, {
  dependencies: ['UserModelType'],
  singleton: true,
})

iocContainer.register('UserServiceSingleton', UserService, {
  dependencies: ['UserRepositorySingleton'],
  singleton: true,
})

iocContainer.register('UserController', UserController, {
  dependencies: ['UserServiceSingleton'],
})



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
