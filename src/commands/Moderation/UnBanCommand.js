const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'unban',
      aliases: ['desbanir'],
      permissions: {
        verify: true,
        names: ['BAN_MEMBERS']
      },
      category: 'moderation'
    })
  }

  async run ({ channel, guild, args: [user], author }) {
    if (!guild.me.hasPermission('BAN_MEMBERS')) {
      return channel.sendTempMessage(this.client.botEmojis.error + ' | Eu não possuo permissão de `Banir membros` para executar este comando.')
    }

    const guildDocument = await guild.data

    if (!user) return channel.sendTempMessage('Informe o id do membro.')

    const ban = await guild.fetchBan(user).catch(err => {
      channel.sendTempMessage(this.client.botEmojis.error + ' | Este membro não está banido.')
      console.error(err)
    })

    const embed = this.embed()
      .setColor(guild.me.displayHexColor)
      .setAuthor('Ação feita por: ' + author.username, author.displayAvatarURL())
      .setDescription(`**Tipo:** \`Unban\`
        **Membro:** \`${ban.user.tag}\`
      `)

    guild.members.unban(ban.user)

    if (guildDocument.punishmentChannel) {
      const punishmentChannel = this.client.channels.cache.get(guildDocument.punishmentChannel)

      channel.sendTempMessage('Membro desbanido com sucesso.')
      return punishmentChannel.send(embed)
    }

    return channel.send(embed)
  }
}
