const { MusicCommand } = require('../../music')

module.exports = class extends MusicCommand {
  constructor (client) {
    super(client, {
      name: 'pause',
      aliases: ['pausar'],
      description: 'Pause a fila de músicas',
      usage: '<prefix>pause',
      category: 'Music',
      requirements: {
        voiceChannelOnly: true,
        queueOnly: true,
        djOnly: true
      }
    })
  }

  run ({ channel, guild }) {
    if (guild.music.paused) {
      return channel.sendTempMessage(this.client.botEmojis.error + ' | A música já se encontra pausada.')
    }

    guild.music.pause(true)
    return channel.sendTempMessage(this.client.botEmojis.paused + ' | Música pausada com sucesso.')
  }
}
