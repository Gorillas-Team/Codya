const { Listener } = require('../../structures/client')

module.exports = class QueueEndListener extends Listener {
  constructor () {
    super({
      name: 'queueEnd'
    })
  }

  async run (player) {
    await player.textChannel.sendTempMessage(player.manager.client.botEmojis.stopped + ' | A fila acabou...')

    await player.end()
  }
}
