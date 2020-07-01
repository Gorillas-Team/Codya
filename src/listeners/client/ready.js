const { GorilinkManager } = require('gorilink')
const LavalinkLoader = require('../../loaders/LavalinkLoader.js')
const { CodyaPlayer } = require('../../music')

module.exports = {
  name: 'ready',
  async run () {
    this.lavalink = new GorilinkManager(this, this.config.nodes, {
      Player: CodyaPlayer
    })

    await new LavalinkLoader(this.lavalink).load()
    console.info(`${this.user.username} iniciada com:\n${this.users.cache.size} usuários;\n${this.guilds.cache.size} guilds;\n${this.commands.size} comandos.`)
  }
}
