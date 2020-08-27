const { MusicCommand } = require('../../music')

module.exports = class extends MusicCommand {
  constructor (client) {
    super(client, {
      name: 'nightcore',
      aliases: ['nc'],
      category: 'Music',
      usage: '<prefix>nightcore',
      description: 'Ative o modo nightcore na fila de músicas.',
      requirements: {
        voiceChannelOnly: true,
        queueOnly: true,
        djOnly: true
      }
    })
  }

  run ({ channel, guild, args }) {
    guild.music.nightcore()
    const filter = guild.music.filters.nightcore
    const mode = filter ? 'ativado' : 'desativado'

    channel.sendTempMessage(`${this.client.botEmojis.dancing} | Nightcore ${mode} com sucesso.`)
  }
}
