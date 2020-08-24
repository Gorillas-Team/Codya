const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'loop',
      aliases: ['repeat'],
      category: 'Music',
      usage: '<prefix>loop <all/single>',
      description: 'Determine o tipo de loop que está na queue.'
    })

    this.conf = {
      voiceChannelOnly: true,
      queueOnly: true,
      djOnly: true
    }
  }

  async run ({ channel, guild, args }) {
    const track = guild.music.track
    switch (args[0]) {
      case 'single': {
        guild.music.loop(guild.music.looped === 0 ? 1 : 0)
        channel.send(`${this.client.botEmojis.repeatOne} | Loop na música \`${track.info.title}\` foi \`${guild.music.looped === 1 ? 'ativado' : 'desativado'}\` com sucesso.`)
          .then(msg => msg.delete({ timeout: 5000 }))
        break
      }
      case 'all': {
        guild.music.loop(guild.music.looped === 0 ? 2 : 0)
        channel.send(`${this.client.botEmojis.repeatAll} | Loop na fila foi \`${guild.music.looped === 2 ? 'ativado' : 'desativado'}\` com sucesso.`)
          .then(msg => msg.delete({ timeout: 5000 }))
        break
      }
      default: {
        channel.send(this.client.botEmojis.error + ' | Você não informou o tipo de loop. `<single/all>`')
      }
    }
  }
}
