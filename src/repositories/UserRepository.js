const { Repository } = require('@Codya/structures')
const Machine = require('@Codya/database/models/associations/Machine')

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
      level: 1,
      blacklist: false,
      dailyCooldown: 0,
      machines: [new Machine({ id: 0, amount: 0, moneyGenerated: 0, name: 'Máquina de Cash', enabled: false })]
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

    console.log(user.get())
    return user.get()
  }

  delete (id) {
    return this.model.deleteOne({ id })
  }
}

module.exports = UserRepository
