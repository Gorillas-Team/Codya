class Repository {
  constructor (options, client) {
    /**
     * @type {import('../Codya') | Codya}
     */
    this.client = client
    this.name = options.name
    this.modelName = options.modelName
  }

  /**
   * @returns {import('mongoose').Model}
   */
  get model () {
    return this.client.database.models[this.modelName]
  }
}

module.exports = Repository
