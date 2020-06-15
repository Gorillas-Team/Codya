const { Command } = require('../../structures')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'stop',
      aliases: ['parar'],
      category: 'Music',
      description: 'Pare a fila de músicas.',
      usage: '<prefix>stop'
    })
    this.conf = {
      voiceChannelOnly: true,
      queueOnly: true,
      djOnly: true
    }
  }

  run ({ lavalink, guild, channel }) {
    lavalink.leave(guild.id)
    return channel.send(this.client.botEmojis.stopped + ' | Estou saindo do canal à pedido do DJ.')
  }
}
