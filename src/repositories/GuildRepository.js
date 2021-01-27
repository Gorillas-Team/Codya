const { Repository } = require('@Kong/structures')

class GuildRepository extends Repository {
  constructor (client) {
    super({
      name: 'guilds',
      modelName: 'guilds'
    }, client)
  }

  /**
   * @param {string} id
   */
  async create (id) {
    const guild = await this.model.create({ id })

    return guild
  }

  /**
   * @param {string} id
   * @returns {import('mongorito').Model}
   */
  async find (id) {
    const guild = await this.model.findOne({ id })

    return guild || await this.create(id)
  }

  async update (id, data) {
    return this.model.updateOne({ id }, data)
  }

  async delete (id) {
    return this.model.deleteOne({ id })
  }
}

module.exports = GuildRepository
