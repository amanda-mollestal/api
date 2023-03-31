import { WebhookService } from '../services/WebhookService'
import { IWebhook, WebhookEvent } from '../models/WebhookModel'
import { AuthenticatedUserRequest } from './IAuthenticatedUserRequest'
import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { webhookRegisterLinks } from './Links'

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

      console.log(req.body)

      const result = await this.#service.register(req.body.url, req.user.id, req.body.events)

      const links = webhookRegisterLinks
      res.status(201).json({
        message: 'Webhook registration successful.',
        webhook: result,
        _links: links,
      })
    } catch (error) {
      console.log(error)
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
    console.log('Firing webhooks')
    try {

      console.log(req.habit)

      const conditions = {
        ownerId: req.user.id,
        events: event
      }

      const result = await this.#service.get(conditions)

      for (const webhook of result) {
        console.log(webhook)
        const response = await axios.post(webhook.url, {
          event: event,
          habit: req.habit
        })
        // console.log(response)
      }

      //console.log(result)

      /*const result = await this.#service.getWebhook(req.body.habitId, req.user.id)

      this.fireWebhook(result)*/
      //console.log(result)

      //res.status(200).json(result)
    } catch (error) {
      console.log(error)
      //next(error)
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
      await this.#service.unregister(req.body.id, req.user.id)
      res.status(204).end()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
