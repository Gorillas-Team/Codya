const { Listener } = require('../../structures')

module.exports = class QueueEndListener extends Listener {
  constructor () {
    super({
      name: 'queueEnd'
    })
  }

  async run (player) {
    const msg = await player.textChannel.send(player.manager.client.botEmojis.stopped + ' | A fila acabou...')

    await msg.delete({ timeout: 10000 })

    await this.leave(player.guild)
  }
}
