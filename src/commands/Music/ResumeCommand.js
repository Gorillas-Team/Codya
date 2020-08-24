const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'resume',
      aliases: ['retornar', 'unpause', 'despausar'],
      category: 'Music',
      usage: '<prefix>resume',
      description: 'Despause a fila de músicas.'
    })

    this.conf = {
      voiceChannelOnly: true,
      queueOnly: true,
      djOnly: true
    }
  }

  run ({ channel, guild }) {
    if (!guild.music.paused) {
      channel.send(this.client.botEmojis.error + ' | A música não se encontra pausada.')
        .then(x => x.delete({ timeout: 10000 }))
    }

    guild.music.pause(false)
    return channel.send(this.client.botEmojis.playing + ' | Música retomada com sucesso.').then(x => x.delete({ timeout: 10000 }))
  }
}
