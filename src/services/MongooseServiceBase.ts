import { Document } from 'mongoose'
import { MongooseRepositoryBase } from '../repositoires/MongooseRepository'

/**
 * Encapsulates a Mongoose service base.
 */
export class MongooseServiceBase<T extends Document> {
  /**
   * The repository.
   *
   * @type {MongooseRepositoryBase}
   */
  protected _repository: MongooseRepositoryBase<T>

  /**
   * Initializes a new instance.
   *
   * @param {MongooseRepositoryBase} repository - A repository instantiated from a class inherited from MongooseRepositoryBase.
   */
  constructor(repository: MongooseRepositoryBase<T>) {
    this._repository = repository
  }

  /**
   * Gets all documents.
   *
   * @returns {Promise<object>} Promise resolved with all documents.
   */
  async get(filter: any = null, projection: any = null, options: any = null): Promise<T[]> {
    return this._repository.get(filter, projection, options)
  }

  /**
   * Gets a document by ID.
   *
   * @param {string} id - The value of the id for the document to get.
   * @returns {Promise<T>} Promise resolved with the found document.
   */
   async getById(id: string, projection: any = null, options: any = null): Promise<T | null> {
     return this._repository.getById(id, projection, options);
   }

  /**
   * Inserts a new document.
   *
   * @param {object} data - The data to insert.
   * @returns {Promise<T>} Promise resolved with the created document.
   */
  async insert(data: T): Promise<T> {
    return this._repository.insert(data)
  }

  /**
   * Updates a document.
   *
   * @param {string} id - The value of the id for the document to update.
   * @param {object} updateData - The new data to update the existing document with.
   * @returns {Promise<T>} Promise resolved with the updated document.
   */
  // async update(id: string, updateData: Partial<T>): Promise<T | null> {
  //   return this._repository.update(id, updateData, {});
  // }

  /**
   * Replaces a document.
   *
   * @param {string} id - The value of the id for the document to update.
   * @param {object} replaceData - The new data to replace the existing document with.
   * @returns {Promise<T>} Promise resolved with the updated document.
   */
  // async replace(id: string, replaceData: T): Promise<T | null> {
  //   return this._repository.replace(id, replaceData, {});
  // }

  /**
   * Deletes a document.
   *
   * @param {string} id - The value of the id for the document to delete.
   * @returns {Promise<T>} Promise resolved with the removed document.
   */
  async delete(id: string): Promise<T | null> {
    return this._repository.delete(id, {})
  }
}