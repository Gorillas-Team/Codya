const { Client, Collection } = require('discord.js')
const { Constants } = require('./utils/')
const config = require('../config.js')
const Loaders = require('./loaders')
const Mongo = require('./database/Mongo')

module.exports = class Codya extends Client {
  constructor (options = {}) {
    super(options)

    this.devs = ['400385060311793674', '616410427794128909', '332581129704177664', '662537363779616785']
    this.commands = new Collection()
    this.config = config
    this.botEmojis = Constants.emojis
    this.database = new Mongo(process.env.DATABASE)
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

  login () {
    this.initLoaders()
    super.login(process.env.TOKEN)
    return this
  }
}
