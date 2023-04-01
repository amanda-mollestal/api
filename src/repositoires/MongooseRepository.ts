import { Document, Model } from 'mongoose';

export class MongooseRepositoryBase<T> {
  /**
   * The Mongoose model.
   *
   * @type {mongoose.Model}
   */
  #model: Model<T>;

  /**
   * The allowed model property names.
   *
   * @type {string[]}
   */
  #allowedModelPropertyNames: ReadonlyArray<string>;

  /**
   * Initializes a new instance.
   *
   * @param {mongoose.Model} model - A Mongoose model.
   */
  constructor(model: Model<T>) {
    this.#model = model;
  }

  get allowedModelPropertyNames() {
    if (!this.#allowedModelPropertyNames) {
      const disallowedPropertyNames = ['_id', '__v', 'createdAt', 'updatedAt', 'id'];
      this.#allowedModelPropertyNames = Object.freeze(
        Object.keys((this.#model.schema as any).tree)
          .filter(key => !disallowedPropertyNames.includes(key))
      ) as ReadonlyArray<string>;
    }

    return this.#allowedModelPropertyNames;
  }

  async get(filter: any, projection: any = null, options: any = null) {
    return this.#model.find(filter, projection, options).exec();
  }

  async getById(id: string, projection: any = null, options: any = null) {
    return this.#model.findById(id, projection, options).exec();
  }

  async getOne(conditions: any, projection: any = null, options: any = null) {
    return this.#model.findOne(conditions, projection, options).exec();
  }

  async insert(insertData: T) {
    this.#ensureValidPropertyNames(insertData);

    return this.#model.create(insertData);
  }

  async delete(id: string, options: any = null) {
    return this.#model.findByIdAndDelete(id, options).exec();
  }

  async update(id: string, updateData: Partial<T>, options: any) {
    this.#ensureValidPropertyNames(updateData);

    return this.#model
      .findByIdAndUpdate(id, updateData, {
        ...options,
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async replace(id: string, replaceData: T, options: any) {
    this.#ensureValidPropertyNames(replaceData);

    return this.#model
      .findOneAndReplace({ _id: id }, replaceData, {
        ...options,
        returnDocument: 'after',
        runValidators: true,
      })
      .exec();
  }

  #ensureValidPropertyNames(data: any) {
    for (const key of Object.keys(data)) {
      if (!this.allowedModelPropertyNames.includes(key)) {
        const error = new Error(`'${key}' is not a valid property name.`);
        error.name = 'ValidationError';
        throw error;
      }
    }
  }
}