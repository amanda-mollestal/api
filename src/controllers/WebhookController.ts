import { WebhookService } from '../services/WebhookService'
import { IWebhook, WebhookEvent } from '../models/WebhookModel'
import { AuthenticatedUserRequest } from './IAuthenticatedUserRequest'
import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { webhookRegisterLinks } from '../util/Links'
import createError from 'http-errors'

/**
 * Controller class for handling Webhook-related HTTP requests.
 */
export class WebhookController {
  #service: WebhookService

  /**
   * Creates a new instance of the WebhookController class.
   * 
   * @param {WebhookService} service The Webhook service used by the controller.
   */
  constructor(service: WebhookService) {
    this.#service = service
  }

  /**
   * Handles the HTTP POST /webhooks/register request.
   * 
   * @param {AuthenticatedUserRequest} req -  The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async registerWebhook(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {

      const eventArr = req.body.events.split(',').map((s: string) => s.trim());
      const result = await this.#service.register(req.body.url, req.user.id, eventArr)

      const links = webhookRegisterLinks
      res.status(201).json({
        message: 'Webhook registration successful.',
        webhook: result,
        _links: links,
      })
    } catch (error) {

      
      if (error.name === 'WebhookUrlError') {
        next(createError(400, 'Invalid url, please provide a valid url and try again'))
      }

      if (error.name === 'WebhookDuplicateError') {
        next(createError(400, 'Webhook already exists, please provide a unique url and try again'))
      }

      if (error.name === 'WebhookEventError') {
        next(createError(400, 'Invalid event. Can be "completed", "reverted", "updated", or a combination of them with a "," separating them.'))
      }

      if(error.name === 'WebhookValidationError' ) {
        error.status = 400
        error.message = error.message
        next(error)
      }
      next(error)
    }
  }

  /**
   * Method for firing webhooks. 
   * 
   * @param {AuthenticatedUserRequest} req -  The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   * @param {WebhookEvent} event - The event that triggered the webhook.
   */
  async fireWebhook(req: AuthenticatedUserRequest, res: Response, next: NextFunction, event: WebhookEvent) {
    try {
      const conditions = {
        ownerId: req.user.id,
        events: event
      }

      const result = await this.#service.get(conditions)

      for (const webhook of result) {

        try {
          const response = await axios.post(webhook.url, {
            event: event,
            habit: req.habit
          })
        } catch (error) {
          console.log(`Error sending webhook to ${webhook.url}: ${error.message}`)
        }
      }
    } catch (error) {
      console.log('Error sending webhook. Error: ', error)
    }
  }

  /**
   * Handles the HTTP POST /webhooks/unregister request.
   * 
   * @param {AuthenticatedUserRequest} req -  The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  async unregisterWebhook(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {

    try {
      await this.#service.unregister(req.body.url, req.user.id)
      res.status(204).end()
    } catch (error) {
      if(error.name === 'WebhookNotFoundError' ) {
        next(createError(404, 'No webhook found with the given URL.'))
      }

      if (error.name === 'WebhookUnauthorizedError') {
        next(createError(404, 'Webhook not found.'))
      }
      next(error)
    }
  }
}
