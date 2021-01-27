const { Command } = require('@Kong/structures')

class MoneyCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'money',
      args: [{ type: 'user', options: { canBeAuthor: true, required: false } }]
    })
  }

  async run (ctx, user) {
    const document = await this.client.repositories.users.find(user.id)

    return ctx.sendMessage(`KongCoins de ${user.username}: ${document.money}`, 'balance')
  }
}

module.exports = MoneyCommand
