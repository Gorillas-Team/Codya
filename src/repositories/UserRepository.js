const { Repository } = require('@Kong/structures')

class UserRepository extends Repository {
  constructor (client) {
    super({
      name: 'users',
      modelName: 'users'
    }, client)
  }

  /**
   * @param {string} id
   */
  async create (id) {
    return this.model.create({ id })
  }

  /**
   * @param {string} id
   * @returns {import('mongoose').Model}
   */
  async find (id) {
    const user = await this.model.findOne({ id })

    console.log(user)

    return user || await this.create(id)
  }

  async update (id, data) {
    return this.model.updateOne({ id }, data)
  }

  delete (id) {
    return this.model.remove({ id })
  }
}

module.exports = UserRepository
