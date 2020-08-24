const { Listener, CommandContext } = require('../../structures/client')
const { getPrefix } = require('../../utils')
const xpCooldown = new Set()

module.exports = class MessageListener extends Listener {
  constructor() {
    super({
      name: 'message'
    })
  }

  async run(message) {
    if (message.author.bot || message.channel.type === 'dm') return

    const userDocument = await message.author.document

    if (!xpCooldown.has(message.author.id)) {
      const { xp, level } = userDocument

      await userDocument.update({ xp: Math.floor(Math.random() * 5) + 5 })

      if (xp >= level * 60) await userDocument.update({ xp: 0, level: xp / 60 - level })

      xpCooldown.add(message.author.id)
    }

    setTimeout(() => xpCooldown.delete(message.author.id), 60000)

    const prefix = getPrefix(message)
    if (!message.content.toLowerCase().startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    const command = this.commands.find(({ name, aliases }) => name === cmd || aliases.includes(cmd))

    const context = new CommandContext(message, args, cmd, prefix)

    if (command) return command.preLoad(context)
  }
}
