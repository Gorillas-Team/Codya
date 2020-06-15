const { GorilinkManager } = require('gorilink')
const LavalinkLoader = require('../../loaders/LavalinkLoader.js')

module.exports = {
  name: 'ready',
  async run () {
    this.lavalink = new GorilinkManager(this, this.config.nodes)

    await new LavalinkLoader(this.lavalink).load()
    console.info(`${this.user.username} iniciada com:\n${this.users.cache.size} usuários;\n${this.guilds.cache.size} guilds;\n${this.commands.size} comandos.`)
  }
}
