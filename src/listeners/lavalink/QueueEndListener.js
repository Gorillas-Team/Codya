const { Listener } = require('../../structures')

module.exports = class QueueEndListener extends Listener {
  constructor () {
    super({
      name: 'queueEnd'
    })
  }

  async run (player) {
    player.textChannel.send(player.manager.client.botEmojis.stopped + ' | A fila acabou...')

    await this.client.leave(player.guild)
  }
}
