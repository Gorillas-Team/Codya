const { Command } = require('@Codya/structures')

class MoneyCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'money',
      args: [{ type: 'user', options: { canBeAuthor: true, required: false } }]
    })
  }

  async run (ctx, user) {
    const document = await this.client.repositories.users.find(user.id)

    return ctx.sendMessage(`fodases de ${user.username}: ${document.get('money')}`)
  }
}

module.exports = MoneyCommand
