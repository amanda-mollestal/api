import { Document, Model, Schema, model } from 'mongoose'

export interface IHabit extends Document {
  //tree?: Record<string, any>
  description: string
  dailyLogs: {
    date: string
    done: boolean
    id: string
  }[]
}

const habitSchema = new Schema<IHabit>({
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  dailyLogs: [
    {
      date: {
        type: String,
        required: true,
        unique: true,
      },
      done: {
        type: Boolean,
        required: true,
        default: false,
      },
      id: {
        type: String,
        required: true,
        default: function(this: any) {
          return this._id.toHexString();
        },
      }
    },
  ],
})

habitSchema.virtual('id').get(function (this: IHabit) {
  return this._id.toHexString()
})


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
    delete ret._id
    ret.dailyLogs.forEach((log: any) => delete log._id)
  },
}

habitSchema.set('timestamps', true)
habitSchema.set('toObject', convertOptions)
habitSchema.set('toJSON', convertOptions)

export interface IHabitModel extends Model<IHabit> { }

export const HabitModel: IHabitModel = model<IHabit, IHabitModel>('Habit', habitSchema);


