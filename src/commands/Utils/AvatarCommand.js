const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      aliases: ['image'],
      description: 'Veja o avatar de um usuário',
      usage: '<prefix>avatar <User> || <prefix>avatar',
      category: 'Utils'
    })
  }

  async run({ channel, mentions, args, author }) {
    const user = args[0]
      ? mentions.users.first() || (await this.client.users.fetch(args[0]))
      : author

    const avatarUrl = user.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 2048
    })

    return channel.send(
      this.client.getEmoji('picture') + ' | Avatar de ' + user.username,
      { files: [avatarUrl] }
    )
  }
}
