
class Repository {
  constructor (client, options) {
    this.client = client
    this.name = options.name
  }

  load () {}
}

module.exports = Repository