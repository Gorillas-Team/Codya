const { Repository } = require('@Codya/structures')
const { machines } = require('../../assets')

const Machine = require('../database/models/associations/Machine')

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
    const user = new this.model({
      id,
      xp: 0,
      work: null,
      level: 1,
      blacklist: false,
      workCooldown: 0,
      dailyCooldown: 0,
      playlist: [],
      machines: machines.map(data => new Machine(data))
    })

    await user.save()
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
    return this.model.deleteOne({ id })
  }
}

module.exports = UserRepository
