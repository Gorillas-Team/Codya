const { Command } = require('@Codya/structures')

class MoneyPayCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'pay',
      parent: 'money',
      args: [
        { type: 'number', options: { required: true, minimum: 1 } },
        { type: 'user', options: { required: true } }
      ]
    })
  }

  async run (ctx, amount, user) {
    const { economy } = this.client.controllers

    if (!(await economy.canPay(ctx.author, amount))) {
      return ctx.sendMessage('Você não possui dinheiro suficiente para enviar essa quantia.')
    }

    await economy.pay(ctx.author, user, amount)
    return ctx.sendMessage(`Foi pago com sucesso o valor de \`${amount}\` fodases para ${user.username}`)
  }
}

module.exports = MoneyPayCommand
