import { IoCContainer } from '../util/IoCContainer'
//import * as dotenv from 'dotenv'
import { HabitModel, IHabitModel } from '../models/HabitModel'
import { HabitRepository } from '../repositoires/HabitRepository'
import { HabitService } from '../services/HabitService'
import { HabitController } from '../controllers/HabitController'
import { UserModel } from '../models/UserModel'
import { UserRepository } from '../repositoires/UserRepository'
import { UserService } from '../services/UserService'
import { UserController } from '../controllers/UserController'
import { WebhookModel } from '../models/WebhookModel'
import { WebhookRepository } from '../repositoires/WebhookRepository'
import { WebhookService } from '../services/WebhookService'
import { WebhookController } from '../controllers/WebhookController'


const iocContainer = new IoCContainer()

//dotenv.config()

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

iocContainer.register('WebhookModelType', WebhookModel, { type: true });

iocContainer.register('WebhookRepositorySingleton', WebhookRepository, {
  dependencies: ['WebhookModelType'],
  singleton: true,
})

iocContainer.register('WebhookServiceSingleton', WebhookService, {
  dependencies: ['WebhookRepositorySingleton'],
  singleton: true,
})

iocContainer.register('WebhookController', WebhookController, {
  dependencies: ['WebhookServiceSingleton'],
})  


export const container = Object.freeze(iocContainer)
