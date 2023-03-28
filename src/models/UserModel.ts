/**
 * The account model.
 *
 * @author Amanda Möllestål
 * @version 1.0.0
 */

// import mongoose, { Document, Model, Schema } from 'mongoose'
// import validator from 'validator'
// import bcrypt from 'bcrypt'

import { Document, Model, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'


export interface IUser extends Document {
  username: string,
  password: string
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: [true, 'You have to enter a username'],
    validate: [validateUsername, 'Please provide a valid username.']
  },
  password: {
    type: String,
    required: [true, 'You have to enter a password'],
    minlength: [10, 'Password have to be 10 or more characters'],
    maxlength: [256, 'Password can only contain up to 256 characters'],
    writeOnly: true
  }
})

function validateUsername(username: string): boolean {
  const regex = /^[A-Za-z][A-Za-z0-9_-]{2,255}$/;
  return regex.test(username);
}

// Hash password and trim username before saving
userSchema.pre<IUser>('save', async function (next) {
  this.username = trimUsername(this.username)
  if (this.isModified('password') || this.isNew) {
  
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
  }

  next()
})

function trimUsername(value: string): string {
  if (typeof value !== 'string') {
    return value;
  }

  return value.trim();
}


// DON'T KNOW WHICH ONE TO USE YET

// This approach is useful if you want to have the authentication code as part of the user instance.
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

//This approach is useful if you want to keep all authentication-related code within the Mongoose model.
userSchema.statics.authentication = async function (username: string, password: string): Promise<IUser> {
  const user = await this.findOne({ username })

  // If no user found or password is wrong, throw an error.
  if (!(await bcrypt.compare(password, user?.password))) {
    throw new Error('Invalid credentials.')
  }

  // User found and password correct, return the user.
  return user
}



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
    delete ret.password
    delete ret.__v
  },
}

userSchema.virtual('id').get(function (this: IUser) {
  return this._id.toHexString()
})

userSchema.set('timestamps', true)
userSchema.set('toObject', convertOptions)
userSchema.set('toJSON', convertOptions)


// Passes along right error message.
userSchema.post<IUser>('save', function (error: any, doc: IUser, next: any) {
  if (error.code === 11000) {
    error.status = 409
    error.message = 'Username in use'
    next(error)
  }

  if (error.errors) {
    error.status = 400
    if (error.errors.username) {
      error.message = error.errors.username.properties.message
    } else if (error.errors.password) {
      error.message = error.errors.password.properties.message
    }
    next(error)
  }
  next()
})


export interface IUserModel extends Model<IUser> {
  comparePassword(password: string): Promise<boolean>
}

export const UserModel: IUserModel = model<IUser, IUserModel>('User', userSchema)