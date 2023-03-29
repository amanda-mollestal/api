import { Document, Model, Schema, model } from 'mongoose';

export enum WebhookEvent {
  HABIT_COMPLETED = 'habitCompleted',
  HABIT_REVERTED = 'habitReverted',
  HABIT_UPDATED = 'habitUpdated',
}

export interface IWebhook extends Document {
  url: string;
  events: string[];
}

const webhookSchema = new Schema<IWebhook>({
  url: {
    type: String,
    required: true,
    trim: true,
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