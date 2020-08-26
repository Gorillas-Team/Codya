const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'unban',
      aliases: ['desbanir'],
      permissions: ['BAN_MEMBERS'],
      category: 'moderation'
    })
  }

  async run ({ channel, guild, args, author }) {
    const guildDocument = await guild.data

    const ban = await guild.fetchBan(args[0]).catch(err => {
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
