const { Command } = require('../../structures/client')
const moment = require('moment')
moment.locale('pt-BR')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'userinfo',
      aliases: ['uinfo', 'infouser'],
      usage: '<prefix>userinfo | <prefix>userinfo @Derpy',
      description: 'Veja as informações de um determinado usuário.',
      category: 'Utils'
    })
  }

  async run ({ channel, args, author, mentions, guild }) {
    const user = args[0] ? mentions.users.first() || await this.client.users.fetch(args[0]) : author
    const { timestamp } = guild.member(user).lastMessage

    const embed = this.embed({ author })
      .setAuthor(author.username, author.displayAvatarURL())
      .setThumbnail(user.avatarURL)
      .addField('| Nome:', `\`${user.username}\``, true)
      .addField('| Id:', `\`${user.id}\``, true)
      .addField('| Discriminador:', `\`${user.discriminator}\``, true)
      .addField('| Bot?', `\`${user.bot ? 'Sim.' : 'Não.'}\``, true)
      .addField('| Conta criada em:', `\`${formatDate(user.createdAt, 'LLLL')}\``, true)
      .addField('| Visto última vez em:', `\`${moment(timestamp).fromNow()}\``, true)

    channel.send(embed)

    function formatDate (date, format) {
      return moment(date).format(format)
    }
  }
}
