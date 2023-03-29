import { Document, Model, Schema, model } from 'mongoose'

export interface IHabit extends Document {
  //tree?: Record<string, any>
  title: string
  description: string
  ownerId: string
  completedDates: string[]
}

const habitSchema = new Schema<IHabit>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  ownerId: {
    type: String,
    required: true,
  },
  completedDates: {
    type: [String],
    unique: true,
    validate: {
      validator: function(arr: string[]) {
        return arr.length === new Set(arr).size;
      },
      message: 'You have already completed this habit today'
    }
  }
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
    delete ret.__v
    //ret.completedDates.forEach((date: any) => delete date._id)
  },
}

habitSchema.set('timestamps', true)
habitSchema.set('toObject', convertOptions)
habitSchema.set('toJSON', convertOptions)

export interface IHabitModel extends Model<IHabit> { }

export const HabitModel: IHabitModel = model<IHabit, IHabitModel>('Habit', habitSchema);


