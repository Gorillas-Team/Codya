const { Listener } = require('../../structures/client')

module.exports = class QueueEndListener extends Listener {
  constructor () {
    super({
      name: 'queueEnd'
    })
  }

  async run (player) {
    await player.textChannel.send(player.manager.client.botEmojis.stopped + ' | A fila acabou...')
      .then(msg => msg.delete({ timeout: 5000 }))

    player.end()
  }
}
