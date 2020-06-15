const { Command, Database: db } = require('../../structures')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'xp',
      aliases: ['nivel', 'nível', 'level'],
      usage: '<prefix><cmd>',
      description: 'Veja o seu level em XP em uma determinada guild.',
      category: 'Utils',
      hide: true
    })
  }

  async run ({ channel, author, mentions }) {
    const user = mentions.users.first() || author
    const doc = await db.find({ type: 'users', id: user.id })

    const { xp: XP, level: l } = doc
    const level = Number(l) + 1
    const xp = Number(XP)

    channel.send(this.embed({ author })
      .setTitle(user.id === author.id ? 'Seu XP' : `XP de ${user.username}`)
      .setDescription(`Level ${level} - [${xp}/${level * 60}] | ${Math.floor(xp / (level * 60) * 100)}%`))
  }
}
