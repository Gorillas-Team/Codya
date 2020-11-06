const { Command, Arguments: { StringArgument } } = require('@Codya/structures')
const { CodeUtils } = require('@Codya/utils')
const { inspect } = require('util')

const fetch = require('node-fetch')

class EvalCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'eval',
      aliases: ['ev'],
      category: 'Dev',
      usage: 'Secret',
      description: 'Secret',
      dev: true,
      args: [
        new StringArgument({
          full: true,
          required: true
        })
      ]
    })
  }

  /**
   * @param {CommandContext | import('../structures/command/CommandContext')} ctx
   * @param {string} input
   */
  async run (ctx, [input]) {
    if (input.includes('token')) return

    try {
      // eslint-disable-next-line no-eval
      let code = await eval(input)
      code = typeof code !== 'string' ? inspect(code, { depth: 0 }) : code

      if (code.length > 1700) {
        const key = await fetch('https://speedbin.xyz/documents/', {
          method: 'POST',
          body: code
        })
          .then(res => res.json())
          .then(({ key }) => key)

        await ctx.channel.createMessage('Olha a dm...')
        const dmChannel = await ctx.author.getDMChannel()
        return dmChannel.createMessage(`https://speedbin.xyz/${key}`)
      }

      await ctx.channel.createMessage(this.client.getEmoji('code') + ' | Resultado:```js\n' + CodeUtils.clean(code.replace(new RegExp(this.client.token), 'ss')) + '\n```')
    } catch (e) {
      return ctx.channel.createMessage('```js\n' + e.message + '\n```')
    }
  }
}

module.exports = EvalCommand
