const { Command, CommandUtils: { CodyaError } } = require('@Codya/structures')
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
      args: [{
        type: 'string',
        options: {
          full: true,
          required: true
        }
      }]
    })
  }

  /**
   * @param {import('../../structures/command/CommandContext')} ctx
   * @param {string} input
   */
  async run ({ client, member, guild, author, channel, mentions, message, player }, [input]) {
    if (typeof input !== 'string') return
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

        await channel.createMessage('Olha a dm...')
        const dmChannel = await author.getDMChannel()
        return dmChannel.createMessage(`https://speedbin.xyz/${key}`)
      }

      await channel.createMessage(client.getEmoji('code') + ' | Resultado:```js\n' + CodeUtils.clean(code.replace(new RegExp(client.token), 'ss')) + '\n```')
    } catch (e) {
      throw new CodyaError('Erro:```js\n' + e.message + '\n```')
    }
  }
}

module.exports = EvalCommand
