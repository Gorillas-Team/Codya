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
   * @returns {new import('mongorito').Model}
   */
  get model () {
    return this.client.database.models[this.modelName]
  }
}

module.exports = Repository
