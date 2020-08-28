const ModerationCommand = require('../../impl/ModerationCommand')

module.exports = class extends ModerationCommand {
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
    const guildDocument = await guild.data

    if (!user) {
      return channel.sendTempMessage(
        this.client.getEmoji('error') + ' | Informe o id do membro.'
      )
    }

    const ban = await guild.fetchBan(user).catch(err => {
      channel.sendTempMessage(
        this.client.getEmoji('error') + ' | Este membro não está banido.'
      )
      console.error(err)
    })

    const embed = this.embed()
      .setColor(guild.me.displayHexColor)
      .setAuthor(
        'Ação feita por: ' + author.username,
        author.displayAvatarURL()
      ).setDescription(`**Tipo:** \`Unban\`
        **Membro:** \`${ban.user.tag}\`
      `)

    guild.members.unban(ban.user)

    if (guildDocument.punishmentChannel) {
      const punishmentChannel = this.client.channels.cache.get(
        guildDocument.punishmentChannel
      )

      channel.sendTempMessage(
        this.client.getEmoji('correct') + ' | Membro desbanido com sucesso.'
      )
      return punishmentChannel.send(embed)
    }

    return channel.send(embed)
  }
}
