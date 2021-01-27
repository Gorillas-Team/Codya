const { Command, KongError } = require('@Kong/structures')
const { TimeUtils } = require('@Kong/utils')

class DailyCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'daily'
    })
  }

  async run (ctx) {
    const { economy } = this.client.controllers
    const user = await this.client.repositories.users.find(ctx.author.id)

    if (await economy.isInDailyCooldown(ctx.author)) {
      const parsedTime = TimeUtils.compareTime(user.cooldown.daily)
      throw new KongError(`Faltam \`${parsedTime}\` para coletar seu daily novamente.`)
    }

    const amount = await economy.claimDaily(ctx.author)

    return ctx.sendMessage(`Você conseguiu ${amount} KongCoins`, 'balance')
  }
}

module.exports = DailyCommand
