const { Listener } = require('../../structures/client')

module.exports = class ReadyListener extends Listener {
  constructor () {
    super({
      name: 'ready',
      once: true
    })
  }

  async run () {
    this.logger.log(
      `${this.user.username} iniciada com:
    ${this.users.cache.size} usuários;
    ${this.guilds.cache.size} guilds;
    ${this.commands.size} comandos.`,
      'cyan'
    )
  }
}
