const { Command } = require('../../structures')
const { version } = require('discord.js')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'botinfo',
      aliases: ['bot-info', 'infobot', 'binfo'],
      category: 'Utils',
      usage: '<prefix>botinfo',
      description: 'Veja as informações do bot.'
    })
  }

  async run ({ channel, member, lavalink }) {
    const lavalinkStats = lavalink.idealNodes[0].stats

    const embed = this.embed()
      .setColor('0ED4DA')
      .setDescription(`
      Olá, eu sou a \`${this.client.user.username}\`, uma bot totalmente focada em diversão, moderação, ou até músicas.
      Tenho como objetivo transformar seu servidor em um lugar mais divertido e organizado para ter um certo equilibramento.
      `)
      .addFields(
        [
          {
            name: `${this.client.botEmojis.gear} | **Estatísticas:**`,
            value: `
            ${this.client.botEmojis.members} | **Usuários:** ${this.client.users.cache.size}
            ${this.client.botEmojis.servers} | **Servidores:** ${this.client.guilds.cache.size}
            ${this.client.botEmojis.channels} | **Canais de Texto:** ${this.client.channels.cache.filter(channel => channel.type === 'text').size}
            🔊 | **Voz:** ${this.client.channels.cache.filter(channel => channel.type === 'voice').size}
            `,
            inline: true
          },
          {
            name: `${this.client.botEmojis.dancing} | **Lavalink:**`,
            value: `
            **Uptime:** ${this.formatTime(lavalinkStats.uptime)}
            **Players tocando:** ${lavalinkStats.playingPlayers}
            `,
            inline: true
          },
          {
            name: `${this.client.botEmojis.star} | **Extras:**`,
            value: `
            **Versão:** 0.0.1
            **Discord.js:** ${version}
            **Node:** 12.18.0
            `,
            inline: true
          }
        ]
      )
      .setThumbnail(this.client.user.displayAvatarURL())

    channel.send(embed)
  }
}
