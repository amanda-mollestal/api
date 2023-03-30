import { WebhookService } from '../services/WebhookService'
import { IWebhook, WebhookEvent } from '../models/WebhookModel'
import { AuthenticatedUserRequest } from './IAuthenticatedUserRequest'
import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

export class WebhookController {
  #service: WebhookService
  
  constructor(service: WebhookService) {
    this.#service = service
  }

  async registerWebhook(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    try {

      console.log(req.body)

      const result = await this.#service.register(req.body.url, req.user.id, req.body.events)

    
      res.status(201).json(result)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async fireWebhook(req: AuthenticatedUserRequest, res: Response, next: NextFunction, event: WebhookEvent) {
    console.log('Firing webhooks')
    try {

      console.log(req.habit)

      const conditions = {
        ownerId: req.user.id,
        events: event
      }

      const result = await this.#service.get(conditions)

      for(const webhook of result) {
        console.log(webhook)
        const response = await axios.post(webhook.url, {
          event: event,
          habit: req.habit
        })
        console.log(response)
      }
        
      console.log(result)

      /*const result = await this.#service.getWebhook(req.body.habitId, req.user.id)

      this.fireWebhook(result)*/ 
      //console.log(result)

      //res.status(200).json(result)
    } catch (error) {
      console.log(error)
      //next(error)
    }
  }

  /*async fireWebhook( webhook: IWebhook) {
    console.log('Firing webhook')

    try {
      
    } catch (error) {
      
    }
  }*/
}
