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
   * @param {string} id
   * @returns {import('mongoose').Model}
   */
  async create (id) {}

  /**
   * @param {string} id
   * @returns {import('mongoose').Model}
   */
  async find (id) {}

  /**
   * @param {string} id
   * @param {object} data
   * @returns {import('mongoose').Model}
   */
  async update (id, data) {}

  /**
   * @param {string} id
   * @returns {import('mongoose').Model}
   */
  async delete (id) {}

  /**
   * @returns {import('mongoose').Model}
   */
  get model () {
    return this.client.database.models[this.modelName]
  }
}

module.exports = Repository
