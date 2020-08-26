const { Command } = require('../../structures/client')
const { banned } = require('../../../assets')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'ban',
      aliases: ['banir'],
      permissions: ['BAN_MEMBERS'],
      category: 'moderation'
    })
  }

  async run ({ channel, args: [user, ...args], member: guildMember, guild, mentions }) {
    const guildDocument = await guild.data

    if (!user) {
      return channel.sendTempMessage(this.client.botEmojis.error + ' | Você não inseriu o id ou mencionou um membro.')
    }

    const mention = mentions.members.first()

    const member = mention || guild.member(await this.client.users.fetch(user))

    if (!member) {
      return channel.sendTempMessage(this.client.botEmojis.error + ' | O membro inserido não foi encontrado.')
    }

    const isBanned = await guild.fetchBan(member.id)
    if (isBanned) {
      return channel.sendTempMessage(this.client.botEmojis.error + ' | O membro já está banido.')
    }

    const guildMemberPosition = guildMember.roles.highest.position
    const memberPosition = member.roles.highest.position
    if (memberPosition >= guildMemberPosition) {
      return channel.sendTempMessage('Você não pode banir este membro.')
    }

    if (memberPosition >= guild.me.roles.highest.position) {
      return channel.sendTempMessage('Não posso banir este membro.')
    }

    const reason = args.join(' ') || 'Nenhum motivo informado.'

    await guild.members.ban(member, { reason: `Membro banido por: ${guildMember.user.tag}. Motivo: ${reason}` })

    const punishment = {
      case: guildDocument.punishments.length + 1,
      type: 'Ban',
      author: guildMember,
      punished: member,
      reason
    }

    await guildDocument.updateOne({ $push: { punishments: punishment } })

    const embed = this.embed()
      .setColor(guild.me.displayHexColor)
      .setAuthor('Punido por ' + guildMember.user.tag, guildMember.user.displayAvatarURL())
      .setDescription(`**Case:** \`${punishment.case}\`
      **Tipo:** \`${punishment.type}\`
      **Membro:** \`${punishment.punished.user.tag}\` - \`${punishment.punished.id}\`
      **Motivo:** \`${punishment.reason}\`
      `)

    const punishmentChannel = this.client.channels.cache.get(guildDocument.punishmentChannel)

    if (!guildDocument.punishmentChannel) return channel.send(embed)

    channel.sendTempMessage({ files: [{ attachment: banned, name: 'Banido.mp4' }] })
    punishmentChannel.send(embed)
  }
}
