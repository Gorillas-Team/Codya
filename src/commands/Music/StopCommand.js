const { MusicCommand } = require('../../music')

module.exports = class extends MusicCommand {
  constructor (client) {
    super(client, {
      name: 'stop',
      aliases: ['parar'],
      category: 'Music',
      description: 'Pare a fila de músicas.',
      usage: '<prefix>stop',
      requirements: {
        voiceChannelOnly: true,
        queueOnly: true,
        djOnly: true
      }
    })
  }

  run ({ guild, channel }) {
    guild.music.destroy()
    return channel.sendTempMessage(this.client.getEmoji('stopped') + ' | Estou saindo do canal.')
  }
}
