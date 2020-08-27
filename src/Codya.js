const { Client, Collection } = require('discord.js')
const { Constants } = require('./utils/')
const { Logger } = require('./structures/client')
const Loaders = require('./loaders')
const Database = require('./database/Database')

require('./structures/discord')

module.exports = class Codya extends Client {
  constructor (options = {}) {
    super(options)
    // temp
    this.botEmojis = Constants.emojis

    this.token = options.token
    this.config = {
      devs: options.devs,
      prefixes: options.prefixes,
      nodes: options.nodes,
      database: options.database
    }

    this.database = new Database(this)
    this.logger = new Logger(this)
    this.commands = new Collection()
  }

  async initLoaders () {
    for (const Loader of Object.values(Loaders)) {
      const loader = new Loader(this)
      try {
        await loader.load()
      } catch (err) {
        console.error(err)
      }
    }
  }

  start () {
    this.initLoaders()
    super.login(this.token)
    return this
  }
}
