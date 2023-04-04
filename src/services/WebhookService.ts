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
  
        events.forEach(event => {
          switch (event.toLowerCase()) {
            case 'completed':
              newWebhook.events.push(WebhookEvent.COMPLETED)
              return
            case 'reverted':
              newWebhook.events.push(WebhookEvent.REVERTED)
              return
            case 'updated':
              newWebhook.events.push(WebhookEvent.UPDATED)
              return
            default:
              const err = new Error()
              err.name = 'WebhookEventError'
              err.message = 'Invalid event. Can be "completed", "reverted", "updated", or a combination of them with a "," separating them.'
              throw err
          }
        })

        console.log(newWebhook.events)

        const result = await this.repository.insert(newWebhook)
        return result as IWebhook

    } catch (error) {

      if(error.name === 'WebhookEventError') {
        throw error
      }

      if(error.code === 11000 || error.name === 'MongoServerError') {
        const err = new Error()
        err.name = 'WebhookDuplicateError'
        err.message = 'Webhook already exists, please provide a unique url and try again'
        throw err
      }

      if(error.errors?.url) {
        const err = new Error()
        err.name = 'WebhookUrlError'
        err.message = 'Invalid url, please provide a valid url and try again'
        throw err
      }

    }

  }

  /**
   * Unregisters a webhook.
   * 
   * @param {string} webhookUrl - The url of the webhook.
   * @param {string} ownerId - The id of the user who owns the webhook.
   * 
   */
  async unregister (webhookUrl: string, ownerId: string) {

    const filter = { url: webhookUrl, ownerId: ownerId}
    const webhook = await this.repository.getOne(filter)
 
    if (webhook === null) {
      const error = new Error()
      error.name = 'WebhookNotFoundError'
      throw error
      
    } if (webhook.ownerId !== ownerId) {
      const error = new Error()
      error.name = 'WebhookUnauthorizedError'
      throw error
    } else {
      await this.repository.delete(webhook.id)
    }
  } 

}
  


