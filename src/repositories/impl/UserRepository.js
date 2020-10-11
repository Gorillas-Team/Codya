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
    await this.client.database.models.users.create(id)
  }

  async get (id) {
    return this.client.database.models.findById(id) || (await this.create(id))
  }

  async update (id, data = {}) {
    await this.client.database.models.users.updateOne({ _id: id }, data)
  }

  async delete (id) {
    await this.client.database.models.users.deleteOne({ _id: id })
  }
}

module.exports = UserRepository
