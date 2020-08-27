const { Listener } = require('../../structures/client')

module.exports = class TrackStartListener extends Listener {
  constructor () {
    super({
      name: 'trackStart'
    })
  }

  async run (player, track) {
    player.textChannel.sendTempMessage(
      this.client.getEmoji('disco') +
        ' | Tocando agora: `' +
        track.info.title +
        '`. Requisitado por: `' +
        track.info.requester.tag +
        '`',
      track.info.length
    )
  }
}
