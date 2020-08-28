const ModerationCommand = require('../../impl/ModerationCommand')

module.exports = class extends ModerationCommand {
  constructor (client) {
    super(client, {
      name: 'kick',
      aliases: ['expulsar'],
      category: 'moderation',
      permissions: {
        names: ['KICK_MEMBERS'],
        verify: true
      }
    })
  }

  async run ({ channel, guild, args: [user, ...args], mentions, member: guildMember }) {
    const guildDocument = await guild.data

    if (!user) {
      return channel.sendTempMessage(
        this.client.getEmoji('error') +
          ' | Você não inseriu o id ou mencionou um membro.'
      )
    }

    const mention = mentions.members.first()

    const member = mention || guild.member(user)

    if (!member) {
      return channel.sendTempMessage(
        this.client.getEmoji('error') +
          ' | O membro inserido não foi encontrado.'
      )
    }

    const guildMemberPosition = guildMember.roles.highest.position
    const memberPosition = member.roles.highest.position
    if (memberPosition >= guildMemberPosition) {
      return channel.sendTempMessage(
        this.client.getEmoji('error') + ' | Você não pode expulsar este membro.'
      )
    }

    if (memberPosition >= guild.me.roles.highest.position) {
      return channel.sendTempMessage(
        this.client.getEmoji('error') + ' | Não posso expulsar este membro.'
      )
    }

    const reason = args.join(' ') || 'Nenhum motivo informado.'

    await member.kick(reason)

    const punishment = {
      case: guildDocument.punishments.length + 1,
      type: 'Kick',
      author: guildMember,
      punished: member,
      reason
    }

    await guildDocument.updateOne({ $push: { punishments: punishment } })

    const embed = this.embed()
      .setColor(guild.me.displayHexColor)
      .setAuthor(
        'Punido por ' + guildMember.user.tag,
        guildMember.user.displayAvatarURL()
      ).setDescription(`**Case:** \`${punishment.case}\`
      **Tipo:** \`${punishment.type}\`
      **Membro:** \`${punishment.punished.user.tag}\` - \`${punishment.punished.id}\`
      **Motivo:** \`${punishment.reason}\`
      `)

    const punishmentChannel = this.client.channels.cache.get(
      guildDocument.punishmentChannel
    )

    if (!guildDocument.punishmentChannel) return channel.send(embed)

    channel.sendTempMessage(`${this.client.getEmoji('correct')} | Membro expulso com sucesso.`)
    punishmentChannel.send(embed)
  }
}
