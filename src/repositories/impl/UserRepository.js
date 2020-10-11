const Repository = require('../Repository')

class UserRepository extends Repository {
  constructor (client) {
    super(client, {
      name: 'users'
    })
  }

  load () {
    return this
  }

  async create (id) {
    return this.client.database.models.users.create({ _id: id })
  }

  async get (id) {
    return this.client.database.models.users.findById(id) || (await this.create(id))
  }

  async update (id, data = {}) {
    return this.client.database.models.users.updateOne({ _id: id }, data)
  }

  async delete (id) {
    return this.client.database.models.users.deleteOne({ _id: id })
  }
}

module.exports = UserRepository
