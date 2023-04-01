import { MongooseServiceBase } from './MongooseServiceBase'
import { WebhookRepository } from '../repositoires/WebhookRepository'
import { IWebhook } from '../models/WebhookModel'
import { WebhookEvent } from '../models/WebhookModel'

/**
 * Service class for handling Webhook-related business logic.
 */
export class WebhookService extends MongooseServiceBase<IWebhook> {
  repository: WebhookRepository

  /**
   *  Creates a new instance of the WebhookService class.
   * 
   * @param {WebhookRepository} repository The Webhook repository used by the service.
  */
  constructor(repository: WebhookRepository) {
    super(repository)
    this.repository = repository
  }

  /**
   * Registers a new webhook.
   * 
   * @param {string} url - The url of the webhook.
   * @param {string} ownerId - The id of the user who owns the webhook.
   * @param {string[]} events - The events that the webhook will be notified of.
   * @returns {IWebhook} - The newly registered webhook.
   */
  async register (url: string , ownerId: string, events: string[]): Promise<IWebhook> {

    try {
      const newWebhook: IWebhook = {
        url: url,
        ownerId: ownerId,
        events: []
      } as IWebhook  
  
      if(events.length > 0) {
        events.forEach(event => {
        
          if (event.toLocaleLowerCase() === 'completed') {
            newWebhook.events.push(WebhookEvent.COMPLETED)
          } else if (event.toLocaleLowerCase() === 'reverted') {
            newWebhook.events.push(WebhookEvent.REVERTED)
          } else if (event.toLocaleLowerCase() === 'updated') {
            newWebhook.events.push(WebhookEvent.UPDATED)
          }
        })
        const result = await this.repository.insert(newWebhook)
        return result as IWebhook
      }
    } catch (error) {
      error.name = 'WebhookValidationError'
      error.message = 'Missing required fields, please provide all required fields and try again'
      throw error
    }

  }

  /**
   * Unregisters a webhook.
   * 
   * @param {string} webhookId - The id of the webhook to unregister.
   * @param {string} ownerId - The id of the user who owns the webhook.
   * 
   */
  async unregister (webhookId: string, ownerId: string) {

    const webhook = await this.repository.getById(webhookId) 
 
    if (webhook.ownerId !== ownerId) {
      throw new Error('Unauthorized')
    } else {
      await this.repository.delete(webhookId)
    }
  } 

}
  


