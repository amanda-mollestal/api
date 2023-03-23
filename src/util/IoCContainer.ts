/**
 * Encapsulates an inversion of control container.
 */
export class IoCContainer {
  /**
   * A collection of services.
   *
   * @type {Map}
   */
  #services: Map<string, { definition: any, dependencies: string[], singleton: boolean, type: boolean }>

  /**
   * A collection of single instances.
   *
   * @type {Map}
   */
  #singletons: Map<string, any>

  /**
   * Initializes a new instance.
   */
  constructor() {
    this.#services = new Map<string, { definition: any, dependencies: string[], singleton: boolean, type: boolean }>()
    this.#singletons = new Map<string, any>()
  }

  /**
   * Registers a service with the container.
   *
   * @param {string} name - The service's name.
   * @param {*} definition - The service's definition.
   * @param {object} options - Configuration options for the service.
   * @param {string[]} [options.dependencies=[]] -  An array of dependency names for the service. An empty array by default.
   * @param {boolean} [options.singleton=false] -  If true, the service will be treated as a singleton instance. False by default.
   * @param {boolean} [options.type=false] -  If true, the 'definition' parameter will be treated as a constructor. False by default.
   */
  public register(name: string, definition: any, { dependencies = [], singleton = false, type = false }: { dependencies?: string[], singleton?: boolean, type?: boolean } = {}): void {
    this.#services.set(
      name,
      {
        definition,
        dependencies,
        singleton: !!singleton,
        type: !!type
      })
  }

  /**
   * Resolves a value or object by name.
   *
   * @param {string} name - The service's name to resolve.
   * @returns {*} A service.
   */
  public resolve(name: string): any {
    const service = this.#services.get(name)

    if (!service) {
      throw new Error(`Service '${name}' not found.`)
    }

    // Return the value.
    if (typeof service.definition !== 'function' || service.type) {
      return service.definition
    }

    // If not a singleton, create and return a new instance.
    if (!service.singleton) {
      return this.#createInstance(service)
    }

    // It's a singleton, so if it's necessary, create new instance,
    // and return the one and only instance.
    if (!this.#singletons.has(name)) {
      const instance = this.#createInstance(service)
      this.#singletons.set(name, instance)
    }
    return this.#singletons.get(name)
  }

  /**
   * Creates a new instance based on a service.
   *
   * @param {object} service - The service object, containing its definition and dependencies.
   * @returns {*} A new instance.
   */
  #createInstance(service: { definition: any, dependencies: string[], singleton: boolean, type: boolean }): any {
    const args = service.dependencies?.map((dependency) => this.resolve(dependency)) || []
    /* eslint-disable-next-line new-cap */
    return new service.definition(...args)
  }
}