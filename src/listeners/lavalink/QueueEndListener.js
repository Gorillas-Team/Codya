const { Listener } = require('../../structures')

module.exports = class QueueEndListener extends Listener {
  constructor () {
    super({
      name: 'queueEnd'
    })
  }

  async run (player) {
    await player.textChannel.send(player.manager.client.botEmojis.stopped + ' | A fila acabou...')
      .then(msg => {
        msg.delete({ timeout: 10000 })
      })

    await this.leave(player.guild)
  }
}
