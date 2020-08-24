const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'volume',
      aliases: ['vol'],
      description: 'Sete o volume da fila.',
      usage: '<prefix>volume 100',
      category: 'Music'
    })

    this.conf = {
      voiceChannelOnly: true,
      queueOnly: true,
      djOnly: true
    }
  }

  run ({ channel, args, guild }) {
    const volume = Number(args[0])

    if (isNaN(volume)) {
      return channel.send(this.client.botEmojis.error + ' | Você não informou o volume ou valor inserido é inválido.').then(x => x.delete({ timeout: 10000 }))
    }

    if (volume > 200) {
      return channel.send(this.client.botEmojis.error + ' | O volume inserido é superior a `200`.')
    }

    const emoji = volume > guild.music.state.volume ? this.client.botEmojis.volumeUp : this.client.botEmojis.volumeDown
    const state = volume > guild.music.state.volume ? 'aumentado para: ' : 'reduzido para: '
    guild.music.volume(volume)
    return channel.send(emoji + ' | Volume ' + state + '`' + volume + '`.').then(x => x.delete({ timeout: 10000 }))
  }
}
