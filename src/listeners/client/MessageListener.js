const { Listener, CommandContext } = require('../../structures/client')
const {
  CommandUtils: { getPrefix },
  CooldownManager
} = require('../../utils')

const cooldownManager = CooldownManager(1000 * 60)

module.exports = class MessageListener extends Listener {
  constructor () {
    super({
      name: 'message'
    })
  }

  async run (message) {
    if (message.author.bot || !message.guild) return

    const userDocument = await message.author.data

    if (!cooldownManager.has(message.author.id)) {
      const { xp, level } = userDocument

      await userDocument.updateOne({
        $inc: { xp: Math.floor(Math.random() * 3) + 2 }
      })

      if (xp >= level * 60) {
        await userDocument.updateOne({
          xp: 0,
          $inc: { level: Math.floor(xp / 60 - level) }
        })
      }

      cooldownManager.add(message.author.id)
    }

    const prefix = getPrefix(message)
    if (!message.content.toLowerCase().startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    const command = this.commands.find(
      ({ name, aliases }) => name === cmd || aliases.includes(cmd)
    )

    const context = new CommandContext(message, args, cmd, prefix)

    if (command) return command.preLoad(context)
  }
}
