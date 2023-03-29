import { WebhookService } from '../services/WebhookService'

export class WebhookController {
  #service: WebhookService
  
  constructor(service: WebhookService) {
    this.#service = service
  }
}
