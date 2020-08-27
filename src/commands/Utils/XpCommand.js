const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'xp',
      aliases: ['nivel', 'nível', 'level'],
      usage: '<prefix><cmd>',
      description: 'Veja o seu level em XP em uma determinada guild.',
      category: 'Utils',
      hide: true
    })
  }

  async run({ channel, author, mentions, member }) {
    const guildMember = mentions.members.first() || member
    const doc = await this.client.database.findDocument(guildMember.id, 'users')

    const { xp: XP, level: l } = doc
    const level = Number(l)
    const xp = Number(XP)

    const user = guildMember.user

    channel.send(
      this.embed({ author: user })
        .setColor(guildMember.displayHexColor)
        .setTitle(user.id === author.id ? 'Seu XP' : `XP de ${user.username}`)
        .setDescription(
          `Level ${level} - [${xp}/${level * 60}] | ${
            Math.floor((xp / (level * 60)) * 100) || 0
          }%`
        )
    )
  }
}
