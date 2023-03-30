import { MongooseServiceBase } from './MongooseServiceBase'
import { WebhookRepository } from '../repositoires/WebhookRepository'
import { IWebhook } from '../models/WebhookModel'
import { WebhookEvent } from '../models/WebhookModel'


export class WebhookService extends MongooseServiceBase<IWebhook> {
  repository: WebhookRepository
  constructor(repository: WebhookRepository) {
    super(repository)
    this.repository = repository
  }

  async register (url: string , ownerId: string, events: string[]){

    const newWebhook: IWebhook = {
      url: url,
      ownerId: ownerId,
      events: []
    } as IWebhook  

    console.log(WebhookEvent.COMPLETED)
    events.forEach(event => {
      
      if (event.toLocaleLowerCase() === 'completed') {
        newWebhook.events.push(WebhookEvent.COMPLETED)
      } else if (event.toLocaleLowerCase() === 'reverted') {
        newWebhook.events.push(WebhookEvent.REVERTED)
      } else if (event.toLocaleLowerCase() === 'updated') {
        newWebhook.events.push(WebhookEvent.UPDATED)
      }
    })
    console.log(newWebhook)

    const result = await this.repository.insert(newWebhook)

    console.log(result)
    return result as IWebhook

  }

  /*async getWebhook(habitId: string, userId: string) {
    const webhooks = await this.repository.getWebhooksByUserAndEvent(userId, WebhookEvent.COMPLETED)
    return webhooks
  }*/
}