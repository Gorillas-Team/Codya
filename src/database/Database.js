/* eslint-disable no-unused-vars */

// const models = require('./models')
const { Sequelize } = require('sequelize')

module.exports = class Database {
  constructor (options, client) {
    this.options = options
    this.client = client
    this.sequelize = null

    this.models = {}

    this.start()
  }

  start () {
    this.sequelize = new Sequelize(this.options)

    this.client.logger.createGroup('[DATABASE]')
    this.client.logger.log('> Connection started with success.')
    this.client.logger.closeGroup()

    return this
  }
}
