const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'bassboost',
      aliases: ['bass'],
      usage: '<prefix>bassboost <gain>',
      description: 'Sete o tamanho do bassboost da fila.',
      category: 'Music'
    })

    this.conf = {
      voiceChannelOnly: true,
      queueOnly: true,
      djOnly: true
    }
  }

  run ({ channel, args, guild }) {
    guild.music.bassboost()
    const filter = guild.music.filters.bassboost
    const mode = filter ? 'ativado' : 'desativado'

    channel.sendTempMessage(`${this.client.botEmojis.dancing} | Bassboost ${mode} com sucesso.`)
  }
}
