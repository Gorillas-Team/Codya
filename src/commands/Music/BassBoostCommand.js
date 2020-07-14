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
    switch (args[0]) {
      case 'on': {
        guild.bassboost(true)

        channel.send(this.client.botEmojis.dancing + ' | Bassboost ativado.')
          .then(msg => msg.delete({ timeout: 10000 }))
        break
      }
      case 'off': {
        guild.bassboost(false)

        channel.send(this.client.botEmojis.dancing + ' | Bassboost desativado.')
          .then(msg => msg.delete({ timeout: 10000 }))
        break
      }
      default: {
        channel.send(this.client.botEmojis.dancing + ' | Informe o tipo de bassboost: <on/off>')
          .then(msg => msg.delete({ timeout: 10000 }))
      }
    }
  }
}
