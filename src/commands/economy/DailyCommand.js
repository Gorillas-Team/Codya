const { Command, CodyaError } = require('@Codya/structures')
const { TimeUtils } = require('@Codya/utils')

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
      throw new CodyaError(`Faltam \`${parsedTime}\` para coletar seu daily novamente.`)
    }

    const amount = await economy.claimDaily(ctx.author)

    return ctx.sendMessage(`Você conseguiu ${amount} CodyaCoins`, 'balance')
  }
}

module.exports = DailyCommand
