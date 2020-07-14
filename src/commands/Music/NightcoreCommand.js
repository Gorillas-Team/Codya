const { Command } = require('../../structures')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'nightcore',
      aliases: ['nc'],
      category: 'Music',
      usage: '<prefix>nightcore',
      description: 'Ative o modo nightcore na fila de músicas.'
    })

    this.conf = {
      voiceChannelOnly: true,
      queueOnly: true,
      djOnly: true
    }
  }

  run ({ channel, guild, args }) {
    switch (args[0]) {
      case 'on': {
        guild.music.nightcore(true)

        channel.send(this.client.botEmojis.dancing + ' | Nightcore ativado com sucesso.')
          .then(msg => msg.delete({ timeout: 10000 }))
        break
      }
      case 'off': {
        guild.music.nightcore(false)

        channel.send(this.client.botEmojis.dancing + ' | Nightcore desativado com sucesso.')
          .then(msg => msg.delete({ timeout: 10000 }))
        break
      }
      default: {
        channel.send(this.client.botEmojis.error + ' | Você não informou o tipo de nightcore: <on/off>.')
          .then(msg => msg.delete({ timeout: 10000 }))
      }
    }
  }
}
