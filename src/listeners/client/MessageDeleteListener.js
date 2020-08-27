const { Listener } = require('../../structures/client')
const { MessageEmbed } = require('discord.js')

module.exports = class MessageDeleteListener extends Listener {
  constructor() {
    super({
      name: 'messageDelete'
    })
  }

  async run(message) {
    if (message.author.bot) return

    const guildDocument = await message.guild.data

    const embed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(
        `**Canal:** ${message.channel.toString()}
        **Mensagem excluída:**
        ${message.content}
        `
      )
      .setTimestamp()

    if (guildDocument.logChannel) {
      const channel = message.guild.channels.cache.get(guildDocument.logChannel)

      return channel.send(embed)
    } else return null
  }
}
