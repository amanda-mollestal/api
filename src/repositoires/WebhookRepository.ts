import { MongooseRepositoryBase } from './MongooseRepository'
import { IWebhook, IWebhookModel, WebhookEvent, WebhookModel } from '../models/WebhookModel'


/**
 * Repository class for handling Webhook-related database operations.
 * 
 */
export class WebhookRepository extends MongooseRepositoryBase<IWebhook> {
  model: IWebhookModel

  /**
   * Creates a new instance of the WebhookRepository class.
   *  
   * @param {IWebhookModel} model - The Mongoose model used by the repository.
   */
  constructor(model: IWebhookModel = WebhookModel) {
    super(model)
    this.model = model
  }


}