const { Client, Collection } = require('eris')
const { Constants } = require('@Codya/utils')
const { Command, Logger } = require('@Codya/structures')

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

    this.config = {
      devs: options.devs,
      prefixes: options.prefixes,
      nodes: options.nodes,
      database: options.database
    }

    // this.database = new Database(this.config.database, this)
    /**
     * @type {Logger}
     */
    this.logger = new Logger(this)
    /**
     * @type {Eris.Collection<Command>}
     */
    this.commands = new Collection(Command)
  }

  async initLoaders () {
    for (const Loader of Object.values(Loaders)) {
      const loader = new Loader(this)
      try {
        if (loader.critical) await loader.load()
      } catch (error) {
        this.logger.log(error.message, 'red')
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

    if (!emoji) throw new Error('Unknown emoji.')

    if (emojiName in Constants.emojis) emoji = Constants.emojis[emojiName]
    else {
      emoji = emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`
    }

    return emoji
  }
}

module.exports = Codya
