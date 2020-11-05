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

  async getEmoji (emojiName) {
    const emojis = await this.fetchEmojis()
    const emoji = emojis.find(emoji => emoji.name === emojiName) || Constants.emotes[emojiName]

    if (!emoji) throw new Error('Unknown emoji.')

    return emoji || `<a:${emoji.name}:${emoji.id}>`
  }

  async fetchEmojis () {
    if (this.emojis) return this.emojis

    const emojis = await this.getRESTGuildEmojis('534404798829821956')
    this.emojis = emojis
    return emojis
  }
}

module.exports = Codya
