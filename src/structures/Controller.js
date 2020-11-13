class Controller {
  /**
   * @param {ControllerOptions} options
   * @param {Codya} client
   */
  constructor (options, client) {
    this.client = client

    this.name = options.name
    this.repositoryName = options.repositoryName
  }

  get repository () {
    return this.client.repositories[this.repositoryName]
  }
}

module.exports = Controller