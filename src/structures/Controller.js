class Controller {
  /**
   * @param {import('./typings/typedef').ControllerOptions} options
   * @param {Codya} client
   */
  constructor (options, client) {
    this.client = client

    this.name = options.name
    this.repositoryName = options.repositoryName
  }

  /**
   * @returns {import('./Repository')}
   */
  get repository () {
    return this.client.repositories[this.repositoryName]
  }
}

module.exports = Controller
