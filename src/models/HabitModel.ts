import { Document, Model, Schema, model } from 'mongoose';

// Define a habit document.
export interface IHabit extends Document {
  tree?: Record<string, any>,
  description: string;
  dailyLogs: {
    date: Date;
    done: boolean;
  }[];
}

// Define a habit model.
export interface IHabitModel extends Model<IHabit> {}

export interface MySchema<T extends Document> extends Schema<T> {
  tree?: Record<string, any>;
}

// Create a schema.
 const schema: MySchema<IHabit> = new Schema<IHabit>({
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  dailyLogs: [{
    date: {
      type: Date,
      required: true,
      unique: true
    },
    done: {
      type: Boolean,
      required: true,
      default: false
    }
  }]
});


schema.virtual('id').get(function (this: IHabit) {
  return this._id.toHexString();
});

const convertOptions = {
  virtuals: true,
  versionKey: false,
  /**
   * Performs a transformation of the resulting object to remove sensitive information.
   *
   * @param {object} doc - The mongoose document which is being converted.
   * @param {object} ret - The plain object representation which has been converted.
   */
  transform: (doc: any, ret: any) => {
    delete ret._id;
  },
};

schema.set('timestamps', true);
schema.set('toObject', convertOptions);
schema.set('toJSON', convertOptions);

// Create a model using the schema.
export const HabitModel: IHabitModel = model<IHabit, IHabitModel>('Habit', schema)