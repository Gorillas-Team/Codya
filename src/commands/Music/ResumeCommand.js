const MusicCommand = require('../../impl/MusicCommand')

module.exports = class extends MusicCommand {
  constructor (client) {
    super(client, {
      name: 'resume',
      aliases: ['retornar', 'unpause', 'despausar'],
      category: 'Music',
      usage: '<prefix>resume',
      description: 'Despause a fila de músicas.',
      requirements: {
        voiceChannelOnly: true,
        queueOnly: true,
        djOnly: true
      }
    })
  }

  run ({ channel, guild }) {
    if (!guild.music.paused) {
      return channel.sendTempMessage(
        this.client.getEmoji('error') + ' | A música não se encontra pausada.'
      )
    }

    guild.music.pause(false)
    return channel.sendTempMessage(
      this.client.getEmoji('playing') + ' | Música retomada com sucesso.'
    )
  }
}
