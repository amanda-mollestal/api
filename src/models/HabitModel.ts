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
    validate: [
      {
        validator: function (arr: string[]) {
          // Check that all strings in the array are unique
          return arr.length === new Set(arr).size
        },
        message: 'Habit has already been completed on this date.'
      },
      {
        validator: function (arr: string[]) {
          // Check that all strings in the array have the format "YYYY-MM-DD"
          return arr.every(date => /^\d{4}-\d{2}-\d{2}$/.test(date))
        },
        message: 'All completedDates must have the format YYYY-MM-DD.'
      }
    ]
  }
})

habitSchema.virtual('id').get(function (this: IHabit) {
  return this._id.toHexString()
})

habitSchema.pre<IHabit>('save', async function (next) {
  const habit = this

  // Check if a habit with the same title and ownerId already exists
  const existingHabit = await HabitModel.findOne({ title: habit.title, ownerId: habit.ownerId })

  if (existingHabit && this.isNew) {
    const err = new Error('A habit with the same title already exists')
    err.name = 'ExistingHabitError'
    return next(err)
  }

  if (habit.completedDates && habit.completedDates.length > 1) {
    const set = new Set(habit.completedDates)
    if (set.size !== habit.completedDates.length) {
      const err = new Error('The completedDates array cannot contain duplicate values.')
      err.name = 'DuplicateCompletedDatesError'
      return next(err)
    }
  }

  next()
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
  },
}

habitSchema.set('timestamps', true)
habitSchema.set('toObject', convertOptions)
habitSchema.set('toJSON', convertOptions)


export interface IHabitModel extends Model<IHabit> { }

export const HabitModel: IHabitModel = model<IHabit, IHabitModel>('Habit', habitSchema)


