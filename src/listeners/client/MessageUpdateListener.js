const { Listener } = require('../../structures/client')
const { MessageEmbed } = require('discord.js')

module.exports = class MessageUpdateListener extends Listener {
  constructor() {
    super({
      name: 'messageUpdate'
    })
  }

  async run(oldMessage, newMessage) {
    if (oldMessage.author.bot) return

    if (oldMessage.content !== newMessage.content) {
      const guildDocument = await oldMessage.guild.data

      const embed = new MessageEmbed()
        .setColor(oldMessage.guild.me.displayHexColor)
        .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
        .setDescription(
          `**Canal:** ${oldMessage.channel.toString()}
        **Conteúdo antigo:**
        ${oldMessage.content}

        **Conteúdo atual:**
        ${newMessage.content}
        `
        )
        .setTimestamp()

      if (guildDocument.logChannel) {
        const channel = oldMessage.guild.channels.cache.get(
          guildDocument.logChannel
        )

        channel.send(embed)
      }

      return this.emit('message', newMessage)
    }
  }
}
