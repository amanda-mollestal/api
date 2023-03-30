import { Document, Model, Schema, model } from 'mongoose';
import validator from 'validator'

export enum WebhookEvent {
  COMPLETED = 'completed',
  REVERTED  = 'reverted',
  UPDATED   = 'updated',
}

export interface IWebhook extends Document {
  url: string;
  ownerId: string;
  events: WebhookEvent[];
}

const webhookSchema = new Schema<IWebhook>({
  url: {
    type: String,
    required: true,
    trim: true,
    validate: [validator.isURL, 'The URL you entered is not a valid URL'],
  },
  ownerId: {
    type: String,
    required: true,
  },
  events: {
    type: [{
      type: String,
      enum: Object.values(WebhookEvent),
    }],
    required: true,
  },
});

webhookSchema.virtual('id').get(function (this: IWebhook) {
  return this._id.toHexString();
});

const convertOptions = {
  virtuals: true,
  versionKey: false,
  transform: (doc: any, ret: any) => {
    delete ret._id;
    delete ret.__v;
  },
};

webhookSchema.set('timestamps', true);
webhookSchema.set('toObject', convertOptions);
webhookSchema.set('toJSON', convertOptions);

export interface IWebhookModel extends Model<IWebhook> {}

export const WebhookModel: IWebhookModel = model<IWebhook, IWebhookModel>('Webhook', webhookSchema);