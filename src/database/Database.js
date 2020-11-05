const { Sequelize } = require('sequelize')

class Database {
  constructor (options, client) {
    this.options = options
    this.client = client
    this.sequelize = null

    this.models = {}

    this.start()
  }

  async start () {
    this.sequelize = new Sequelize({ sync: true, ...this.options })

    await this.sequelize.sync({ force: true })

    this.client.logger.createGroup('[DATABASE]')
    this.client.logger.log('> Connection started with success.', 'green')
    this.client.logger.closeGroup()

    return this
  }
}

module.exports = Database
