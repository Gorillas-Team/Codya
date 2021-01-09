const { Repository } = require('@Codya/structures')

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
    const guild = new this.model({
      id,
      channels: {},
      modules: 0
    })

    await guild.save()
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
    const guild = await this.find(id)

    guild.set(data)
    await guild.save()

    return guild.get()
  }

  async delete (id) {
    return this.model.remove({ id })
  }
}

module.exports = GuildRepository
