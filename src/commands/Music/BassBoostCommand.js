const { MusicCommand } = require('../../music')

module.exports = class extends MusicCommand {
  constructor(client) {
    super(client, {
      name: 'bassboost',
      aliases: ['bass'],
      usage: '<prefix>bassboost <gain>',
      description: 'Sete o tamanho do bassboost da fila.',
      category: 'Music',
      requirements: {
        voiceChannelOnly: true,
        queueOnly: true,
        djOnly: true
      }
    })
  }

  run({ channel, guild }) {
    guild.music.bassboost()
    const filter = guild.music.filters.bassboost
    const mode = filter ? 'ativado' : 'desativado'

    channel.sendTempMessage(
      `${this.client.getEmoji('dancing')} | Bassboost ${mode} com sucesso.`
    )
  }
}
