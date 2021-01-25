const { Repository } = require('@Codya/structures')

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
    const user = await this.model.create({ id })

    return user
  }

  /**
   * @param {string} id
   * @returns {import('mongorito').Model}
   */
  async find (id) {
    const user = await this.model.findOne({ id })

    return user || await this.create(id)
  }

  async update (id, data) {
    const user = await this.find(id)

    user.set(data)
    await user.save()

    return user.get()
  }

  delete (id) {
    return this.model.remove({ id })
  }
}

module.exports = UserRepository
