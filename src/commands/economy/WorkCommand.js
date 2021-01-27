const { Command, KongError } = require('@Kong/structures')
const { TimeUtils, CodeUtils } = require('@Kong/utils')

class WorkCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'work',
      aliases: ['w']
    })
  }

  async run (ctx) {
    const { economy } = this.client.controllers

    if (!(await economy.hasWork(ctx.author))) {
      const { prefix, cmd } = ctx
      throw new KongError(`Você não possui um trabalho, utilize o comando \`${CodeUtils.resolvePrefix(prefix)}${cmd} join\` para entrar em um.`)
    }

    if (await economy.isInWorkCooldown(ctx.author)) {
      const document = await this.client.repositories.users.find(ctx.author.id)
      const parsedTime = TimeUtils.compareTime(document.cooldown.work)
      throw new KongError(`Faltam \`${parsedTime}\` para trabalhar novamente.`)
    }

    const amount = await economy.work(ctx.author)

    return ctx.sendMessage(`Você conseguiu \`${amount}\` KongCoins em seu trabalho!`, 'gear')
  }
}

module.exports = WorkCommand
