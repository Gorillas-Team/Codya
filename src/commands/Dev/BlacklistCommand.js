const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'blacklist',
      aliases: ['bl'],
      dev: true
    })
  }

  async run ({ channel, args, mentions }) {
    const user = mentions.users.first() || await this.client.users.fetch(args[0])
    const data = await this.client.repositories.users.get(user.id)

    data.blacklist
      ? await this.client.repositories.users.update(user.id, { blacklist: true })
      : await this.client.repositories.users.update(user.id, { blacklist: false })

    await channel.send(data.blacklist ? 'Usuário adicionado na blacklist.' : 'Usuário removido da blacklist.')
  }
}
