const { Client, Collection } = require('eris')
const { Constants } = require('@Kong/utils')
const { Command, Logger } = require('@Kong/structures')
const { Database } = require('@Kong/database')

const Loaders = require('@Kong/loaders')

/**
 * @name Kong
 * @class-
 */
class Kong extends Client {
  /**
   * @param {string} token
   * @param {import('eris').ClientOptions} options
   */
  constructor (token, options) {
    super(token, options)

    /**
     * @type {{ users: import('./repositories/UserRepository'), guilds: import('./repositories/GuildRepository') }}
     */
    this.repositories = {}

    /**
     * @type {import('./audio/KongManager')}
     */
    this.lavalink = null

    /**
     * @type {{ users: import('./controllers/UserController'), fish: import('./controllers/economy/FishController'), economy: import('./controllers/economy/EconomyController') }}
     */
    this.controllers = {}

    this.config = {
      devs: options.devs,
      prefixes: options.prefixes,
      nodes: options.nodes,
      database: options.database
    }

    /**
     * @type {Logger}
     */
    this.logger = new Logger(this)
    /**
     * @type {Database}
     */
    this.database = new Database(this.config.database, this)
    /**
     * @type {Collection<Command>}
     */
    this.commands = new Collection(Command)
  }

  async initLoaders () {
    for (const Loader of Object.values(Loaders)) {
      const loader = new Loader(this)
      try {
        await loader.load()
      } catch (error) {
        this.logger.log(error.message, 'red')
        if (loader.critical) process.exit(1)
      }
    }
  }

  async start () {
    await this.initLoaders()
    await super.connect()
    return this
  }

  getEmoji (emojiName) {
    const guild = this.guilds.get('534404798829821956')
    let emoji = guild.emojis.find(emoji => emoji.name === emojiName)

    if (emojiName in Constants.emojis) emoji = Constants.emojis[emojiName]
    else {
      emoji = emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`
    }

    if (!emoji) throw new Error('Unknown emoji.')

    return emoji
  }
}

module.exports = Kong
