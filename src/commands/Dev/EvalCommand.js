/* eslint-disable no-eval */
/* eslint-disable no-unused-vars */

const { Command } = require('../../structures/client')
const fetch = require('node-fetch')
const { inspect } = require('util')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'eval',
      aliases: ['ev'],
      category: 'Dev',
      usage: 'Secret',
      description: 'Secret',
      dev: true
    })
  }

  async run ({
    channel,
    args,
    author,
    config,
    prefix,
    message,
    guild,
    member,
    lavalink
  }) {
    const input = args.join(' ').replace(/^`(``(js)?\s?)?|`(``)?$/g, '')

    if (input.includes('token')) return

    try {
      let code = await eval(input)
      code = typeof code !== 'string' ? inspect(code, { depth: 0 }) : code

      if (code.length > 1700) {
        const key = await fetch('https://speedbin.xyz/documents/', {
          method: 'POST',
          body: code
        })
          .then(res => res.json())
          .then(({ key }) => key)
          .catch(x => x.send('DM fechada! fuck'))

        channel.sendTempMessage('Olha a dm...')
        return author.send('https://speedbin.xyz/' + key)
      }

      channel.send(
        `${this.client.getEmoji('code')} | Resultado:\n\`\`\`js\n${clean(
          code.replace(new RegExp(this.client.token, 'g'), '😎')
        )}\`\`\``
      )
    } catch (e) {
      return channel.send(e, { code: 'js' })
    }
  }
}

function clean (text) {
  return typeof text === 'string'
    ? text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203))
    : text
}
