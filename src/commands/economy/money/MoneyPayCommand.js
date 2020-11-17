const { Command, CommandUtils: { CodyaError } } = require('@Codya/structures')

class MoneyPayCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'pay',
      parent: 'money',
      args: [
        {
          type: 'number',
          options: {
            required: true,
            minimum: 1,
            messages: {
              missing: 'Você precisa informar a quantia',
              invalid: 'A quantia precisa ser um número.'
            }
          }
        },
        {
          type: 'user',
          options: {
            required: true,
            messages: {
              invalid: 'Usuário inválido.',
              missing: 'Você precisa informar um usuário.'
            }
          }
        }
      ]
    })
  }

  async run (ctx, [amount, user]) {
    const { economy } = this.client.controllers

    if (!(await economy.canPay(ctx.author, amount))) {
      throw new CodyaError('Você não possui dinheiro suficiente para enviar essa quantia.')
    }

    await economy.pay(ctx.author, user, amount)
    return ctx.sendMessage(
      `Foi pago com sucesso o valor de \`${amount}\` CodyaCoins para ${user.username}`,
      'handshake'
    )
  }
}

module.exports = MoneyPayCommand
