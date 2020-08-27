const { MusicCommand } = require('../../music')

module.exports = class extends MusicCommand {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['vol'],
      description: 'Sete o volume da fila.',
      usage: '<prefix>volume 100',
      category: 'Music',
      requirements: {
        voiceChannelOnly: true,
        queueOnly: true,
        djOnly: true
      }
    })
  }

  run({ channel, args, guild }) {
    const volume = Number(args[0])

    if (isNaN(volume)) {
      return channel.sendTempMessage(
        this.client.getEmoji('error') +
          ' | Você não informou o volume ou valor inserido é inválido.'
      )
    }

    if (volume > 200) {
      return channel.sendTempMessage(
        this.client.getEmoji('error') +
          ' | O volume inserido é superior a `200`.'
      )
    }

    const emoji =
      volume > guild.music.state.volume
        ? this.client.getEmoji('volumeUp')
        : this.client.getEmoji('volumeDown')
    const state =
      volume > guild.music.state.volume ? 'aumentado para: ' : 'reduzido para: '
    guild.music.volume(volume)
    return channel.sendTempMessage(
      emoji + ' | Volume ' + state + '`' + volume + '`.'
    )
  }
}
