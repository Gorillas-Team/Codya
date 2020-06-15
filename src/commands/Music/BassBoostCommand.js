const { Command } = require('../../structures')

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
    const bass = Number(args[0])

    if (isNaN(bass)) {
      return channel.send(this.client.botEmojis.error + ' | Informe o tamanho do bassboost.').then(x => x.delete({ timeout: 10000 }))
    }

    guild.music.setEQ(Array(3).fill('').map((_, n) => ({ band: n, gain: bass })))
    return channel.send(this.client.botEmojis.right + ' | Bassboost alterado para: `' + bass + '`.').then(x => x.delete({ timeout: 10000 }))
  }
}
