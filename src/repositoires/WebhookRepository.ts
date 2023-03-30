import { MongooseRepositoryBase } from './MongooseRepository';
import { IWebhook, IWebhookModel, WebhookEvent, WebhookModel  } from '../models/WebhookModel';



export class WebhookRepository extends MongooseRepositoryBase<IWebhook> {
  model: IWebhookModel
  constructor(model: IWebhookModel = WebhookModel) {
    super(model)
    this.model = model
  }


}