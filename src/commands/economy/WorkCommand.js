const { Command, CommandUtils: { CodyaError } } = require('@Codya/structures')
const { TimeUtils, CodeUtils } = require('@Codya/utils')

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
      throw new CodyaError(`Você não possui um trabalho, utilize o comando \`${CodeUtils.resolvePrefix(prefix)}${cmd} join\` para entrar em um.`)
    }

    if (await economy.isInWorkCooldown(ctx.author)) {
      const document = await this.client.repositories.users.find(ctx.author.id)
      const parsedTime = TimeUtils.formatTime(document.get().workCooldown - Date.now())
      throw new CodyaError(`Faltam \`${parsedTime}\` para trabalhar novamente.`)
    }

    const amount = await economy.work(ctx.author)

    return ctx.sendMessage(`Você conseguiu \`${amount}\` CodyaCoins em seu trabalho!`, 'gear')
  }
}

module.exports = WorkCommand
