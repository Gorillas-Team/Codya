
class Repository {
  constructor (client, options) {
    this.client = client
    this.name = options.name
  }

  load () {}

  async create () {}

  async get () {}

  async delete () {}

  async update () {}
}

module.exports = Repository
