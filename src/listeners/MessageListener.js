const { CommandContext, Listener } = require('@Codya/structures')
const { CommandUtils } = require('@Codya/utils')

class MessageListener extends Listener {
  constructor (client) {
    super({
      name: 'messageCreate'
    }, client)
  }

  /**
   * @param {Message | import('eris').Message} message
   */
  run (message) {
    if (message.author.bot) return

    const prefix = CommandUtils.getPrefix(message)
    if (!message.content.toLowerCase().startsWith(prefix)) return

    const args = CommandUtils.resolveArgs(message.content, prefix)
    const cmd = args.shift().toLowerCase()
    const command = this.client.commands.find(command => command.name === cmd || command.aliases.includes(cmd))

    const context = new CommandContext(message, this.client, args, cmd, prefix)

    if (command) command.preLoad(context)
  }
}

module.exports = MessageListener
