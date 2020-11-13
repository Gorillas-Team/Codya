const { Client, Collection } = require('eris')
const { Constants } = require('@Codya/utils')
const { Command, Logger } = require('@Codya/structures')
const { Database } = require('@Codya/database')

const Loaders = require('@Codya/loaders')

/**
 * @name Codya
 * @class
 */
class Codya extends Client {
  /**
   * @param {string} token
   * @param {ClientOptions | import('eris').ClientOptions} options
   */
  constructor (token, options) {
    super(token, options)

    this.emojis = null
    this.repositories = {}

    /**
     * @type {CodyaManager | import('./audio/CodyaManager')}
     */
    this.lavalink = null

    /**
     * @type {object}
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

module.exports = Codya
