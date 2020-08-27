const { Command } = require('../../structures/client')
const { djAzeitona } = require('../../../assets')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'config',
      aliases: ['cfg'],
      permissions: ['ADMINISTRATOR'],
      category: 'moderation'
    })
  }

  async run ({ channel, guild, author, args: [config, value], prefix, cmd }) {
    const guildDocument = await guild.data

    const embeds = {
      default: this.embed({ author }), error: this.embed({ color: 'red', author })
    }

    const guildDjRole = guild.roles.cache.get(guildDocument.djRole)?.toString() || 'Nenhum cargo.'
    const guildPunishmentChannel = guild.channels.cache.get(guildDocument.punishmentChannel)?.toString() || 'Nenhum canal.'
    const guildLogsChannel = guild.channels.cache.get(guildDocument.logChannel)?.toString() || 'Nenhum canal.'

    if (!config) {
      return channel.send(embeds.default
        .setAuthor('Central de configuração.', this.client.user.displayAvatarURL())
        .setDescription(`${this.client.botEmojis.dancing} **| DJ:**
      **Atual:** ${guildDjRole}
      \`\`\`${prefix}${cmd} dj <id/menção/nome>\`\`\`

      ${this.client.botEmojis.ban} **| Canal de punições:**
      **Atual:** ${guildPunishmentChannel}
      \`\`\`${prefix}${cmd} punição <id/menção/nome>\`\`\`

      💬 **| Canal de logs:**
      **Atual:** ${guildLogsChannel}
      \`\`\`${prefix}${cmd} logs <id/menção/nome>\`\`\`
      `)
      )
    }

    switch (config.toLowerCase()) {
      case 'dj': {
        const role = guild.roles.cache.get(value) ||
          guild.roles.cache.find(role => role.name.toLowerCase() === value) ||
          guild.roles.cache.find(role => role.toString() === value)

        if (!role) return channel.sendTempMessage('Cargo não encontrado.')

        await guildDocument.updateOne({ djRole: role.id })

        await channel.send('Cargo de DJ atualizado para: ' + role.toString() + '.', {
          files: [{ attachment: djAzeitona, name: 'dj_azeitona.mp4' }]
        })
        break
      }
      case 'punição':
      case 'punishment': {
        const punishmentChannel = guild.channels.cache.get(value) ||
          guild.channels.cache.find(channel => channel.name === value) ||
          guild.channels.cache.find(channel => channel.toString() === value)

        if (!punishmentChannel) return channel.sendTempMessage('Canal não encontrado')

        await guildDocument.updateOne({ punishmentChannel: punishmentChannel.id })

        await channel.send('Canal de punições atualizado para: ' + punishmentChannel.toString())
        break
      }
      case 'logs':
      case 'logChannel':
      case 'logsChannel': {
        const logChannel = guild.channels.cache.get(value) ||
          guild.channels.cache.find(channel => channel.name === value) ||
          guild.channels.cache.find(channel => channel.toString() === value)

        if (!logChannel) return channel.sendTempMessage('Canal não encontrado.')

        await guildDocument.updateOne({ logChannel: logChannel.id })

        await channel.send('Canal de logs atualizado para: ' + logChannel.toString())
        break
      }
      default:
        channel.send(embeds.error.setDescription(this.client.botEmojis.error + ' | Opção inválida.'))
    }
  }
}
