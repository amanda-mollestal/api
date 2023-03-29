import { MongooseServiceBase } from './MongooseServiceBase'
import { WebhookRepository } from '../repositoires/WebhookRepository'
import { IWebhook } from '../models/WebhookModel'


export class WebhookService extends MongooseServiceBase<IWebhook> {
  repository: WebhookRepository
  constructor(repository: WebhookRepository) {
    super(repository)
    this.repository = repository
  }
}