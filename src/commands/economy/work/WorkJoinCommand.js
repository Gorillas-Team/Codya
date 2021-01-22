const { Command, CodyaError } = require('@Codya/structures')
const { works } = require('../../../../assets')
const joinedWorks = Object.keys(works).map(work => `\`${work}\``).join(', ')

class WorkJoinCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'join',
      parent: 'work',
      args: [
        {
          type: 'string',
          options: {
            required: true,
            messages: {
              missing: `Você não informou o trabalho: ${joinedWorks}.`
            }
          }
        }
      ]
    })
  }

  async run (ctx, workName) {
    const { economy } = this.client.controllers

    if (await economy.hasWork(ctx.author)) {
      throw new CodyaError('Você já foi possui um trabalho.')
    }

    if (!Object.keys(works).includes(workName.toLowerCase())) {
      throw new CodyaError(`Esse trabalho não existe, opções válidas: \`${joinedWorks}\`.`)
    }

    const work = await economy.chooseWork(ctx.author, workName)

    return ctx.sendMessage(
      `trabalho ${work.name}`,
      'gear'
    )
  }
}

module.exports = WorkJoinCommand
