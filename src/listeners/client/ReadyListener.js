const { Listener } = require('../../structures/client')
const { CodyaManager, CodyaPlayer } = require('../../music')
const LavalinkLoader = require('../../loaders/LavalinkLoader.js')

module.exports = class ReadyListener extends Listener {
  constructor() {
    super({
      name: 'ready',
      once: true
    })
  }

  async run() {
    this.lavalink = new CodyaManager(this, this.config.nodes, {
      Player: CodyaPlayer
    })

    await new LavalinkLoader(this.lavalink).load()
    this.logger.log(
      `${this.user.username} iniciada com:
    ${this.users.cache.size} usuários;
    ${this.guilds.cache.size} guilds;
    ${this.commands.size} comandos.`,
      'cyan'
    )
  }
}
